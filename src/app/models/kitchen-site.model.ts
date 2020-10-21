import { Entity } from './entity.model';

/**
 * Model that represents one of the existing kitchen sites.
 */
export class KitchenSite extends Entity {
	private readonly _name: string;

	/**
	 * The unique identifier of the kitchen site.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The meal associated to the kitchen site.
	 */
	public get name( ): string {
		return this._name;
	}

	public constructor(
		id: string,
		name: string,
	) {
		super( id );
		this._name = name;
	}

}