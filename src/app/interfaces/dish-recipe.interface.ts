import { Measurement } from './measurement.interface';

/**
 * Each of the entries in the dish recipe, associated to an individual ingredient and an amount.
 */
type DishRecipeEntry = {

	/**
	 * The ingredient associated to the dish recipe entry.
	 */
	ingredient: string;

	/**
	 * Amount of the ingredient required to make the dish.
	 */
	amount: Measurement;

};

/**
 * Represents the list of every ingredient required to make a particular dish, along with the amount required
 * of each.
 */
export interface DishRecipe extends Array<DishRecipeEntry> { }