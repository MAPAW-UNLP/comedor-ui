import { Modelo } from './modelo.model';

/**
 * Modelo que representa un ingrediente utilizable en la preparación de una comida.
 */
export class Ingrediente extends Modelo {
	private readonly _nombre: string;
	private readonly _esAptoParaCeliacos: boolean;
	private readonly _esAptoParaVegetarianos: boolean;

	/**
	 * El identificador único del ingrediente.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El nombre del ingrediente.
	 */
	public get nombre( ): string {
		return this._nombre;
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para celíacos y a _falso_ en caso contrario.
	 */
	public get esAptoParaCeliacos( ): boolean {
		return this._esAptoParaCeliacos;
	}

	/**
	 * Valor que equivale a _true_ si el combo es apto para vegetarianos y a _falso_ en caso contrario.
	 */
	public get esAptoParaVegetarianos( ): boolean {
		return this._esAptoParaVegetarianos;
	}

	public constructor(
		id: string,
		nombre: string,
		esAptoParaCeliacos: boolean,
		esAptoParaVegetarianos: boolean,
	) {
		super( id );
		this._nombre = nombre;
		this._esAptoParaCeliacos = esAptoParaCeliacos;
		this._esAptoParaVegetarianos = esAptoParaVegetarianos;
	}

}