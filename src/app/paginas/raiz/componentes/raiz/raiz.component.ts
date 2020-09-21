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
		return this.authService.usuarioAutenticadoSnapshot?.nombreCompleto;
	}

	/**
	 * Es _true_ si existe un usuario autenticado y _false_ en caso contrario.
	 */
	public get hayUsuarioAutenticado( ): boolean {
		return this.authService.hayUnUsuarioAutenticadoSnapshot;
	}

	public constructor(
		private readonly authService: AuthService,
	) { }

	/**
	 * Redirige al usuario a la página de ingreso para poder autenticarse.
	 */
	public redirigirAPaginaDeIngreso( ): void {
		// DO: Implementar lógica para redirección a página de ingreso.
	}

	/**
	 * Desautentica al usuario actualmente autenticado en la aplicación.
	 */
	public desautenticar( ): void {
		this.authService.desautenticar( );
	}

}