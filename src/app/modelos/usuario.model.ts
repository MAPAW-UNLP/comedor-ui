import { Modelo } from './modelo.model';

/**
 * Modelo que representa a un usuario de la aplicación.
 */
export class Usuario extends Modelo {
	private readonly _nombreCompleto: string;
	private readonly _dni: string;

	/**
	 * El identificador único del usuario.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre completo del usuario.
	 */
	public get nombreCompleto( ): string {
		return this._nombreCompleto;
	}

	/**
	 * El Documento Nacional de Identidad del usuario.
	 */
	public get dni( ): string {
		return this._dni;
	}

	public constructor(
		id: string,
		nombreCompleto: string,
		dni: string,
	) {
		super( id );
		this._nombreCompleto = nombreCompleto;
		this._dni = dni;
	}

}