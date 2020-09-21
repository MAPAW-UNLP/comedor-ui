import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { clavesDeLocalStorage } from 'src/app/constantes/claves-de-local-storage.constant';
import { TokenDeAutorizacion } from 'src/app/interfaces/token-de-autorizacion.interface';
import { Usuario } from 'src/app/modelos/usuario.model';
import { environment } from 'src/environments/environment.local';
import { AuthModule } from '../../auth.module';
import { CredencialesDeAutenticacionDTO } from './dto/credenciales-de-autenticacion.dto';
import { RespuestaDeAutenticacionDTO } from './dto/respuesta-de-autenticacion.dto';

// TEST: Actualizar tests unitarios de AuthService.
/**
 * Servicio que permite el acceso y la gestión de la autenticación y autorización de los usuarios de la
 * aplicación.
 */
@Injectable({
	providedIn: AuthModule,
})
export class AuthService {
	private readonly _tokenDeAutorizacionSubject: BehaviorSubject<string | null>;
	private readonly _usuarioAutenticadoSubject: BehaviorSubject<Usuario | null>;
	private readonly _tokenDeAutorizacionObservable: Observable<string | null>;
	private readonly _usuarioAutenticadoObservable: Observable<Usuario | null>;

	/**
	 * El token de autorización serializado.
	 *
	 * Si no hay ningún usuario autenticado es igual a _null_.
	 */
	public get tokenDeAutorizacionSnapshot( ): string | null {
		return this._tokenDeAutorizacionSubject.value;
	}

	/**
	 * Observable que emite el token de autorizacion serializado.
	 *
	 * Si no hay ningún usuario autenticado, emite _null_.
	 */
	public get tokenDeAutorizacion( ): Observable<string | null> {
		return this._tokenDeAutorizacionObservable;
	}

	/**
	 * Observable que emite _true_ si hay un usuario autenticado y _false_ en caso contrario.
	 */
	public get hayUnUsuarioAutenticado( ): Observable<boolean> {
		return this._tokenDeAutorizacionObservable.pipe(
			map( ( token ) => token !== null ),
		);
	}

	/**
	 * Valor que es igual a _true_ si hay un usuario autenticado y _false_ en caso contrario.
	 */
	public get hayUnUsuarioAutenticadoSnapshot( ): boolean {
		return this._tokenDeAutorizacionSubject.value !== null;
	}

	/**
	 * Observable que emite el usuario actualmente autenticado.
	 *
	 * Si no hay ningún usuario autenticado, emite _null_.
	 */
	public get usuarioAutenticado( ): Observable<Usuario | null> {
		return this._usuarioAutenticadoObservable;
	}

	/**
	 * El usuario actualmente autenticado.
	 *
	 * Si no hay ningún usuario autenticado, es igual a _null_.
	 */
	public get usuarioAutenticadoSnapshot( ): Usuario | null {
		return this._usuarioAutenticadoSubject.value;
	}

	public constructor(
		private readonly clienteHttp: HttpClient,
	) {
		this._tokenDeAutorizacionSubject = new BehaviorSubject<string | null>( null );
		this._usuarioAutenticadoSubject = new BehaviorSubject<Usuario | null>( null );
		this._tokenDeAutorizacionObservable = this._tokenDeAutorizacionSubject.asObservable( );
		this._usuarioAutenticadoObservable = this._usuarioAutenticadoSubject.asObservable( );

		this.recargarUsuarioAutenticadoDesdeLocalStorage( );
	}

	/**
	 * Realiza un intento de autenticación en el servidor con el nombre de usuario y contraseña provistos.
	 *
	 * Retorna un observable que emite _true_ si el intento de autenticación es exitoso y emite _false_ en caso
	 * contrario.
	 */
	public autenticar( nombreDeUsuario: string, contraseña: string ): Observable<boolean> {
		// Retorna _true_ inmediatamente si el usuario ya está autenticado.
		if ( this.hayUnUsuarioAutenticadoSnapshot ) {
			return of( true );
		}

		return this.solicitarAutenticacionEnServidor( nombreDeUsuario, contraseña )
			.pipe(
				// Actualizar usuario autenticado y retornar _true_ en caso de éxito.
				tap( ( respuestaDeAutenticacionDTO ) => {
					const tokenDeAutorizacion = respuestaDeAutenticacionDTO.tokenDeAutorizacion;
					this.almacenarTokenDeAutorizacionEnLocalStorage( tokenDeAutorizacion );
					this.cargarUsuarioAutenticadoEnServicio( tokenDeAutorizacion );
				}),
				mapTo( true ),

				// Retornar _false_ en caso de error.
				catchError( ( error: HttpErrorResponse ) => {
					return of( false );
				}),

				// Evitar múltiples peticiones de autenticación simultáneas.
				shareReplay( ),
			);
	}

