import { HttpClient } from '@angular/common/http';
import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { DeepPartial } from 'tsdef';
import { AuthService } from './auth.service';

// tslint:disable: no-magic-numbers

describe( 'AuthService', ( ) => {
	let service: AuthService;
	let httpClientStub: HttpClient;
	let environmentServiceStub: EnvironmentService;
	let routerStub: Router;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				AuthService,
				{
					provide: HttpClient,
					useFactory: ( ): DeepPartial<HttpClient> => {
						const _httpClient: DeepPartial<HttpClient> = {
							post: jest.fn( ),
						};
						return _httpClient;
					},
				},
				{
					provide: EnvironmentService,
					useFactory: ( ): DeepPartial<EnvironmentService> => {
						const _environmentService: DeepPartial<EnvironmentService> = {
							getEndpoint: jest.fn( ),
						};
						return _environmentService;
					},
				},
				{
					provide: Router,
					useFactory: ( ): DeepPartial<Router> => {
						const _router: DeepPartial<Router> = {
							navigate: jest.fn( ),
						};
						return _router;
					},
				},
			],
		});

		service = TestBed.inject( AuthService );
		httpClientStub = TestBed.inject( HttpClient );
		environmentServiceStub = TestBed.inject( EnvironmentService );
		routerStub = TestBed.inject( Router );
	});

	test( 'should be created', async ( ) => {
		expect( service ).toBeTruthy( );
	});

	test.todo( 'should expose the access token' );

	test.todo( 'should expose the authenticated user' );

	test.todo( 'should expose whether or not a user is authenticated' );

	test.todo( 'should expose the role of the authenticated user' );

	// DO: Add tests for authentication and deauthentication logic

});