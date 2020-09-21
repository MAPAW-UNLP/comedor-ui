import { TipoDeTicket } from '../enumerativos/tipo-de-ticket';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa un ticket comprado por un cliente.
 *
 * El cliente puede canjearlo solo por el combo que tiene asociado en una sede del comedor y fecha específicas.
 */
export class Ticket extends Modelo {
	private readonly _idCombo: string;
	private readonly _idSede: string;
	private readonly _fecha: string;
	private readonly _tipo: TipoDeTicket;
	private readonly _precio: number;

	/**
	 * El identificador único del ticket.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El identificador único del combo para el que el ticket fue comprado.
	 */
	public get idCombo( ): string {
		return this._idCombo;
	}

	/**
	 * El identificador único de la sede del comedor donde el ticket es válido.
	 */
	public get idSede( ): string {
		return this._idSede;
	}

	/**
	 * La fecha para la que es válido el ticket, formateada en ISO 8601.
	 */
	public get fecha( ): string {
		return this._fecha;
	}

	/**
	 * El tipo de ticket: puede ser para consumo presencial o para retirar.
	 */
	public get tipo( ): TipoDeTicket {
		return this._tipo;
	}

	/**
	 * El precio del ticket, en ARS.
	 */
	public get precio( ): number {
		return this._precio;
	}

	public constructor(
		id: string,
		idCombo: string,
		idSede: string,
		fecha: string,
		tipo: TipoDeTicket,
		precio: number,
	) {
		super( id );
		this._idCombo = idCombo;
		this._idSede = idSede;
		this._fecha = fecha;
		this._tipo = tipo;
		this._precio = precio;
	}

}