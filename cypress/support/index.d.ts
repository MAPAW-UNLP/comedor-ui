type routes = typeof import( '../utils/routes' ).routes;

declare namespace Cypress {

	interface Chainable {

		/**
		 * Visits the route with the provided name.
		 *
		 * @param routeName the name of the route to visit.
		 */
		visitRoute( routeName: keyof routes ): Chainable;

	}

}