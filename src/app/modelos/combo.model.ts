import { Comida } from './comida.model';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa un combo de comidas disponible como opción en el menú de una sede del comedor.
 */
export class Combo extends Modelo {
	private readonly _nombre: string;
	private readonly _comidas: Comida[ ];

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
	 * Colección de las comidas que componen el combo.
	 */
	public get comidas( ): Comida[ ] {
		return this._comidas;
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para celíacos y a _falso_ en caso contrario.
	 *
	 * Se considera que el combo es apto para celíacos si todas las comidas que incluye lo son.
	 */
	public get esAptoParaCeliacos( ): boolean {
		return this.comidas.every( ( comida ) => comida.esAptaParaCeliacos );
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para vegetarianos y a _falso_ en caso contrario.
	 *
	 * Se considera que el combo es apto para vegetarianos si todas las comidas que incluye lo son.
	 */
	public get esAptoParaVegetarianos( ): boolean {
		return this.comidas.every( ( comida ) => comida.esAptaParaVegetarianos );
	}

	public constructor(
		id: string,
		nombre: string,
		comidas: Comida[ ],
	) {
		super( id );
		this._nombre = nombre;
		this._comidas = comidas;
	}
}