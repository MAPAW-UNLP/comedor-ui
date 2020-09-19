import { TipoDeCliente } from '../enumerativos/tipo-de-cliente';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa un usuario del sistema que compra tickets para comidas en una sede del comedor.
 */
export class Cliente extends Modelo {
	private readonly _nombreCompleto: string;
	private readonly _dni: string;
	private readonly _correoElectronico: string;
	private readonly _tipo: TipoDeCliente;
	private readonly _idFacultad: string;

	/**
	 * El ID único del cliente.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre completo del cliente.
	 */
	public get nombreCompleto( ): string {
		return this._nombreCompleto;
	}

	// DO: Corroborar que este campo esté bien definido porque pueden haber clientes con otros tipos de documento.
	/**
	 * El Documento Nacional de Identidad del cliente.
	 */
	public get dni( ): string {
		return this._dni;
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

	// DO: Corroborar la cardinalidad de este campo, un cliente puede pertenecer simultáneamente a varias facultades
	/**
	 * El identificador único de la facultad a la que el cliente pertenece.
	 */
	public get idFacultad( ): string {
		return this._idFacultad;
	}

	public constructor(
		id: string,
		nombreCompleto: string,
		dni: string,
		correoElectronico: string,
		tipo: TipoDeCliente,
		idFacultad: string,
	) {
		super( id );
		this._nombreCompleto = nombreCompleto;
		this._dni = dni;
		this._correoElectronico = correoElectronico;
		this._tipo = tipo;
		this._idFacultad = idFacultad;
	}

}