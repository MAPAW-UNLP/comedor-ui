import { Modelo } from './modelo.model';
import { OpcionDeMenu } from '../interfaces/opcion-de-menu.interface';

/**
 * Modelo que representa el menú del día para una sede del comedor en una fecha específica.
 */
export class Menu extends Modelo {
	private readonly _idSede: string;
	private readonly _fecha: string;
	private readonly _opciones: OpcionDeMenu[ ];

	/**
	 * El identificador único del menú.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * El identificador único de la sede que ofrece el menú.
	 */
	public get idSede( ): string {
		return this._idSede;
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

	public constructor(
		id: string,
		idSede: string,
		fecha: string,
		opciones: OpcionDeMenu[ ],
	) {
		super( id );
		this._idSede = idSede;
		this._fecha = fecha;
		this._opciones = opciones;
	}

}