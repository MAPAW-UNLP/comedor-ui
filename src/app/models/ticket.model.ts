import { Client } from './client.model';
import { Meal } from './meal.model';
import { Menu } from './menu.model';
import { Entity } from './entity.model';
import { ConsumptionType } from '../enums/consumption-type.enum';
import { KitchenSite } from '../enums/kitchen-site.enum';

/**
 * Model that represents a ticket puchased by a specific client, who can exchange it for its associated meal at
 * a specific kitchen site on a specific date.
 */
export class Ticket extends Entity {
	private readonly _menu: Menu;
	private readonly _client: Client;
	private readonly _consumptionType: ConsumptionType;

	/**
	 * The unique identifier of the ticket.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The menu for which the ticket was purchased.
	 */
	public get menu( ): Menu {
		return this._menu;
	}

	/**
	 * The client who owns the ticket.
	 */
	public get client( ): Client {
		return this._client;
	}

	/**
	 * The meal associated to the menu for which the ticket was purchased.
	 */
	public get meal( ): Meal {
		return this.menu.meal;
	}

	/**
	 * The kitchen site where the ticket is valid.
	 */
	public get kitchenSite( ): KitchenSite {
		return this.menu.kitchenSite;
	}

	/**
	 * The date on which the ticked is valid, formatted as ISO 8601.
	 */
	public get date( ): string {
		return this.menu.date;
	}

	/**
	 * The consumption type of ticket: it can be either for on-site consuption or for takeaway.
	 */
	public get type( ): ConsumptionType {
		return this._consumptionType;
	}

	/**
	 * The unit price of the ticket, in ARS.
	 */
	public get unitPrice( ): number {
		return this.menu.unitPrice;
	}

	public constructor(
		id: string,
		menu: Menu,
		client: Client,
		consumptionType: ConsumptionType,
	) {
		super( id );
		this._menu = menu;
		this._client = client;
		this._consumptionType = consumptionType;
	}

}