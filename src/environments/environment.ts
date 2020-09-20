import { EntornoDeEjecucion } from 'src/app/interfaces/entorno-de-ejecucion';

/**
 * Objeto demostrativo de un entorno de ejecución.
 *
 * Siempre es reemplazado por Webpack por el objeto correspondiente al entorno de ejecución actual.
 */
export const environment: EntornoDeEjecucion = {
	nombre: 'default',
	endpoints: {
		autenticar: '/autenticar',
	},
};