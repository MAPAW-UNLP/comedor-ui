import { routes } from './routes';

/**
 * Visits the route with the provided name.
 *
 * @param routeName the name of the route to visit.
 */
export function visitRoute( routeName: keyof typeof routes ): void {
	cy.visit( routes[ routeName ] );
}