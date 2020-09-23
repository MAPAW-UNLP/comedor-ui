import { ClientCondition } from '../enums/client-type.enum';
import { Faculty } from '../enums/faculty.enum';
import { User } from './user.model';

/**
 * Model that represents an application user able to buy tickets for meals in one of the kitchen sites.
 */
export class Client extends User {
	private readonly _email: string;
	private readonly _condition: ClientCondition;
	private readonly _faculty: Faculty;

	/**
	 * The unique identifier of the client.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The full name of the client.
	 */
	public get fullName( ): string {
		return super.fullName;
	}

	/**
	 * The National Identity Document _(Documento Nacional de Identidad - DNI)_ of the client.
	 */
	public get dni( ): string {
		return super.dni;
	}

	/**
	 * The email address of the client.
	 */
	public get email( ): string {
		return this._email;
	}

	/**
	 * The condition of the client: it can be either "student", "teacher" or "non-teacher".
	 */
	public get condition( ): ClientCondition {
		return this._condition;
	}

	// DO: Check the cardinality, as one client can belong to several faculties simultaneously
	/**
	 * The faculty to which the client belongs.
	 */
	public get faculty( ): Faculty {
		return this._faculty;
	}

	public constructor(
		id: string,
		fullName: string,
		dni: string,
		email: string,
		condition: ClientCondition,
		faculty: Faculty,
	) {
		super( id, fullName, dni );
		this._email = email;
		this._condition = condition;
		this._faculty = faculty;
	}

}