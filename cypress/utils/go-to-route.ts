import { routes } from './routes';

/**
 * Visits one of the site's routes.
 *
 * @param routeName the name of the route to visit.
 */
export function goToRoute( routeName: keyof typeof routes ): void {
	cy.visit( routes[ routeName ] );
}