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
	private _defaultRouteTitle: string | undefined = undefined;
	private _customRouteTitle: string | undefined = undefined;

	/**
	 * The portion of the title associated to the current route, statically defined by the activated route.
	 *
	 * If the activated route defines no route title, it's _undefined_.
	 *
	 * Updating its value will automatically update the page title to reflect it.
	 */
	private get defaultRouteTitle( ): string | undefined {
		return this._defaultRouteTitle;
	}
	private set defaultRouteTitle( value: string | undefined ) {
		this._defaultRouteTitle = value;
		this.updatePageTitle( );
	}

	/**
	 * The portion of the title associated to the current route, defined programatically.
	 *
	 * If there is no custom route title defined programatically, it's _undefined_.
	 *
	 * Updating its value will automatically update the page title to reflect it.
	 */
	private get customRouteTitle( ): string | undefined {
		return this._customRouteTitle;
	}
	private set customRouteTitle( value: string | undefined ) {

		/*
		 * HACK: Using setTimeout to schedule the route title change as a macrotask and thus prevent the
		 * "ExpressionChangedAfterItHasBeenChecked" error caused by a child component indirectly updating
		 * a field in the parent component's view through this service.
		 */
		setTimeout( ( ) => {
			this._customRouteTitle = value;
			this.updatePageTitle( );
		});

	}

	/**
	 * The portion of the title associated to the current route.
	 *
	 * It's equal to the route title with the highest precedence, if any, and _undefined_ otherwise.
	 *
	 * Custom route titles set programatically take precedence over default route titles set statically by the
	 * activated route.
	 */
	public get routeTitle( ): string | undefined {
		return this.customRouteTitle ?? this.defaultRouteTitle;
	}
	public set routeTitle( value: string | undefined ) {
		this.customRouteTitle = value;
	}

	public constructor(
		private readonly titleService: Title,
	) { }

	/**
	 * Updates the stored default route title with the metadata from the activated route.
	 *
	 * Also resets the custom route title.
	 */
	public setFromRouteData( routeData: RouteData | undefined ): void {
		const pageTitleInRoute = routeData?.pageTitle;
		this._customRouteTitle = undefined;
		this.defaultRouteTitle = pageTitleInRoute;
	}

	/**
	 * Updates the page title with the stored site and route titles.
	 */
	private updatePageTitle( ): void {
		if ( this.routeTitle === undefined ) {
			this.titleService.setTitle( siteTitle );
		}
		else {
			this.titleService.setTitle( `${ this.routeTitle } - ${ siteTitle }` );
		}
	}

}