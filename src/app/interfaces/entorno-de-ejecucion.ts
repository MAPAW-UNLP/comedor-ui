/**
 * Objeto que contiene las variables de entorno usadas en la aplicación para un determinado entorno de ejecución.
 */
export interface EntornoDeEjecucion {

	/**
	 * El nombre único del entorno.
	 */
	readonly nombre: string;

	/**
	 * Objecto que contiene las URLs del servidor accesibles desde la aplicación.
	 */
	readonly endpoints: {

		/**
		 * URL hacia la que se envían solicitudes de autenticación de usuario.
		 */
		readonly autenticar: string;

	};

}