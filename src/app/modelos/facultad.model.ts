import { Modelo } from './modelo.model';

/**
 * Modelo que representa una facultad a la que un cliente pertenece.
 */
export class Facultad extends Modelo {
	private readonly _nombre: string;

	/**
	 * El identificador único de la facultad.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre de la facultad.
	 */
	public get nombre( ): string {
		return this._nombre;
	}

	public constructor(
		id: string,
		nombre: string,
	) {
		super( id );
		this._nombre = nombre;
	}

}