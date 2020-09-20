/**
 * Objecto de Transferencia de Datos _(DTO)_ que representa la respuesta del servidor ante un intento de
 * autenticación por parte de un usuario.
 */
export interface RespuestaDeAutenticacionDTO {

	/**
	 * El token de autorización del usuario (serializado), producto de un intento de autenticación exitoso.
	 *
	 * Este token se puede usar para autorizar al usuario en las siguientes peticiones al servidor.
	 */
	tokenDeAutorizacion: string;

}