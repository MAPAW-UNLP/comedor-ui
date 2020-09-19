import { TipoDeTicket } from '../enumerativos/tipo-de-ticket';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa un ticket asociado a una entrada del menú en una sede del comedor.
 */
export class Ticket extends Modelo {
	private readonly _idEntradaDeMenu: string;
	private readonly _precio: number;
	private readonly _fecha: string;
	private readonly _tipo: TipoDeTicket;
	private readonly _idSede: string;

	/**
	 * El identificador único del ticket.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El identificador único de la entrada del menú para la que el ticket fue comprado.
	 */
	public get idComida( ): string {
		return this._idEntradaDeMenu;
	}

	/**
	 * El precio del ticket, en ARS.
	 */
	public get precio( ): number {
		return this._precio;
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
	 * El identificador único de la sede del comedor donde el ticket es válido.
	 */
	public get idSede( ): string {
		return this._idSede;
	}

	public constructor(
		id: string,
		idEntradaDeMenu: string,
		precio: number,
		fecha: string,
		tipo: TipoDeTicket,
		idSede: string,
	) {
		super( id );
		this._idEntradaDeMenu = idEntradaDeMenu;
		this._precio = precio;
		this._fecha = fecha;
		this._tipo = tipo;
		this._idSede = idSede;
	}

}