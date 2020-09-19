type rutas = typeof import( '../utils/rutas' ).rutas;

declare namespace Cypress {

	interface Chainable {

		/**
		 * Visita la ruta del sitio provista.
		 *
		 * @param nombreDeRuta el nombre de la ruta del sitio a visitar.
		 */
		visitarRuta( nombreDeRuta: keyof rutas ): Chainable;

	}

}