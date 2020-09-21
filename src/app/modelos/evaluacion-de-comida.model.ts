import { Cliente } from './cliente.model';
import { Comida } from './comida.model';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa la evaluación de una comida por parte de un cliente.
 */
export class EvaluacionDeComida extends Modelo {
	private readonly _cliente: Cliente;
	private readonly _comida: Comida;
	private readonly _puntuacion: number;

	/**
	 * El identificador único de la evaluación de comida.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El cliente que creó la evaluación de comida.
	 */
	public get cliente( ): Cliente {
		return this._cliente;
	}

	/**
	 * La comida evaluada por el cliente.
	 */
	public get comida( ): Comida {
		return this._comida;
	}

	/**
	 * Puntuación otorgada a la comida por parte del cliente en su evaluación.
	 */
	public get puntuacion( ): number {
		return this._puntuacion;
	}

	// DO: Validar si las opciones de puntuación son cerradas, en cuyo caso podemos usar un enumerativo.
	public constructor(
		id: string,
		cliente: Cliente,
		comida: Comida,
		puntuacion: number,
	) {
		super( id );
		this._cliente = cliente;
		this._comida = comida;
		this._puntuacion = puntuacion;
	}

}