	/**
	 * Desautentica al usuario actualmente autenticado en la aplicación.
	 */
	public desautenticar( ): void {
		this.eliminarTokenDeAutorizacionDeLocalStorage( );
		this.anularUsuarioAutenticadoEnServicio( );
	}

	/**
	 * Verifica si existe un token de autorización en local storage, y, en caso afirmativo, lo usa para
	 * actualizar el usuario autenticado.
	 */
	private recargarUsuarioAutenticadoDesdeLocalStorage( ): void {
		const tokenDeAutorizacion = this.obtenerTokenDeAutorizacionDesdeLocalStorage( );
		if ( tokenDeAutorizacion !== null ) {
			this.cargarUsuarioAutenticadoEnServicio( tokenDeAutorizacion );
		}
	}

	/**
	 * Recupera y retorna el token de autorización de local storage.
	 *
	 * En caso de que el token de autorización no esté almacenado, retorna _null_.
	 */
	private obtenerTokenDeAutorizacionDesdeLocalStorage( ): string | null {
		return localStorage.getItem( clavesDeLocalStorage.tokenDeAutorizacion );
	}

	/**
	 * Actualiza el token de autorización y el usuario autenticado en el servicio con el token de autorización
	 * provisto.
	 */
	private cargarUsuarioAutenticadoEnServicio( tokenDeAutorizacion: string ): void {
		const usuarioAutenticado: Usuario = this.obtenerUsuarioDesdeTokenDeAutorizacion( tokenDeAutorizacion );

		this._tokenDeAutorizacionSubject.next( tokenDeAutorizacion );
		this._usuarioAutenticadoSubject.next( usuarioAutenticado );
	}

	/**
	 * Retorna una instancia de usuario a partir de los privilegios contenidos en el token de autorización.
	 */
	private obtenerUsuarioDesdeTokenDeAutorizacion( tokenDeAutorizacion: string ): Usuario {
		const helperDeJWT = new JwtHelperService( );
		const tokenDeserializado = <TokenDeAutorizacion> helperDeJWT.decodeToken( tokenDeAutorizacion );

		return new Usuario(
			tokenDeserializado.id,
			tokenDeserializado.nombreCompleto,
			tokenDeserializado.dni
		);
	}

	/**
	 * Envía una petición HTTP al servidor para autenticar al usuario con el nombre de usuario y contraseña provistos,
	 * y retorna un observable que emite la respuesta del servidor.
	 *
	 * @param nombreDeUsuario el nombre de usuario a utilizar en la solicitud de autenticación.
	 * @param contraseña la contraseña a utilizar en la solicitud de autenticación.
	 */
	private solicitarAutenticacionEnServidor(
		nombreDeUsuario: string,
		contraseña: string,
	): Observable<RespuestaDeAutenticacionDTO> {
		const url: string = environment.endpoints.autenticar;
		const credencialesDeAutenticacionDTO: CredencialesDeAutenticacionDTO = {
			nombreDeUsuario: nombreDeUsuario,
			contraseña: contraseña,
		};

		return this.clienteHttp.post<RespuestaDeAutenticacionDTO>( url, credencialesDeAutenticacionDTO );
	}

	/**
	 * Almacena el token de autorización en local storage.
	 */
	private almacenarTokenDeAutorizacionEnLocalStorage( tokenDeAutorizacion: string ): void {
		localStorage.setItem( clavesDeLocalStorage.tokenDeAutorizacion, tokenDeAutorizacion );
	}

	/**
	 * Elimina el token de autorización de local storage.
	 */
	private eliminarTokenDeAutorizacionDeLocalStorage( ): void {
		localStorage.removeItem( clavesDeLocalStorage.tokenDeAutorizacion );
	}

	/**
	 * Anula el token de autorización y usuario autenticado en el servicio y los retorna a los valores iniciales.
	 */
	private anularUsuarioAutenticadoEnServicio( ) {
		this._tokenDeAutorizacionSubject.next( null );
		this._usuarioAutenticadoSubject.next( null );
	}

}