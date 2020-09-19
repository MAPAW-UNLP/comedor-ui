import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

// tslint:disable: no-magic-numbers

describe( 'AuthService', ( ) => {
	let service: AuthService;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: [
				AuthService,
			],
		});

		service = TestBed.inject( AuthService );
	});

	test( 'debería ser creado', async ( ) => {
		expect( service ).toBeTruthy( );
	});

	test.todo( 'debería publicar el token de autorización' );

	test.todo( 'debería publicar si existe o no un usuario autenticado' );

	// DO: Agregar tests para lógica de autenticación y desautenticación

	test.todo( 'debería retornar un privilegio específico desde el token de autorización' );

});