import { DishItem } from '../interfaces/dish-item.interface';
import { MealItem } from '../interfaces/meal-item.interface';
import { Dish } from './dish.model';
import { Entity } from './entity.model';
import { Ingredient } from './ingredient.model';

/**
 * Model that represents a fixed combination of dishes available as a menu at a University Kitchen site.
 */
export class Meal extends Entity {
	private readonly _name: string;
	private readonly _isSuitableForCeliacs: boolean;
	private readonly _isSuitableForVegetarians: boolean;
	private readonly _items: MealItem[ ];
	private readonly _observations: string | undefined;

	/**
	 * The unique identifier of the meal.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The name of the meal.
	 */
	public get name( ): string {
		return this._name;
	}

	/**
	 * Value that equals _true_ if the meal is suitable for celiacs and _false_ otherwise.
	 */
	public get isSuitableForCeliacs( ): boolean {
		return this._isSuitableForCeliacs;
	}

	/**
	 * Value that equals _true_ if the meal is suitable for vegetarians and _false_ otherwise.
	 */
	public get isSuitableForVegetarians( ): boolean {
		return this._isSuitableForVegetarians;
	}

	/**
	 * Collection of the items that make up the meal, with each item describing an individual dish and its role
	 * in the meal (eg: appetizer, main dish, dessert, etc).
	 */
	public get items( ): MealItem[ ] {
		return this._items;
	}

	/**
	 * Optional information about the meal for the clients. It's possibly _undefined_.
	 */
	public get observations( ): string | undefined {
		return this._observations;
	}

	/**
	 * Collection of the dishes present in the meal.
	 */
	public get dishes( ): Dish[ ] {
		return this.items.map( ( item ) => item.dish );
	}

	/**
	 * Collection of the ingredients present in the meal.
	 */
	public get ingredients( ): Ingredient[ ] {
		return this.dishes.map( ( dish ) => dish.ingredients ).flat( );
	}

	/**
	 * Collection of the ingredients present in the meal.
	 */
	public get ingredientsWithQuantity( ): { ingredient: Ingredient; quantity: number}[ ] {
		return this.dishes.map( ( dish ) => {
			return dish.items.map((i: DishItem) => {
				return { quantity: i.quantity, ingredient: i.ingredient };
			});
		}).flat( );
	}


	public constructor(
		id: string,
		name: string,
		isSuitableForCeliacs: boolean,
		isSuitableForVegetarians: boolean,
		items: MealItem[ ],
		observations: string | undefined,
	) {
		super( id );
		this._name = name;
		this._isSuitableForCeliacs = isSuitableForCeliacs;
		this._isSuitableForVegetarians = isSuitableForVegetarians;
		this._items = items;
		this._observations = observations;
	}
}