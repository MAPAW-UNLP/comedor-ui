import { Entity } from './entity.model';

/**
 * Model that represents a user of the application.
 */
export class User extends Entity {
	private readonly _fullName: string;
	private readonly _dni: string;

	/**
	 * The unique identifier of the user.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The full name of the user.
	 */
	public get fullName( ): string {
		return this._fullName;
	}

	/**
	 * The National Identity Document _(Documento Nacional de Identidad - DNI)_ of the user.
	 */
	public get dni( ): string {
		return this._dni;
	}

	public constructor(
		id: string,
		fullName: string,
		dni: string,
	) {
		super( id );
		this._fullName = fullName;
		this._dni = dni;
	}

}