import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guard that allows navigation to the target route only if there's not a user currently authenticated.
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticatedUserForbiddenGuard implements CanActivate {

	public constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
	) { }

	/**
	 * Returns _true_ if there's not a user currently authenticated and _false_ otherwise.
	 *
	 * If the user is authenticated, they're redirected to the home page.
	 */
	public canActivate( ): boolean {
		const aUserIsAuthenticated: boolean = this.authService.aUserIsAuthenticatedSnapshot;

		if ( aUserIsAuthenticated ) {
			this.router.navigate([ '/' ]);
		}

		return !aUserIsAuthenticated;
	}

}