import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { RouteData } from 'src/app/interfaces/route-data.interface';
import { PageTitleService } from '../../services/page-title/page-title.service';

/**
 * Top-level component of the Root module.
 */
@Component({
	selector: 'cu-root',
	templateUrl: './root.component.html',
	styleUrls: [ './root.component.scss' ],
})
export class RootComponent implements OnInit {

	public constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private readonly pageTitleService: PageTitleService,
	) { }

	/**
	 * Initializes the component.
	 */
	public ngOnInit( ): void {
		this.initializePageTitleUpdateOnRouteNavigation( );
	}

	/**
	 * Initializes the logic to update the title of the browser window with the one associated with the current
	 * route whenever a navigation event happens.
	 */
	private initializePageTitleUpdateOnRouteNavigation( ): void {
		const activatedRouteDataObservable: Observable<RouteData | undefined> = this.router.events.pipe(
			filter( ( event ) => event instanceof NavigationEnd ),
			switchMap( ( ) => of( this.findInnermostActivatedRoute( this.activatedRoute ) ) ),
			mergeMap( ( innermostActivatedRoute ) => <Observable<RouteData>> innermostActivatedRoute.data ),
		);

		activatedRouteDataObservable.subscribe({
			next: ( activatedRouteData: RouteData | undefined ) => {
				this.pageTitleService.setFromRouteData( activatedRouteData );
			},
		});
	}

	/**
	 * Looks recursively the innermost child route from the activated route, and returns it.
	 */
	private findInnermostActivatedRoute( activatedRoute: ActivatedRoute ): ActivatedRoute {
		return ( activatedRoute.firstChild )
			? this.findInnermostActivatedRoute( activatedRoute.firstChild )
			: activatedRoute;
	}

}