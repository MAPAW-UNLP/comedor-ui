import { TipoDeCliente } from '../enumerativos/tipo-de-cliente';
import { Facultad } from './facultad.model';
import { Usuario } from './usuario.model';

/**
 * Modelo que representa un usuario del sistema que compra tickets para combos en una sede del comedor.
 */
export class Cliente extends Usuario {
	private readonly _correoElectronico: string;
	private readonly _tipo: TipoDeCliente;
	private readonly _facultad: Facultad;

	/**
	 * El identificador único del cliente.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre completo del cliente.
	 */
	public get nombreCompleto( ): string {
		return super.nombreCompleto;
	}

	/**
	 * El Documento Nacional de Identidad del cliente.
	 */
	public get dni( ): string {
		return super.dni;
	}

	/**
	 * La dirección de correo electrónico del cliente.
	 */
	public get correoElectronico( ): string {
		return this._correoElectronico;
	}

	/**
	 * El tipo del cliente: puede ser "estudiante", "docente" o "no docente".
	 */
	public get tipo( ): TipoDeCliente {
		return this._tipo;
	}

	// DO: Corroborar la cardinalidad, un cliente puede pertenecer simultáneamente a varias facultades
	/**
	 * La facultad a la que el cliente pertenece.
	 */
	public get facultad( ): Facultad {
		return this._facultad;
	}

	public constructor(
		id: string,
		nombreCompleto: string,
		dni: string,
		correoElectronico: string,
		tipo: TipoDeCliente,
		facultad: Facultad,
	) {
		super( id, nombreCompleto, dni );
		this._correoElectronico = correoElectronico;
		this._tipo = tipo;
		this._facultad = facultad;
	}

}