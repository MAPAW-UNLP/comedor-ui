import { Injectable } from '@angular/core';
import { TokenDeAutorizacion } from 'src/app/interfaces/token-de-autorizacion';
import { AuthModule } from '../../auth.module';

/**
 * Servicio que permite el acceso y la gestión de la autenticación y autorización de los usuarios de la
 * aplicación.
 */
@Injectable({
	providedIn: AuthModule,
})
export class AuthService {

	/**
	 * El token de autorizacion deserializado.
	 *
	 * Si no hay ningún usuario autenticado, es _undefined_.
	 */
	public get tokenDeAutorizacion( ): TokenDeAutorizacion | undefined {
		// DO: Implementar la lógica de obtención de tokens de autorización.
		return undefined;
	}

	/**
	 * Valor que es _true_ si actualmente existe un usuario autenticado y _falso_ en caso contrario.
	 */
	public get userIsAuthenticated( ): boolean {
		// DO: Implementar la lógica de evaluación de estado de autenticación.
		return false;
	}

	// DO: Implementar lógica de autenticación y desautenticación.

	/**
	 * Retorna el valor del privilegio _(claim)_ con el nombre provisto desde el token de autorización.
	 *
	 * Si no existe un token de autorización, retorna _undefined_.
	 */
	public obtenerPrivilegio(
		nombre: keyof TokenDeAutorizacion,
	): TokenDeAutorizacion[ keyof TokenDeAutorizacion ] | undefined {
		return this.tokenDeAutorizacion?.[ nombre ];
	}

}