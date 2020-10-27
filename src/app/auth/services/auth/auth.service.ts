import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StatusCodes } from 'http-status-codes';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { localStorageKeys } from 'src/app/constants/local-storage-keys.constant';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import { User } from 'src/app/models/user.model';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { AuthModule } from '../../auth.module';
import { AuthenticationCredentialsDTO } from './dto/authentication-credentials.dto';
import { AuthenticationResponseDTO } from './dto/authentication-response.dto';
import { UserRole } from './enums/user-role.enum';
import { AccessToken } from './interfaces/access-token.interface';

// TEST: Update AuthService's unit tests
/**
 * Service that allows the access and management of the authentication and authorization of the application's
 * users.
 */
@Injectable({
	providedIn: AuthModule,
})
export class AuthService {
	private readonly _accessTokenSubject: BehaviorSubject<string | null>;
	private readonly _accessTokenObservable: Observable<string | null>;

	private readonly _authenticatedUserSubject: BehaviorSubject<User | null>;
	private readonly _authenticatedUserObservable: Observable<User | null>;

	private readonly _authenticatedUserRoleSubject: BehaviorSubject<UserRole | null>;
	private readonly _authenticatedUserRoleObservable: Observable<UserRole | null>;

	/**
	 * The serialized access token.
	 *
	 * If there is no user authenticated, it is equal to _null_.
	 */
	public get accessTokenSnapshot( ): string | null {
		return this._accessTokenSubject.value;
	}

	/**
	 * Observable that emits the serialized access token.
	 *
	 * If there is no user authenticated, it emits _null_.
	 */
	public get accessToken( ): Observable<string | null> {
		return this._accessTokenObservable;
	}

	/**
	 * Observable that emits the currently authenticated user.
	 *
	 * If there is no user authenticated, it emits _null_.
	 */
	public get authenticatedUser( ): Observable<User | null> {
		return this._authenticatedUserObservable;
	}

	/**
	 * The currently authenticated user.
	 *
	 * If there is no user authenticated, it is equal to _null_.
	 */
	public get authenticatedUserSnapshot( ): User | null {
		return this._authenticatedUserSubject.value;
	}

	/**
	 * Observable that emits the role of the currently authenticated user.
	 *
	 * If there is no user authenticated, it emits _null_.
	 */
	public get authenticatedUserRole( ): Observable<UserRole | null> {
		return this._authenticatedUserRoleObservable;
	}

	/**
	 * The role of the currently authenticated user.
	 *
	 * If there is no user authenticated, it is equal to _null_.
	 */
	public get authenticatedUserRoleSnapshot( ): UserRole | null {
		return this._authenticatedUserRoleSubject.value;
	}

	/**
	 * Observable that emits _true_ if there is a user authenticated and _false_ otherwise.
	 */
	public get aUserIsAuthenticated( ): Observable<boolean> {
		return this._accessTokenObservable.pipe(
			map( ( token ) => token !== null ),
		);
	}

	/**
	 * Value that is equal to _true_ if there is a user authenticated and _false_ otherwise.
	 */
	public get aUserIsAuthenticatedSnapshot( ): boolean {
		return this._accessTokenSubject.value !== null;
	}

	/**
	 * Observable that emits _true_ if there is a client authenticated and _false_ otherwise.
	 */
	public get aClientIsAuthenticated( ): Observable<boolean> {
		return this._authenticatedUserRoleObservable.pipe(
			map( ( role ) => role === UserRole.Client ),
		);
	}

	/**
	 * Value that is equal to _true_ if there is a client authenticated and _false_ otherwise.
	 */
	public get aClientIsAuthenticatedSnapshot( ): boolean {
		return this._authenticatedUserRoleSubject.value === UserRole.Client;
	}

	/**
	 * Observable that emits _true_ if there is a kitchen site employee authenticated and _false_ otherwise.
	 */
	public get aKitchenSiteEmployeeIsAuthenticated( ): Observable<boolean> {
		return this._authenticatedUserRoleObservable.pipe(
			map( ( role ) => role === UserRole.KitchenSiteEmployee ),
		);
	}

	/**
	 * Value that is equal to _true_ if there is a kitchen site employee authenticated and _false_ otherwise.
	 */
	public get aKitchenSiteEmployeeIsAuthenticatedSnapshot( ): boolean {
		return this._authenticatedUserRoleSubject.value === UserRole.KitchenSiteEmployee;
	}

	public constructor(
		private readonly httpClient: HttpClient,
		private readonly router: Router,
		private readonly environmentService: EnvironmentService,
	) {
		this._accessTokenSubject = new BehaviorSubject<string | null>( null );
		this._accessTokenObservable = this._accessTokenSubject.asObservable( );

		this._authenticatedUserSubject = new BehaviorSubject<User | null>( null );
		this._authenticatedUserObservable = this._authenticatedUserSubject.asObservable( );

		this._authenticatedUserRoleSubject = new BehaviorSubject<UserRole | null>( null );
		this._authenticatedUserRoleObservable = this._authenticatedUserRoleSubject.asObservable( );

		this.reloadAuthenticatedUserFromLocalStorage( );
	}

