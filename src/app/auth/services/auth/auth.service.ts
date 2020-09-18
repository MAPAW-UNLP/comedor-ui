import { Injectable } from '@angular/core';
import { AuthToken } from 'src/interfaces/auth-token.interface';
import { AuthModule } from '../../auth.module';

/**
 * Service that provides access and management of the authentication and authorization of users in the app.
 */
@Injectable({
	providedIn: AuthModule,
})
export class AuthService {

	/**
	 * The deserialized auth token. If no user is authenticated, it's _undefined_.
	 */
	public get authToken( ): AuthToken | undefined {
		// DO: Implement logic for auth token retrieval.
		return undefined;
	}

	/**
	 * It's _true_ if there's currently an authenticated user, and _false_ otherwise.
	 */
	public get userIsAuthenticated( ): boolean {
		// DO: Implement logic for authentication status calculation.
		return false;
	}

	// DO: Implement logic for authentication and deauthentication.

	/**
	 * Returns the claim with the provided name from the auth token, or _undefined_ if there's no auth token available.
	 */
	public getClaim( claimName: keyof AuthToken ): AuthToken[ keyof AuthToken ] | undefined {
		return this.authToken?.[ claimName ];
	}

}