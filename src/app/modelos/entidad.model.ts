/**
 * Clase abstracta que representa una entidad del dominio identificada unívocamente.
 */
export abstract class Entidad {
	private readonly _id: string;

	/**
	 * El identificador único de la entidad.
	 */
	public get id( ): string {
		return this._id;
	}

	public constructor( id: string ) {
		this._id = id;
	}

}