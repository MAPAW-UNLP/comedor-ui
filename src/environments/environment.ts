import { Environment } from 'src/app/interfaces/environment.interface';

/**
 * Object that represents a default execution environment.
 *
 * This file is always replaced with the one associated to the correct execution environment by Webpack.
 */
export const environment: Environment = {
	name: 'default',
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
		evaluationCreation: '/api/meal/evaluate',
		evaluationList: '/api/meal/{id}/evaluation/',
		salesReports: '/api/menu/reportMenus',
	},
};