/**
 * Abstract class that represents an uniquely identified domain entity.
 */
export abstract class Entity {
	private readonly _id: string;

	/**
	 * The unique identifier of the entity.
	 */
	public get id( ): string {
		return this._id;
	}

	public constructor( id: string ) {
		this._id = id;
	}

}