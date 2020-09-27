import { Routes } from '@angular/router';
import { RouteData } from './route-data.interface';

/**
 * The native Angular Route type.
 */
type Route = Routes[ 0 ];

/**
 * Defines the structure of a route of this application.
 */
type ComedorUniversitarioRoute = Omit<Route, 'data' | 'children'> & {

	/**
	 * Additional developer-defined data provided to the component via ActivatedRoute.
	 *
	 * This application includes a set of defined fields for every route, modeled as RouteData.
	 */
	data?: RouteData | undefined;

	/**
	 * An array of child Route objects that specifies a nested route configuration.
	 */
	children?: ComedorUniversitarioRoutes | undefined;

};

/**
 * Represents a list of routes of this application.
 */
export interface ComedorUniversitarioRoutes extends Array<ComedorUniversitarioRoute> { }