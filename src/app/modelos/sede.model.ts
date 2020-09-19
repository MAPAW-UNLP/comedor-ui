import { Modelo } from './modelo.model';

/**
 * Modelo que representa una de las sedes del comedor.
 */
export class Sede extends Modelo {
	private readonly _nombre: string;
	private readonly _direccionPostal: string;

	/**
	 * El identificador único de la sede.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre de la sede.
	 */
	public get nombre( ): string {
		return this._nombre;
	}

	/**
	 * La dirección postal de la sede.
	 */
	public get direccionPostal( ): string {
		return this._direccionPostal;
	}

	public constructor(
		id: string,
		nombre: string,
		direccionPostal: string,
	) {
		super( id );
		this._nombre = nombre;
		this._direccionPostal = direccionPostal;
	}

}