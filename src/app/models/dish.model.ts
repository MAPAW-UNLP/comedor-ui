import { DishItem } from '../interfaces/dish-item.interface';
import { Entity } from './entity.model';
import { Ingredient } from './ingredient.model';

/**
 * Model that represents an individual dish that can be part of a meal, with its own name and recipe.
 */
export class Dish extends Entity {
	private readonly _name: string;
	private readonly _items: DishItem[ ];

	/**
	 * The unique identifier of the dish.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The name of the dish.
	 */
	public get name( ): string {
		return this._name;
	}

	/**
	 * The collection of items of the dish, each consisting of an ingredient and its amount.
	 */
	public get items( ): DishItem[ ] {
		return this._items;
	}

	/**
	 * The list of ingredients included in the dish.
	 */
	public get ingredients( ): Ingredient[ ] {
		return this.items.map( ( dishRecipeEntry ) => dishRecipeEntry.ingredient );
	}

	public constructor(
		id: string,
		name: string,
		items: DishItem[ ],
	) {
		super( id );
		this._name = name;
		this._items = items;
	}

}