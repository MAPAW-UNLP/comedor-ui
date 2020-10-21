import { DishType } from 'src/app/enums/dish-type.enum';
import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';

/**
 * Data Transfer Object _(DTO)_ that defines the server response after a meal request from the user.
 */
export interface MealResponseDTO {

	/**
	 * The unique identifier of the meal.
	 */
	id: number;

	/**
	 * The name of the meal.
	 */
	name: string;

	/**
	 * Collection of the items that make up the meal, with each item describing an individual dish and its role
	 * in the meal.
	 */
	items: {

		/**
		 * The dish associated to the meal item.
		 */
		dish: {

			/**
			 * The unique identifier of the dish.
			 */
			id: number;

			/**
			 * The name of the dish.
			 */
			name: string;

			/**
			 * The collection of items that make up the deal, each consisting of an ingredient and its quantity.
			 */
			items: {

				/**
				 * The ingredient associated with the recipe item.
				 */
				ingredient: {

					/**
					 * The unique identifier of the ingredient.
					 */
					id: number;

					/**
					 * The name of the ingredient.
					 */
					name: string;

					/**
					 * The measurement unit associated to the ingredient.
					 */
					measurementUnit: MeasurementUnit;

				};

				/**
				 * The amount of the ingredient in the dish.
				 */
				quantity: number;

			}[ ];

		};

		/**
		 * The role of the dish within the meal.
		 */
		dishType: DishType;

	}[ ];

	/**
	 * Value that equals _true_ if the meal is suitable for celiacs and _false_ otherwise.
	 */
	suitableForCeliacs: boolean;

	/**
	 * Value that equals _true_ if the meal is suitable for vegetarians and _false_ otherwise.
	 */
	suitableForVegetarians: boolean;

	/**
	 * Optional information about the meal for the clients. It's possibly _undefined_.
	 */
	observations: string;

}