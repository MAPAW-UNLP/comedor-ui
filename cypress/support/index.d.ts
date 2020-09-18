type routes = typeof import( '../utils/routes' ).routes;

declare namespace Cypress {

	interface Chainable {

		/**
		 * Visits one of the site's routes.
		 *
		 * @param routeName the name of the route to visit.
		 */
		goToRoute( routeName: keyof routes ): Chainable;

	}

}