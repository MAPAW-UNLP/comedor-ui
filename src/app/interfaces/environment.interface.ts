/**
 * Object that contains the environment variables for a given execution environment.
 */
export interface Environment {

	/**
	 * The environment's name.
	 */
	readonly name: string;

	/**
	 * URL of the server.
	 */
	readonly baseUrl: {

		/**
		 * The protocol of the URL of the server.
		 */
		readonly protocol: 'http' | 'https';

		/**
		 * The domain of the URL of the server.
		 */
		readonly domain: string;

	};

	/**
	 * Object that contains the resource paths of the URLS accessible by the application in the server.
	 */
	readonly resourcePaths: {

		/**
		 * Resource route of the authentication endpoint.
		 */
		readonly authenticate: string;

	};

}