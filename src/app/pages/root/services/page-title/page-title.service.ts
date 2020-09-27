import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { siteTitle } from 'src/app/constants/site-title.constant';
import { RouteData } from 'src/app/interfaces/route-data.interface';

/**
 * Service that provides to update the title of the browser tab/window according to a route's data.
 */
@Injectable({
	providedIn: 'root',
})
export class PageTitleService {

	public constructor(
		private readonly titleService: Title,
	) { }

	/**
	 * Updates the page title using the provided route data.
	 */
	public setFromRouteData( routeData: RouteData | undefined ): void {
		const pageTitleInRoute = routeData?.pageTitle;

		if ( pageTitleInRoute === undefined ) {
			this.titleService.setTitle( siteTitle );
		}
		else {
			this.titleService.setTitle( `${ pageTitleInRoute } - ${ siteTitle }` );
		}
	}

}