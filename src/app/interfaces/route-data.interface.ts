/**
 * Defines the structure of the "data" property of a route.
 */
export interface RouteData {

	/**
	 * The title of the page associated to the route.
	 *
	 * Is used by the PageTitle service to update the window title when the route is activated.
	 */
	pageTitle: string;

}