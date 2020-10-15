import { Environment } from 'src/app/interfaces/environment.interface';

/**
 * Object that represents the remote execution environment.
 */
export const environment: Environment = {
	name: 'remote',
	serverUrl: {
		proxyPrefix: '/backend',
		domain: 'comedor-universitario.herokuapp.com'
	},
	resourcePaths: {
		login: '/login',
		ingredientRecipe: '/api/ingredientRecipe',
		dishRecipe: '/api/dishRecipe',
	},
};