import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { siteTitle } from 'src/app/constants/site-title.constant';
import { PageTitleService } from 'src/app/pages/root/services/page-title/page-title.service';

/**
 * Top-level component for the Platform module.
 */
@Component({
	selector: 'cu-platform',
	templateUrl: './platform.component.html',
	styleUrls: ['./platform.component.scss']
})
export class PlatformComponent {
	private _isSidenavOpened = false;

	/**
	 * It's _true_ if the sidenav should be opened and _false_ otherwise.
	 */
	public get isSidenavOpened( ): boolean {
		return this._isSidenavOpened;
	}
	public set isSidenavOpened( value: boolean ) {
		this._isSidenavOpened = value;
	}

	/**
	 * The title of the website.
	 */
	public get siteTitle( ): string {
		return siteTitle;
	}

	/**
	 * The title associated to the current route, either statically defined in the route or set programatically.
	 *
	 * If the route has neither type of title, it's _undefined_.
	 */
	public get routeTitle( ): string | undefined {
		return this.pageTitleService.routeTitle;
	}

	/**
	 * It's _true_ if the route has a title to display and _false_ otherwise.
	 */
	public get shouldShowRouteTitle( ): boolean {
		return this.pageTitleService.routeTitle !== undefined;
	}

	/**
	 * The full name of the authenticated user.
	 *
	 * If there is no user authenticated, it is _undefined_.
	 */
	public get fullNameOfAuthenticatedUser( ): string | undefined {
		return this.authService.authenticatedUserSnapshot?.fullName;
	}

	/**
	 * It's _true_ if a client is authenticated and _false_ otherwise.
	 */
	public get aClientIsAuthenticated( ): boolean {
		return this.authService.aClientIsAuthenticatedSnapshot;
	}

	/**
	 * It's _true_ if a kitchen site employee is authenticated and _false_ otherwise.
	 */
	public get aKitchenSiteEmployeeIsAuthenticated( ): boolean {
		return this.authService.aKitchenSiteEmployeeIsAuthenticatedSnapshot;
	}

	public constructor(
		private readonly authService: AuthService,
		private readonly pageTitleService: PageTitleService,
	) { }

	/**
	 * Deauthenticates the currently authenticated user.
	 */
	public deauthenticate( ): void {
		this.authService.deauthenticate( );
	}

	/**
	 * Sets the sidenav to be opened.
	 */
	public openSidenav( ): void {
		this.isSidenavOpened = true;
	}

	/**
	 * Sets the sidenav to be closed.
	 */
	public closeSidenav( ): void {
		this.isSidenavOpened = false;
	}

}