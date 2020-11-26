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

		/**
		 * // EXPLAIN
		 */
		readonly ingredientRecipe: string;

		/**
		 * // EXPLAIN
		 */
		readonly dishRecipe: string;
		readonly kitchenSite: string;
		readonly meals: string;
		readonly menus: string;
		readonly tickets: string;

		/**
		 * Resource route of the dish listing endpoint.
		 */
		readonly dishList: string;

		/**
		 * Resource route of the dish retrieval endpoint.
		 */
		readonly dishRetrieval: string;

		/**
		 * Resource route of the dish creation endpoint.
		 */
		readonly dishCreation: string;

		/**
		 * Resource route of the meal listing endpoint.
		 */
		readonly mealList: string;

		/**
		 * Resource route of the meal retrieval endpoint.
		 */
		readonly mealRetrieval: string;

		/**
		 * Resource route of the meal creation endpoint.
		 */
		readonly mealCreation: string;

		readonly evaluationList: string;
		readonly evaluationCreation: string;
		readonly salesReports: string;

	};

}