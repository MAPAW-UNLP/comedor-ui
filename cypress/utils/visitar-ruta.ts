import { rutas } from './rutas';

/**
 * Visita la ruta del sitio provista.
 *
 * @param nombreDeRuta el nombre de la ruta del sitio a visitar.
 */
export function visitarRuta( nombreDeRuta: keyof typeof rutas ): void {
	cy.visit( rutas[ nombreDeRuta ] );
}