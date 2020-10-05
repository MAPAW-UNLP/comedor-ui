import { Environment } from 'src/app/interfaces/environment.interface';

/**
 * Object that represents the local execution environment.
 */
export const environment: Environment = {
	name: 'local',
	serverUrl: {
		protocol: 'https',
		domain: 'comedor-universitario.herokuapp.com'
	},
	resourcePaths: {
		authenticate: 'login',
	},
};