import { Entity } from './entity.model';
import { DishRecipe } from '../interfaces/dish-recipe.interface';

/**
 * Model that represents an individual dish that can be part of a meal, with its own name and recipe.
 */
export class Dish extends Entity {
	private readonly _name: string;
	private readonly _recipe: DishRecipe;

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
	 * The recipe of the dish.
	 *
	 * It describes all the ingredients included in it, along with the amount required of each one.
	 */
	public get recipe( ): DishRecipe {
		return this._recipe;
	}

	/**
	 * The list of ingredients included in the dish.
	 */
	public get ingredients( ): string[ ] {
		return this.recipe.map( ( dishRecipeEntry ) => dishRecipeEntry.ingredient );
	}

	public constructor(
		id: string,
		name: string,
		recipe: DishRecipe,
	) {
		super( id );
		this._name = name;
		this._recipe = recipe;
	}

}