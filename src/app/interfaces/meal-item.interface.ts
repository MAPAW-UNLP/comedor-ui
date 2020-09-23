import { DishType } from '../enums/dish-type.enum';
import { Dish } from '../models/dish.model';

/**
 * Represents one of the dishes in a meal, with a description of its role within the meal (eg: main dish).
 */
export interface MealItem {

	/**
	 * The dish assocciated to the meal item.
	 */
	dish: Dish;

	/**
	 * The role of the dish within the meal.
	 *
	 * Eg: main dish, side dish, dessert.
	 */
	dishType: DishType;

}