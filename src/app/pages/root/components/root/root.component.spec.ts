import { CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DeepPartial } from 'tsdef';
import { PageTitleService } from '../../services/page-title/page-title.service';
import { RootComponent } from './root.component';

// tslint:disable: no-magic-numbers no-any

describe( 'RootComponent', ( ) => {
	let fixture: ComponentFixture<RootComponent>;
	let component: RootComponent;
	let routerStub: Router;
	let activatedRouteStub: ActivatedRoute;
	let pageTitleServiceStub: PageTitleService;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					RootComponent,
				],
				providers: <StaticProvider[ ]> [
					{
						provide: Router,
						useFactory: ( ): DeepPartial<Router> => {
							const _router: DeepPartial<Router> = { };
							Object.defineProperty( _router, 'events', {
								get: jest.fn( ),
							});
							return _router;
						},
					},
					{
						provide: ActivatedRoute,
						useFactory: ( ): DeepPartial<ActivatedRoute> => {
							const _activatedRoute: DeepPartial<ActivatedRoute> = { };
							Object.defineProperty( _activatedRoute, 'firstChild', {
								get: jest.fn( ),
							});
							Object.defineProperty( _activatedRoute, 'data', {
								get: jest.fn( ),
							});
							return _activatedRoute;
						},
					},
					{
						provide: PageTitleService,
						useFactory: ( ): DeepPartial<PageTitleService> => {
							const _pageTitleService: DeepPartial<PageTitleService> = {
								setFromRouteData: jest.fn( ),
							};
							return _pageTitleService;
						},
					},
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );

		fixture = TestBed.createComponent( RootComponent );
		component = fixture.componentInstance;
		routerStub = TestBed.inject( Router );
		activatedRouteStub = TestBed.inject( ActivatedRoute );
		pageTitleServiceStub = TestBed.inject( PageTitleService );
	}));

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

	test.todo( 'should update the page title on successful navigation events' );

});