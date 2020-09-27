import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { siteTitle } from 'src/app/constants/site-title.constant';
import { DeepPartial } from 'tsdef';
import { PageTitleService } from './page-title.service';

describe( 'PageTitleService', ( ) => {
	let service: PageTitleService;
	let titleStub: Title;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				PageTitleService,
				{
					provide: Title,
					useFactory: ( ): DeepPartial<Title> => {
						const _title: DeepPartial<Title> = {
							setTitle: jest.fn( ),
						};
						return _title;
					},
				},
			],
		});

		service = TestBed.inject( PageTitleService );
		titleStub = TestBed.inject( Title );
	});

	it( 'should be created', async ( ) => {
		expect( service ).toBeTruthy( );
	});

	test( 'should display the site title when no route data is provided', async ( ) => {
		service.setFromRouteData( undefined );

		expect( titleStub.setTitle ).toHaveBeenCalledTimes( 1 );
		expect( titleStub.setTitle ).toHaveBeenCalledWith( siteTitle );
	});

	test( 'should display both titles when the provided route data has its own page title', async ( ) => {
		service.setFromRouteData({
			pageTitle: 'page title from route'
		});

		expect( titleStub.setTitle ).toHaveBeenCalledTimes( 1 );
		expect( titleStub.setTitle ).toHaveBeenCalledWith( `page title from route - ${ siteTitle }` );
	});

});