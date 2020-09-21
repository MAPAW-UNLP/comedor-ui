import { TipoDeTicket } from '../enumerativos/tipo-de-ticket';
import { Combo } from './combo.model';
import { Modelo } from './modelo.model';
import { Sede } from './sede.model';

/**
 * Modelo que representa un ticket comprado por un cliente.
 *
 * El cliente puede canjearlo solo por el combo que tiene asociado en una sede del comedor y fecha específicas.
 */
export class Ticket extends Modelo {
	private readonly _combo: Combo;
	private readonly _sede: Sede;
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
	 * El combo para el que el ticket fue comprado.
	 */
	public get combo( ): Combo {
		return this._combo;
	}

	/**
	 * La sede del comedor donde el ticket es válido.
	 */
	public get sede( ): Sede {
		return this._sede;
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
		combo: Combo,
		sede: Sede,
		fecha: string,
		tipo: TipoDeTicket,
		precio: number,
	) {
		super( id );
		this._combo = combo;
		this._sede = sede;
		this._fecha = fecha;
		this._tipo = tipo;
		this._precio = precio;
	}

}