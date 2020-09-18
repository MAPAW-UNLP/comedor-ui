import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';

/**
 * Top-level component of the root module.
 */
@Component({
	selector: 'cu-root',
	templateUrl: './root.component.html',
	styleUrls: [ './root.component.scss' ],
})
export class RootComponent {

	/**
	 * It's the authenticated user's full name. If there's no user authenticated, it's _undefined_.
	 */
	public get userFullName( ): string | undefined {
		return this.authService.getClaim( 'name' );
	}

	/**
	 * The name of the current environment.
	 */
	public get environmentName( ): string {
		return environment.name;
	}

	/**
	 * It's _true_ if there's a user currently authenticated and _false_ otherwise.
	 */
	public get userIsAuthenticated( ): boolean {
		return this.authService.userIsAuthenticated;
	}

	public constructor(
		private readonly authService: AuthService,
	) { }

	/**
	 * Attempts to authenticate the user with the provided credentials.
	 */
	public authenticate( ): void {
		// DO: Implement logic for user authentication.
	}

	/**
	 * Deauthenticates the user.
	 */
	public deauthenticate( ): void {
		// DO: Implement logic for user deauthentication.
	}

}