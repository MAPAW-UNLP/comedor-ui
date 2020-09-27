import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../services/auth/enums/user-role.enum';

/**
 * Guard associated to the root route. It redirects the authenticated user to their home page according to their
 * role.
 *
 * If for some reason the role is unknown, it redirects the authenticated user to the error page.
 */
@Injectable({
	providedIn: 'root'
})
export class HomePageRedirectorGuard implements CanActivate {

	public constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
	) { }

	/**
	 * Always returns _false_, as this guard's responsiblity is to always deny access to the associated route
	 * and instead redirect the user to another route.
	 *
	 * If the user is a client, they're redirected to the ClientOwnTickets page.
	 *
	 * If the user is a kitchen site employee, they're redirected to the AvailableMeals page.
	 *
	 * Otherwise, if the role of the user is not known, they're redirected to the error page.
	 */
	public canActivate( ): boolean {
		const authenticatedUserRole = this.authService.authenticatedUserRoleSnapshot;

		switch ( authenticatedUserRole ) {
			case UserRole.Client: {
				this.router.navigate([ '/mis-tickets' ]);
				break;
			}
			case UserRole.KitchenSiteEmployee: {
				this.router.navigate([ '/menus-disponibles' ]);
				break;
			}
			default: {
				this.router.navigate([ '/404' ]);
				break;
			}
		}

		return false;
	}

}
