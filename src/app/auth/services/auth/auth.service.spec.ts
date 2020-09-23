import { HttpClient } from '@angular/common/http';
import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

// tslint:disable: no-magic-numbers

describe( 'AuthService', ( ) => {
	let service: AuthService;
	let httpClientStub: HttpClient;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				AuthService,
				{
					provide: HttpClient,
					useFactory: ( ): Partial<HttpClient> => {
						const _httpClient: Partial<HttpClient> = {
							post: jest.fn( ),
						};
						return _httpClient;
					},
				},
			],
		});

		service = TestBed.inject( AuthService );
		httpClientStub = TestBed.inject( HttpClient );
	});

	test( 'should be created', async ( ) => {
		expect( service ).toBeTruthy( );
	});

	test.todo( 'should expose the access token' );

	test.todo( 'should expose the authenticated user' );

	test.todo( 'should expose whether or not a user is authenticated' );

	// DO: Add tests for authentication and deauthentication logic

});