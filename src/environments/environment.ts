import { Environment } from 'src/app/interfaces/environment.interface';

/**
 * Object that represents a default execution environment.
 *
 * This file is always replaced with the one associated to the correct execution environment by Webpack.
 */
export const environment: Environment = {
	name: 'default',
	serverUrl: {
		domain: 'comedor-universitario.herokuapp.com'
	},
	resourcePaths: {
		login: '/api/login',
	},
};