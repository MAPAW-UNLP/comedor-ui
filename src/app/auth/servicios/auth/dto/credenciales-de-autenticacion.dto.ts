/**
 * Objecto de Transferencia de Datos _(DTO)_ que representa las credenciales de un usuario intentando
 * autenticarse en la aplicación.
 */
export interface CredencialesDeAutenticacionDTO {

	/**
	 * El nombre de usuario del usuario intentando autenticarse.
	 */
	nombreDeUsuario: string;

	/**
	 * La contraseña del usuario intentando autenticarse.
	 */
	contraseña: string;

}