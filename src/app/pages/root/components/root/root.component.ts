import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

/**
 * Top-level component of the Root module.
 */
@Component({
	selector: 'cu-root',
	templateUrl: './root.component.html',
	styleUrls: [ './root.component.scss' ],
})
export class RootComponent {

	/**
	 * The full name of the authenticated user.
	 *
	 * If there is no user authenticated, it is _undefined_.
	 */
	public get fullNameOfAuthenticatedUser( ): string | undefined {
		return this.authService.authenticatedUserSnapshot?.fullName;
	}

	/**
	 * Value that is _true_ if there is a user authenticated and _false_ otherwise.
	 */
	public get aUserIsAuthenticated( ): boolean {
		return this.authService.aUserIsAuthenticatedSnapshot;
	}

	public constructor(
		private readonly authService: AuthService,
	) { }

	/**
	 * Redirects the user to the authentication page.
	 */
	public redirectToAuthenticationPage( ): void {
		// DO: Implement logic for redirection to authentication page.
	}

	/**
	 * Deauthenticates the currently authenticated user.
	 */
	public deauthenticate( ): void {
		this.authService.deauthenticate( );
	}

}