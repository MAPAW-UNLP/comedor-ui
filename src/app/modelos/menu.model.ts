import { Modelo } from './modelo.model';
import { OpcionDeMenu } from '../interfaces/opcion-de-menu.interface';
import { Sede } from './sede.model';
import { Combo } from './combo.model';

/**
 * Modelo que representa el menú del día para una sede del comedor en una fecha específica.
 */
export class Menu extends Modelo {
	private readonly _sede: Sede;
	private readonly _fecha: string;
	private readonly _opciones: OpcionDeMenu[ ];

	/**
	 * El identificador único del menú.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * La sede que ofrece el menú.
	 */
	public get sede( ): Sede {
		return this._sede;
	}

	/**
	 * La fecha para la que el menú está habilitado, formateada en ISO 8601.
	 */
	public get fecha( ): string {
		return this._fecha;
	}

	/**
	 * Lista de las opciones que componen el menú.
	 */
	public get opciones( ): OpcionDeMenu[ ] {
		return this._opciones;
	}

	/**
	 * La lista de los combos incluídos entre las opciones del menú.
	 */
	public get combos( ): Combo[ ] {
		return this.opciones.map( ( opcion ) => opcion.combo );
	}

	/**
	 * Valor que es igual a _true_ si alguna opción del combo es apta para celíacos y _false_ en caso
	 * contrario.
	 */
	public get contieneOpcionesAptasParaCeliacos( ): boolean {
		return this.combos.some( ( combo ) => combo.esAptoParaCeliacos );
	}

	/**
	 * Valor que es igual a _true_ si alguna opción del combo es apta para vegetarianos y _false_ en caso
	 * contrario.
	 */
	public get contieneOpcionesAptasParaVegetarianos( ): boolean {
		return this.combos.some( ( combo ) => combo.esAptoParaVegetarianos );
	}

	/**
	 * El precio de la opción más barata del menú, en ARS.
	 */
	public get precioMinimo( ): number {
		// Se copia la lista de opciones para no alterar la lista original en este método.
		const copiaDeOpciones = [ ...this.opciones ];

		copiaDeOpciones.sort( ( opcionA, opcionB ) => opcionA.precioUnitario - opcionB.precioUnitario );
		const opcionMasBarata = copiaDeOpciones[ 0 ];
		return opcionMasBarata.precioUnitario;
	}

	public constructor(
		id: string,
		sede: Sede,
		fecha: string,
		opciones: OpcionDeMenu[ ],
	) {
		super( id );
		this._sede = sede;
		this._fecha = fecha;
		this._opciones = opciones;
	}

}