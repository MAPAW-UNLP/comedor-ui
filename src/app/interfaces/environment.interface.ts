/**
 * Object that contains the environment variables for a given execution environment.
 */
export interface Environment {

	/**
	 * The environment's name.
	 */
	readonly name: string;

	/**
	 * The components of the URL of the server.
	 */
	readonly serverUrl: {

		/**
		 * The domain of the URL of the server.
		 */
		readonly domain: string;

		/**
		 * The prefix of the proxy server.
		 */
		readonly proxyPrefix: string;

	};

	/**
	 * Object that contains the resource paths of the URLS accessible by the application in the server.
	 */
	readonly resourcePaths: {

		/**
		 * Resource route of the authentication endpoint.
		 */
		readonly login: string;
		readonly ingredientRecipe: string;

	};

}