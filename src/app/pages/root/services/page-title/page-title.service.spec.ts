import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { siteTitle } from 'src/app/constants/site-title.constant';
import { DeepPartial } from 'tsdef';
import { PageTitleService } from './page-title.service';

// tslint:disable: no-magic-numbers

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

	test( 'should expose an undefined route title by default', async ( ) => {
		expect( service.routeTitle ).toBeUndefined( );
	});

	test( 'should use a programatically defined route title', async ( ) => {
		service.routeTitle = 'page title from program';

		expect( service.routeTitle ).toEqual( 'page title from program' );
		expect( titleStub.setTitle ).toHaveBeenCalledTimes( 1 );
		expect( titleStub.setTitle ).toHaveBeenCalledWith( `page title from program - ${ siteTitle }` );
	});

	test( 'should display the site title when no route data is provided', async ( ) => {
		service.setFromRouteData( undefined );

		expect( service.routeTitle ).toEqual( undefined );
		expect( titleStub.setTitle ).toHaveBeenCalledTimes( 1 );
		expect( titleStub.setTitle ).toHaveBeenCalledWith( siteTitle );
	});

	test( 'should display both titles when the provided route data has its own page title', async ( ) => {
		service.setFromRouteData({
			pageTitle: 'page title from route'
		});

		expect( service.routeTitle ).toEqual( `page title from route` );
		expect( titleStub.setTitle ).toHaveBeenCalledTimes( 1 );
		expect( titleStub.setTitle ).toHaveBeenCalledWith( `page title from route - ${ siteTitle }` );
	});

	test( 'should reset programatically defined route titles when loading a title from route', async ( ) => {
		service.routeTitle = 'page title from program';
		service.setFromRouteData({
			pageTitle: 'page title from route'
		});

		expect( service.routeTitle ).toEqual( 'page title from route' );
	});

	test( 'should use a programatically defined route title over the one from the route', async ( ) => {
		service.setFromRouteData({
			pageTitle: 'page title from route'
		});
		service.routeTitle = 'page title from program';

		expect( service.routeTitle ).toEqual( 'page title from program' );
		expect( titleStub.setTitle ).toHaveBeenCalledTimes( 2 );
		expect( titleStub.setTitle ).toHaveBeenNthCalledWith( 1, `page title from route - ${ siteTitle }` );
		expect( titleStub.setTitle ).toHaveBeenNthCalledWith( 2, `page title from program - ${ siteTitle }` );
	});

});