/**
 * Data Transfer Object _(DTO)_ that defines the credentials of a user attempting to authenticate in the
 * application.
 */
export interface AuthenticationCredentialsDTO {

	/**
	 * The username of the user attempting to authenticate.
	 */
	username: string;

	/**
	 * The password of the user attempting to authenticate.
	 */
	password: string;

}