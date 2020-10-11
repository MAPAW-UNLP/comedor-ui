import { TestBed } from '@angular/core/testing';
import { FuzzySearchService } from './fuzzy-search.service';

describe( 'FuzzySearchService', ( ) => {
	let service: FuzzySearchService;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({ });
		service = TestBed.inject( FuzzySearchService );
	});

	it( 'should be created', async ( ) => {
		expect( service ).toBeTruthy( );
	});

});