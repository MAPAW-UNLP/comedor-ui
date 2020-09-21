import { ItemDeCombo } from '../interfaces/item-de-combo.interface';
import { Comida } from './comida.model';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa un combo de comidas disponible como opción en el menú de una sede del comedor, con cada comida
 * asociada a un rol específico (ej: plato principal, guarnición, postre).
 */
export class Combo extends Modelo {
	private readonly _nombre: string;
	private readonly _items: ItemDeCombo[ ];

	/**
	 * El identificador único del combo.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre del combo.
	 */
	public get nombre( ): string {
		return this._nombre;
	}

	/**
	 * Colección de los ítems que componen el combo.
	 */
	public get items( ): ItemDeCombo[ ] {
		return this._items;
	}

	/**
	 * Colección de las comidas en los ítems que componen el combo.
	 */
	public get comidas( ): Comida[ ] {
		return this.items.map( ( item ) => item.comida );
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para celíacos y a _false_ en caso contrario.
	 *
	 * Se considera que el combo es apto para celíacos si todas las comidas que incluye lo son.
	 */
	public get esAptoParaCeliacos( ): boolean {
		return this.comidas.every( ( comida ) => comida.esAptaParaCeliacos );
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para vegetarianos y a _false_ en caso contrario.
	 *
	 * Se considera que el combo es apto para vegetarianos si todas las comidas que incluye lo son.
	 */
	public get esAptoParaVegetarianos( ): boolean {
		return this.comidas.every( ( comida ) => comida.esAptaParaVegetarianos );
	}

	public constructor(
		id: string,
		nombre: string,
		items: ItemDeCombo[ ],
	) {
		super( id );
		this._nombre = nombre;
		this._items = items;
	}
}