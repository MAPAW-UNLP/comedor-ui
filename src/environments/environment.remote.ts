import { Environment } from 'src/app/interfaces/environment.interface';

/**
 * Object that represents the remote execution environment.
 */
export const environment: Environment = {
	name: 'local',
	serverUrl: {
		protocol: 'http',
		domain: 'localhost:4200/api'
	},
	resourcePaths: {
		authenticate: 'login',
	},
};