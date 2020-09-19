import { Modelo } from './modelo.model';

// DO: Validar si las opciones de puntuación son cerradas, en cuyo caso podemos usar un enumerativo.
/**
 * Modelo que representa la evaluación de una comida por parte de un cliente.
 */
export class EvaluacionDeComida extends Modelo {
	private readonly _idCliente: string;
	private readonly _idComida: string;
	private readonly _puntuacion: number;

	/**
	 * El identificador único de la evaluación de comida.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El identificador único del cliente que creó la evaluación de comida.
	 */
	public get idCliente( ): string {
		return this._idCliente;
	}

	/**
	 * El identificador único de la comida evaluada por el cliente.
	 */
	public get idComida( ): string {
		return this._idComida;
	}

	/**
	 * Puntuación otorgada a la comida por parte del cliente en su evaluación.
	 */
	public get puntuacion( ): number {
		return this._puntuacion;
	}

	public constructor(
		id: string,
		idCliente: string,
		idComida: string,
		puntuacion: number,
	) {
		super( id );
		this._idCliente = idCliente;
		this._idComida = idComida;
		this._puntuacion = puntuacion;
	}

}