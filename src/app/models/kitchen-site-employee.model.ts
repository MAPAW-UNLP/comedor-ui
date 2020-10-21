import { KitchenSite } from './kitchen-site.model';
import { User } from './user.model';

/**
 * Model that represents an employee of a University kitchen site.
 */
export class KitchenSiteEmployee extends User {
	private readonly _kitchenSite: KitchenSite;

	/**
	 * The unique identifier of the kitchen site employee.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The full name of the kitchen site employee.
	 */
	public get fullName( ): string {
		return super.fullName;
	}

	/**
	 * The National Identity Document _(Documento Nacional de Identidad - DNI)_ of the kitchen site employee.
	 */
	public get dni( ): string {
		return super.dni;
	}

	/**
	 * The kitchen site where the kitchen site employee works.
	 */
	public get kitchenSite( ): KitchenSite {
		return this._kitchenSite;
	}

	public constructor(
		id: string,
		fullName: string,
		dni: string,
		kitchenSite: KitchenSite,
	) {
		super( id, fullName, dni );
		this._kitchenSite = kitchenSite;
	}

}