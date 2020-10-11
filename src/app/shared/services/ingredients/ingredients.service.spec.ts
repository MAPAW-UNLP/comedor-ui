import { HttpClient } from '@angular/common/http';
import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { DeepPartial } from 'tsdef';
import { IngredientsService } from './ingredients.service';

describe( 'IngredientsService', ( ) => {
	let service: IngredientsService;
	let environmentServiceStub: EnvironmentService;
	let httpClientStub: HttpClient;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				IngredientsService,
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
					provide: HttpClient,
					useFactory: ( ): DeepPartial<HttpClient> => {
						const _httpClientStub: DeepPartial<HttpClient> = {
							post: jest.fn( ),
						};
						return _httpClientStub;
					},
				},
			],
		});

		service = TestBed.inject( IngredientsService );
		environmentServiceStub = TestBed.inject( EnvironmentService );
		httpClientStub = TestBed.inject( HttpClient );
	});

	it( 'should be created', async ( ) => {
		expect( service ).toBeTruthy( );
	});

});