import { Ingredient } from '../models/ingredient.model';

/**
 * Represents one of the ingredients in dish, along with the amount required of it.
 */
export interface DishItem {

	/**
	 * The ingredient associated to the dish item.
	 */
	ingredient: Ingredient;

	/**
	 * Amount of the ingredient required to make the dish, expressed in the ingredient's associated measurement
	 * unit.
	 */
	quantity: number;

}