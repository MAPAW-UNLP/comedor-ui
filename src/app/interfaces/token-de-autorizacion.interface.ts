/**
 * Objeto que representa un token de autorización de la aplicación deserializado.
 */
export interface TokenDeAutorizacion {

	/**
	 * El identificador único del usuario autenticado.
	 */
	readonly id: string;

	/**
	 * El nombre completo del usuario autenticado.
	 */
	readonly nombreCompleto: string;

	/**
	 * El Documento Nacional de Identidad del usuario autenticado.
	 */
	readonly dni: string;

}