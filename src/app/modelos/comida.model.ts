import { Modelo } from './modelo.model';
import { Receta } from '../interfaces/receta.interface';

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
	public get ingredientes( ): string[ ] {
		return this.receta.map( ( entrada ) => entrada.ingrediente );
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