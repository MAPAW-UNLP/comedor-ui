import { HttpClient } from '@angular/common/http';
import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

// tslint:disable: no-magic-numbers

describe( 'AuthService', ( ) => {
	let service: AuthService;
	let clienteHttpStub: HttpClient;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				AuthService,
				{
					provide: HttpClient,
					useFactory: ( ): Partial<HttpClient> => {
						const _clienteHttp: Partial<HttpClient> = {
							post: jest.fn( ),
						};
						return _clienteHttp;
					},
				},
			],
		});

		service = TestBed.inject( AuthService );
		clienteHttpStub = TestBed.inject( HttpClient );
	});

	test( 'debería ser creado', async ( ) => {
		expect( service ).toBeTruthy( );
	});

	test.todo( 'debería publicar el token de autorización' );

	test.todo( 'debería publicar si existe o no un usuario autenticado' );

	// DO: Agregar tests para lógica de autenticación y desautenticación

	test.todo( 'debería retornar un privilegio específico desde el token de autorización' );

});