	/**
	 * Attempts to authenticate against the server with the provided username and password.
	 *
	 * Returns an observable that emits _true_ if the authentication attempt is successful and emits _false_
	 * otherwise.
	 */
	public authenticate( username: string, password: string ): Observable<boolean> {
		// Returns _true_ immediately if the user is already authenticated
		if ( this.aUserIsAuthenticatedSnapshot ) {
			return of( true );
		}

		return this.requestAuthenticationFromServer( username, password )
			.pipe(
				// Update the authenticated user and return a _true_ emitting observable in case of success.
				tap( ( authenticationResponseDTO ) => {
					const accessToken = authenticationResponseDTO.accessToken;
					this.storeAccessTokenInLocalStorage( accessToken );
					this.loadAuthenticatedUserInService( accessToken );
				}),
				mapTo( true ),

				// Return a _false_ emitting observable in case of invalid credentials.
				// Return an error throwing observable in case of server failure.
				catchError( ( error: HttpErrorResponse ) => {
					return ( error.status === StatusCodes.UNAUTHORIZED )
						? of( false )
						: throwError(
							new Error( 'The server failed to process the authentication request.' ),
						);
				}),

				// Avoid sending multiple concurrent authentication requests.
				shareReplay( ),
			);
	}

	/**
	 * Deauthenticates the currently authenticated user.
	 */
	public deauthenticate( ): void {
		this.deleteAccessTokenFromLocalStorage( );
		this.clearAuthenticatedUserInService( );
		this.redirectUserToAuthenticationPage( );
	}

	/**
	 * Verifies if there exists an access token in local storage, and, if it does, it uses it to load the
	 * authenticated user in the service.
	 */
	private reloadAuthenticatedUserFromLocalStorage( ): void {
		const accessToken = this.getAccessTokenFromLocalStorage( );
		if ( accessToken !== null ) {
			this.loadAuthenticatedUserInService( accessToken );
		}
	}

	/**
	 * Retrieves and returns the access token from local storage.
	 *
	 * If there is no access token stored there, it returns _null_.
	 */
	private getAccessTokenFromLocalStorage( ): string | null {
		return localStorage.getItem( localStorageKeys.accessToken );
	}

	/**
	 * Updates the access token, authenticated user and role of the authenticated user in the service with the
	 * provided access token.
	 */
	private loadAuthenticatedUserInService( accessToken: string ): void {
		const deserializedAccessToken: AccessToken = this.deserializeAccessToken( accessToken );

		const authenticatedUser: User = this.getUserFromAccessToken( deserializedAccessToken );
		const authenticatedUserRole: UserRole = this.getUserRoleFromAccessToken( deserializedAccessToken );

		this._accessTokenSubject.next( accessToken );
		this._authenticatedUserSubject.next( authenticatedUser );
		this._authenticatedUserRoleSubject.next( authenticatedUserRole );
	}

	/**
	 * Deserializes and returns the access token as an object.
	 */
	private deserializeAccessToken( accessToken: string ): AccessToken {
		const jwtHelperService = new JwtHelperService( );
		return jwtHelperService.decodeToken( accessToken );
	}

	/**
	 * Returns an instance of User from the claims contained in the deserialized access token.
	 */
	private getUserFromAccessToken( deserializedAccessToken: AccessToken ): User {
		return new User(
			deserializedAccessToken.id.toString( ),
			deserializedAccessToken.fullName,
			deserializedAccessToken.dni,
		);
	}

	/**
	 * Extracts and returns the role of the authenticated user from the deserialized access token.
	 */
	private getUserRoleFromAccessToken( deserializedAccessToken: AccessToken ): UserRole {
		return deserializedAccessToken.role;
	}

	/**
	 * Sends an HTTP request to the server to authenticate the user with the provided username and password,
	 * and returns an observable that emits the response from the server.
	 *
	 * @param username the username to use in the authentication request.
	 * @param password the password to use in the authentication request.
	 */
	private requestAuthenticationFromServer(
		username: string,
		password: string,
	): Observable<AuthenticationResponseDTO> {
		const url: string = this.environmentService.getEndpoint( 'login' );
		const authenticationCredentialsDTO: AuthenticationCredentialsDTO = {
			username: username,
			password: password,
		};

		return this.httpClient.post<AuthenticationResponseDTO>( url, authenticationCredentialsDTO );
	}

	/**
	 * Stores the access token in local storage.
	 */
	private storeAccessTokenInLocalStorage( accessToken: string ): void {
		localStorage.setItem( localStorageKeys.accessToken, accessToken );
	}

	/**
	 * Deletes the access token from local storage.
	 */
	private deleteAccessTokenFromLocalStorage( ): void {
		localStorage.removeItem( localStorageKeys.accessToken );
	}

	/**
	 * Clears the access token and authenticated user in the service and sets them to their default values.
	 */
	private clearAuthenticatedUserInService( ): void {
		this._accessTokenSubject.next( null );
		this._authenticatedUserSubject.next( null );
	}

	/**
	 * Redirects the user to the authentication page.
	 */
	private redirectUserToAuthenticationPage( ): void {
		this.router.navigate([ PageUrls.authenticationPage ]);
	}

}