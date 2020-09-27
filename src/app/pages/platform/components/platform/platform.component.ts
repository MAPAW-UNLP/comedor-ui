import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

/**
 * Top-level component for the Platform module.
 */
@Component({
	selector: 'cu-platform',
	templateUrl: './platform.component.html',
	styleUrls: ['./platform.component.scss']
})
export class PlatformComponent {

	/**
	 * The full name of the authenticated user.
	 *
	 * If there is no user authenticated, it is _undefined_.
	 */
	public get fullNameOfAuthenticatedUser( ): string | undefined {
		return this.authService.authenticatedUserSnapshot?.fullName;
	}

	public constructor(
		private readonly authService: AuthService,
	) { }

	/**
	 * Deauthenticates the currently authenticated user.
	 */
	public deauthenticate( ): void {
		this.authService.deauthenticate( );
	}

}