import { Modelo } from './modelo.model';

/**
 * Modelo que representa a un empleado del comedor.
 */
export class EmpleadoDeComedor extends Modelo {
	private readonly _nombreCompleto: string;
	private readonly _idSede: string;

	/**
	 * El identificador único del empleado del comedor.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre completo del empleado del comedor.
	 */
	public get nombreCompleto( ): string {
		return this._nombreCompleto;
	}

	/**
	 * El identificador único de la sede donde trabaja el empleado del comedor.
	 */
	public get idSede( ): string {
		return this._idSede;
	}

	public constructor(
		id: string,
		nombreCompleto: string,
		idSede: string,
	) {
		super( id );
		this._nombreCompleto = nombreCompleto;
		this._idSede = idSede;
	}

}