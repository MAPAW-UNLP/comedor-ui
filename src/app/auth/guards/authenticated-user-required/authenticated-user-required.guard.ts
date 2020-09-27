import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guard that allows navigation to the target route only if there's a user currently authenticated.
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticatedUserRequiredGuard implements CanActivate {

	public constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
	) { }

	/**
	 * Returns _true_ if there's a user currently authenticated and _false_ otherwise.
	 *
	 * If the user is not authenticated, they're redirected to the authentication page.
	 */
	public canActivate( ): boolean {
		const aUserIsAuthenticated: boolean = this.authService.aUserIsAuthenticatedSnapshot;

		if ( !aUserIsAuthenticated ) {
			this.router.navigate([ '/ingresar' ]);
		}

		return aUserIsAuthenticated;
	}

}