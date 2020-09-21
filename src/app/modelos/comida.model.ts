import { Modelo } from './modelo.model';
import { Receta } from '../interfaces/receta.interface';
import { Ingrediente } from './ingrediente.model';

/**
 * Modelo que representa una comida asociada a una receta particular.
 */
export class Comida extends Modelo {
	private readonly _nombre: string;
	private readonly _receta: Receta;

	/**
	 * El identificador único de la comida.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre de la comida.
	 */
	public get nombre( ): string {
		return this._nombre;
	}

	/**
	 * La receta de la comida.
	 *
	 * Indica todos los ingredientes incluídos en la comida junto con la cantidad de cada uno.
	 */
	public get receta( ): Receta {
		return this._receta;
	}

	/**
	 * La lista de ingredientes incluídos en la comida.
	 */
	public get ingredientes( ): Ingrediente[ ] {
		return this.receta.map( ( entrada ) => entrada.ingrediente );
	}

	/**
	 * Valor que equivale a _true_ si la comida es apta para celíacos y a _falso_ en caso contrario.
	 *
	 * Se considera que la comida es apta para celíacos si todos sus ingredientes lo son.
	 */
	public get esAptaParaCeliacos( ): boolean {
		return this.ingredientes.every( ( ingrediente ) => ingrediente.esAptoParaCeliacos );
	}

	/**
	 * Valor que equivale a _true_ si la comida es apta para vegetarianos y a _falso_ en caso contrario.
	 *
	 * Se considera que la comida es apta para vegetarianos si todos sus ingredientes lo son.
	 */
	public get esAptaParaVegetarianos( ): boolean {
		return this.ingredientes.every( ( ingrediente ) => ingrediente.esAptoParaCeliacos );
	}

	public constructor(
		id: string,
		nombre: string,
		receta: Receta,
	) {
		super( id );
		this._nombre = nombre;
		this._receta = receta;
	}

}