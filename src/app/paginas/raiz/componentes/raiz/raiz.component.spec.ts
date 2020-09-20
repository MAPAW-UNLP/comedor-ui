import { CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/servicios/auth/auth.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { RaizComponent } from './raiz.component';

// tslint:disable: no-magic-numbers no-any

describe( 'RaizComponent', ( ) => {
	let fixture: ComponentFixture<RaizComponent>;
	let component: RaizComponent;
	let authServiceStub: AuthService;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					RaizComponent,
				],
				providers: <StaticProvider[ ]> [
					{
						provide: AuthService,
						useFactory: ( ): Partial<AuthService> => {
							const _authService: Partial<AuthService> = { };
							Object.defineProperty( _authService, 'hayUnUsuarioAutenticadoSnapshot', {
								get: jest.fn( ),
							});
							Object.defineProperty( _authService, 'usuarioAutenticadoSnapshot', {
								get: jest.fn( ),
							});
							return _authService;
						},
					},
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );

		fixture = TestBed.createComponent( RaizComponent );
		component = fixture.componentInstance;

		authServiceStub = TestBed.inject( AuthService );
	}));

	test( 'debería ser creado', async ( ) => {
		expect( component ).toBeTruthy( );
	});

	test( 'debería publicar el nombre completo del usuario autenticado', async ( ) => {
		jest.spyOn( authServiceStub, 'usuarioAutenticadoSnapshot', 'get' )
			.mockReturnValueOnce( null )
			.mockReturnValueOnce( new Usuario( '', 'Fulano De Tal', '99999999' ) );

		expect( component.nombreCompletoDeUsuario ).toEqual( undefined );
		expect( component.nombreCompletoDeUsuario ).toEqual( 'Fulano De Tal' );
	});

	test( 'debería publicar si hay o no un usuario autenticado', async ( ) => {
		jest.spyOn( authServiceStub, 'hayUnUsuarioAutenticadoSnapshot', 'get' )
			.mockReturnValueOnce( true )
			.mockReturnValueOnce( false );

		expect( component.hayUsuarioAutenticado ).toEqual( true );
		expect( component.hayUsuarioAutenticado ).toEqual( false );
	});

	test.todo( 'debería autenticar un usuario' );

	test.todo( 'debería desautenticar un usuario' );

});