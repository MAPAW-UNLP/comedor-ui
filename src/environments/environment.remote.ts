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
		kitchenSite: '/api/kitchenSite',
		meals: '/api/meal',
		menus: '/api/menu',
		tickets: '/api/ticket',
		dishList: '/api/dishRecipe/',
		dishRetrieval: '/api/dishRecipe/{id}/',
		dishCreation: '/api/dishRecipe/save/',
		mealList: '/api/meal/',
		mealRetrieval: '/api/meal/{id}/',
		mealCreation: '/api/meal/save/',
	},
};