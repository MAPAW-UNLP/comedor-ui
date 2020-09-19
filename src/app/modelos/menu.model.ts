import { Modelo } from './modelo.model';

/**
 * Modelo que representa el menú del día para una sede del comedor en una fecha específica.
 */
export class Menu extends Modelo {
	private readonly _idSede: string;
	private readonly _idsEntradasDeMenu: string[ ];
	private readonly _fecha: string;

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
	 * Una colección de los identificadores únicos de las entradas que componen el menú.
	 */
	public get idsEntradasDeMenu( ): string[ ] {
		return this._idsEntradasDeMenu;
	}

	/**
	 * La fecha para la que el menú está habilitado, formateada en ISO 8601.
	 */
	public get fecha( ): string {
		return this._fecha;
	}

	public constructor(
		id: string,
		idSede: string,
		idsEntradasDeMenu: string[ ],
		fecha: string
	) {
		super( id );
		this._idSede = idSede;
		this._idsEntradasDeMenu = idsEntradasDeMenu;
		this._fecha = fecha;
	}

}