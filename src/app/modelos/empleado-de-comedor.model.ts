import { Usuario } from './usuario.model';

/**
 * Modelo que representa a un empleado del comedor.
 */
export class EmpleadoDeComedor extends Usuario {
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
		return super.nombreCompleto;
	}

	/**
	 * El Documento Nacional de Identidad del empleado del comedor.
	 */
	public get dni( ): string {
		return super.dni;
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
		dni: string,
		idSede: string,
	) {
		super( id, nombreCompleto, dni );
		this._idSede = idSede;
	}

}