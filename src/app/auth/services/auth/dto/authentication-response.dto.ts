/**
 * Data Transfer Object _(DTO)_ that defines the server response after an authentication attempt from a user.
 */
export interface AuthenticationResponseDTO {

	/**
	 * The serialized access token, result of a successful authentication attempot.
	 *
	 * This token can be used to identify and authorize the user on the following requests to the server.
	 */
	accessToken: string;

}