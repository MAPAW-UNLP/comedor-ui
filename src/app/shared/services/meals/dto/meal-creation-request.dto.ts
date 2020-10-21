import { DishType } from 'src/app/enums/dish-type.enum';

/**
 * Data Transfer Object _(DTO)_ that defines the body of a request from the user to create a meal.
 */
export interface MealCreationRequestDTO {
	/**
	 * The name of the meal to create.
	 */
	name: string;
	/**
	 * A collection of the items that make up the meal, each one consisting of a dish (referenced by its unique
	 * identifier) and a dish type.
	 */
	items: {
		/**
		 * I don't even know why do we even need this field anymore.
		 */
		name: string;
		/**
		 * A partial representation of the dish associated to the meal item, containing only its unique
		 * identifier 🤷🏻‍♂️.
		 */
		recipe: {
			/**
			 * The unique identifier of the dish associated to the meal item.
			 */
			id: number;
		};
		/**
		 * The role of the dish within the meal.
		 */
		type: DishType;
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
	observations: string | undefined;
}