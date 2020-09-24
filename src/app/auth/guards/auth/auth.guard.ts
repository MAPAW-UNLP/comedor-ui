import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guard that allows navigation to the target route only if there's a user currently authenticated.
 */
@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {

	public constructor(
		private readonly authService: AuthService,
	) { }

	/**
	 * Returns _true_ if there's a user currently authenticated and _false_ otherwise.
	 */
	public canActivate( ): boolean {
		return this.authService.aUserIsAuthenticatedSnapshot;
	}

}