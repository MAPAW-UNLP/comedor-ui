import { Modelo } from './modelo.model';

/**
 * Modelo que representa un combo de comidas disponible como opción en el menú de una sede del comedor.
 */
export class Combo extends Modelo {
	private readonly _nombre: string;
	private readonly _idsComidas: string[ ];

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
	 * Una colección de los identificadores únicos de las comidas que componen el combo.
	 */
	public get idsComidas( ): string[ ] {
		return this._idsComidas;
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para celíacos y a _falso_ en caso contrario.
	 */
	public get esAptoParaCeliacos( ): boolean {
		// DO: Agregar lógica para determinar si es apto para celíacos en funcion de las comidas.
		return false;
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para vegetarianos y a _falso_ en caso contrario.
	 */
	public get esAptoParaVegetarianos( ): boolean {
		// DO: Agregar lógica para determinar si es apto para vegetarianos en funcion de las comidas.
		return false;
	}

	public constructor(
		id: string,
		nombre: string,
		idsComidas: string[ ],
	) {
		super( id );
		this._nombre = nombre;
		this._idsComidas = idsComidas;
	}
}