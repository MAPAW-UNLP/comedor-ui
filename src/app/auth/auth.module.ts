import { ModuleWithProviders, NgModule } from '@angular/core';

/**
 * Módulo responsable de la autenticación y autorización de los usuarios de la aplicación.
 */
@NgModule( )
export class AuthModule {

	/**
	 * Retorna una instancia de AuthModule cargada con los _providers_ requeridos en el entorno de ejecución
	 * actual.
	 */
	public static forRoot( ): ModuleWithProviders<AuthModule> {
		return {
			ngModule: AuthModule,
			providers: [
				// DO: Agregar interceptor para incluír el token de autorización en peticiones HTTP salientes
				// DO: Agregar guardias para verificación de autorización
			],
		};
	}

}