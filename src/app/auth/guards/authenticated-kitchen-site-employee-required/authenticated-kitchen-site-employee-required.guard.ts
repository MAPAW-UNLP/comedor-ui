import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../services/auth/enums/user-role.enum';

/**
 * Guard that allows navigation to the target route only if there's a kitchen site employee currently
 * authenticated.
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticatedKitchenSiteEmployeeRequiredGuard implements CanActivate {

	public constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
	) { }

	/**
	 * Returns _true_ if there's a kitchen site employee currently authenticated and _false_ otherwise.
	 *
	 * If the user is not a kitchen site employee, they're redirected to the error page.
	 */
	public canActivate( ): boolean {
		const hasRequiredRole = this.authService.authenticatedUserRoleSnapshot === UserRole.KitchenSiteEmployee;

		if ( !hasRequiredRole ) {
			this.router.navigate([ PageUrls.pageNotFound ]);
		}

		return hasRequiredRole;
	}

}