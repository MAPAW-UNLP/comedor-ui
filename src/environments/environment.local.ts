import { Environment } from 'src/app/interfaces/environment.interface';

/**
 * Object that represents the local execution environment.
 */
export const environment: Environment = {
	name: 'local',
	endpoints: {
		authenticate: '/authenticate',
	},
};