import { Environment } from 'src/app/interfaces/environment.interface';

/**
 * Object that represents the local execution environment.
 */
export const environment: Environment = {
	name: 'local',
	baseUrl: {
		protocol: 'http',
		domain: 'localhost:3000'
	},
	resourcePaths: {
		authenticate: '/authenticate',
	},
};