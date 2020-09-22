import { SedeDeComedor } from '../enumerativos/sede-de-comedor.enum';
import { TipoDeTicket } from '../enumerativos/tipo-de-ticket.enum';
import { Cliente } from './cliente.model';
import { Combo } from './combo.model';
import { Menu } from './menu.model';
import { Entidad } from './entidad.model';

/**
 * Modelo que representa un ticket comprado por un cliente específico, el cual puede canjearlo por un combo
 * específico en una sede específica del comedor en una fecha específica.
 */
export class Ticket extends Entidad {
	private readonly _menu: Menu;
	private readonly _cliente: Cliente;
	private readonly _tipo: TipoDeTicket;

	/**
	 * El identificador único del ticket.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El menú para el que el ticket fue comprado.
	 */
	public get menu( ): Menu {
		return this._menu;
	}

	/**
	 * El cliente dueño del ticket.
	 */
	public get cliente( ): Cliente {
		return this._cliente;
	}

	/**
	 * El combo asociado al menú para el que el ticket fue comprado.
	 */
	public get combo( ): Combo {
		return this.menu.combo;
	}

	/**
	 * La sede del comedor donde el ticket es válido.
	 */
	public get sede( ): SedeDeComedor {
		return this.menu.sede;
	}

	/**
	 * La fecha para la el ticket es válido, formateada en ISO 8601.
	 */
	public get fecha( ): string {
		return this.menu.fecha;
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
		return this.menu.precioUnitario;
	}

	public constructor(
		id: string,
		menu: Menu,
		cliente: Cliente,
		tipo: TipoDeTicket,
	) {
		super( id );
		this._menu = menu;
		this._cliente = cliente;
		this._tipo = tipo;
	}

}