import { KitchenSite } from '../enums/kitchen-site.enum';
import { Entity } from './entity.model';
import { Meal } from './meal.model';

/**
 * Model that represents one of the available menus in a specific kitchen site and date.
 *
 * Each menu is associated to a meal, of which the unit price and current stock are known.
 */
export class Menu extends Entity {
	private readonly _kitchenSite: KitchenSite;
	private readonly _date: string;
	private readonly _meal: Meal;
	private readonly _unitPrice: number;
	private readonly _currentStock: number;

	/**
	 * The unique identifier of the menu.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The kitchen site where the menu is offered.
	 */
	public get kitchenSite( ): KitchenSite {
		return this._kitchenSite;
	}

	/**
	 * The date for which the menu is enabled, formatted as ISO 8601.
	 */
	public get date( ): string {
		return this._date;
	}

	/**
	 * The meal associated to the menu.
	 */
	public get meal( ): Meal {
		return this._meal;
	}

	/**
	 * The unit price of the menu, in ARS.
	 */
	public get unitPrice( ): number {
		return this._unitPrice;
	}

	/**
	 * The current amount of units of the meal associated to the menu available on stock.
	 */
	public get currentStock( ): number {
		return this._currentStock;
	}

	public constructor(
		id: string,
		kitchenSite: KitchenSite,
		date: string,
		meal: Meal,
		unitPrice: number,
		currentStock: number,
	) {
		super( id );
		this._kitchenSite = kitchenSite;
		this._date = date;
		this._meal = meal;
		this._unitPrice = unitPrice;
		this._currentStock = currentStock;
	}

}