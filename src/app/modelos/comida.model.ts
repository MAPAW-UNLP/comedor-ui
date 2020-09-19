import { Plato } from '../interfaces/plato';
import { IngredienteDeComida } from '../interfaces/ingrediente-de-comida';
import { Modelo } from './modelo.model';

/**
 * Modelo que representa una comida ofrecida dentro del menú de una sede del comedor.
 */
export class Comida extends Modelo {
	private readonly _nombre: string;
	private readonly _platos: Plato[ ];
	private readonly _esAptaParaCeliacos: boolean;
	private readonly _esAptaParaVegetarianos: boolean;
	private readonly _ingredientes: IngredienteDeComida[ ];

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
	 * La lista de platos que componen la comida.
	 *
	 * Ej: pechuga de pollo (principal), ensalada (guarnición) y manzana (postre)
	 */
	public get platos( ): Plato[ ] {
		return this._platos;
	}

	/**
	 * Valor que equivale a _true_ si la comida es apta para celíacos y a _falso_ en caso contrario.
	 */
	public get esAptaParaCeliacos( ): boolean {
		return this._esAptaParaCeliacos;
	}

	/**
	 * Valor que equivale a _true_ si la comida es apta para vegetarianos y a _falso_ en caso contrario.
	 */
	public get esAptaParaVegatarianos( ): boolean {
		return this._esAptaParaVegetarianos;
	}

	/**
	 * La lista de los ingredientes que componen la comida, con sus respectivas cantidades dentro de la misma.
	 *
	 * Ej: pechuga de pollo (1 unidad), lechuga (100 gramos), tomate (100 gramos), manzana (1 unidad)
	 */
	public get ingredientes( ): IngredienteDeComida[ ] {
		return this._ingredientes;
	}

	public constructor(
		id: string,
		nombre: string,
		platos: Plato[ ],
		esAptaParaCeliacos: boolean,
		esAptaParaVegatarianos: boolean,
		ingredientes: IngredienteDeComida[ ],
	) {
		super( id );
		this._nombre = nombre;
		this._platos = platos;
		this._esAptaParaCeliacos = esAptaParaCeliacos;
		this._esAptaParaVegetarianos = esAptaParaVegatarianos;
		this._ingredientes = ingredientes;
	}
}