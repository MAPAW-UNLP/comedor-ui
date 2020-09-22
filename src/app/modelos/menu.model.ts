import { SedeDeComedor } from '../enumerativos/sede-de-comedor.enum';
import { Combo } from './combo.model';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa uno de los menús disponibles en una determinada fecha y sede.
 *
 * Cada menú está asociado a un combo, del cual se conoce el precio y stock actual.
 */
export class Menu extends Modelo {
	private readonly _sede: SedeDeComedor;
	private readonly _fecha: string;
	private readonly _combo: Combo;
	private readonly _precioUnitario: number;
	private readonly _stockActual: number;

	/**
	 * El identificador único del menú.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * La sede que ofrece el menú.
	 */
	public get sede( ): SedeDeComedor {
		return this._sede;
	}

	/**
	 * La fecha para la que el menú está habilitado, formateada en ISO 8601.
	 */
	public get fecha( ): string {
		return this._fecha;
	}

	/**
	 * El combo asociado al menú.
	 */
	public get combo( ): Combo {
		return this._combo;
	}

	/**
	 * El precio unitario del menú, en ARS.
	 */
	public get precioUnitario( ): number {
		return this._precioUnitario;
	}

	/**
	 * La cantidad de unidades actualmente disponibles en stock del combo asociado al menú.
	 */
	public get stockActual( ): number {
		return this._stockActual;
	}

	public constructor(
		id: string,
		sede: SedeDeComedor,
		fecha: string,
		combo: Combo,
		precioUnitario: number,
		stockActual: number,
	) {
		super( id );
		this._sede = sede;
		this._fecha = fecha;
		this._combo = combo;
		this._precioUnitario = precioUnitario;
		this._stockActual = stockActual;
	}

}