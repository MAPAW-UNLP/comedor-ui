import { Modelo } from './modelo.model';

/**
 * Modelo que representa una entrada de un menu que describe una comida junto con su precio y stock.
 */
export class EntradaDeMenu extends Modelo {
	private readonly _idComida: string;
	private readonly _precioUnitario: number;
	private readonly _stockActual: number;

	/**
	 * El identificador único de la entrada de menú.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El identificador único de la comida descrita por la entrada de menú.
	 */
	public get idComida( ): string {
		return this._idComida;
	}

	/**
	 * El precio unitario de la comida descrita por la entrada de menú en ese día.
	 */
	public get precioUnitario( ): number {
		return this._precioUnitario;
	}

	/**
	 * El stock actual de la comida descrita por la entrada de menú, en cantidad de porciones.
	 *
	 * Este valor decrece a medida que los clientes compran tickets para esta entrada de menú.
	 */
	public get stockActual( ): number {
		return this._stockActual;
	}

	public constructor(
		id: string,
		idComida: string,
		precioUnitario: number,
		stockActual: number,
	) {
		super( id );
		this._idComida = idComida;
		this._precioUnitario = precioUnitario;
		this._stockActual = stockActual;
	}

}