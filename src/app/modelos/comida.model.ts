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
	 */
	public get receta( ): Receta {
		return this._receta;
	}

	/**
	 * Valor que equivale a _true_ si la comida es apta para celíacos y a _falso_ en caso contrario.
	 */
	public get esAptaParaCeliacos( ): boolean {
		// DO: Agregar lógica para determinar si es apta para celíacos en funcion de los ingredientes.
		return false;
	}

	/**
	 * Valor que equivale a _true_ si la comida es apta para vegetarianos y a _falso_ en caso contrario.
	 */
	public get esAptaParaVegetarianos( ): boolean {
		// DO: Agregar lógica para determinar si es apta para vegetarianos en funcion de los ingredientes.
		return false;
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