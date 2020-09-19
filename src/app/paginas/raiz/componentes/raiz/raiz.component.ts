import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/servicios/auth/auth.service';

/**
 * Componente principal del módulo raíz.
 */
@Component({
	selector: 'cu-raiz',
	templateUrl: './raiz.component.html',
	styleUrls: [ './raiz.component.scss' ],
})
export class RaizComponent {

	/**
	 * El nombre completo del usuario autenticado.
	 *
	 * Si no hay un usuario autenticado, es _undefined_.
	 */
	public get nombreCompletoDeUsuario( ): string | undefined {
		return this.authService.obtenerPrivilegio( 'nombreCompleto' );
	}

	/**
	 * Es _true_ si existe un usuario autenticado y _falso_ en caso contrario.
	 */
	public get hayUsuarioAutenticado( ): boolean {
		return this.authService.userIsAuthenticated;
	}

	public constructor(
		private readonly authService: AuthService,
	) { }

	/**
	 * Attempts to authenticate the user with the provided credentials.
	 */
	public autenticar( ): void {
		// DO: Implementar lógica para autenticación de usuarios.
	}

	/**
	 * Deauthenticates the user.
	 */
	public desautenticar( ): void {
		// DO: Implementar lógica para desautenticación de usuarios.
	}

}