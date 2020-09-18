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

	test( 'should be created', async ( ) => {
		expect( service ).toBeTruthy( );
	});

	test.todo( 'should expose the auth token' );

	test.todo( 'should expose whether the user is authenticated or not' );

	// DO: Add tests for authentication and deauthentication.

	test.todo( 'should return a claim from the auth token' );

});