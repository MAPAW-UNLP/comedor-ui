import { SedeDeComedor } from '../enumerativos/sede-de-comedor.enum';
import { Usuario } from './usuario.model';

/**
 * Modelo que representa a un empleado del comedor.
 */
export class EmpleadoDeComedor extends Usuario {
	private readonly _sede: SedeDeComedor;

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
	 * La sede donde trabaja el empleado del comedor.
	 */
	public get sede( ): SedeDeComedor {
		return this._sede;
	}

	public constructor(
		id: string,
		nombreCompleto: string,
		dni: string,
		sede: SedeDeComedor,
	) {
		super( id, nombreCompleto, dni );
		this._sede = sede;
	}

}