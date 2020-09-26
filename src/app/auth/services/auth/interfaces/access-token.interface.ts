import { UserRole } from '../enums/user-role.enum';

/**
 * Object that represents a deserialized application's access token.
 */
export interface AccessToken {

	/**
	 * The unique identifier of the authenticated user.
	 */
	readonly id: string;

	/**
	 * The full name of the authenticated user.
	 */
	readonly fullName: string;

	/**
	 * The National Document of Identity _(Documento Nacional de Identidad - DNI)_ of the authenticated user.
	 */
	readonly dni: string;

	/**
	 * The role of the authenticated user: either a client or an kitchen site employee.
	 */
	readonly role: UserRole;

}