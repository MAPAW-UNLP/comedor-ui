import { CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { PageTitleService } from 'src/app/pages/root/services/page-title/page-title.service';
import { PlatformComponent } from './platform.component';

// tslint:disable: no-magic-numbers no-any

describe( 'PlatformComponent', ( ) => {
	let fixture: ComponentFixture<PlatformComponent>;
	let component: PlatformComponent;
	let authServiceStub: AuthService;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					PlatformComponent,
				],
				providers: <StaticProvider[ ]> [
					{
						provide: AuthService,
						useFactory: ( ): Partial<AuthService> => {
							const _authService: Partial<AuthService> = { };
							Object.defineProperty( _authService, 'aUserIsAuthenticatedSnapshot', {
								get: jest.fn( ),
							});
							Object.defineProperty( _authService, 'authenticatedUserSnapshot', {
								get: jest.fn( ),
							});
							return _authService;
						},
					},
					{
						provide: PageTitleService,
						useFactory: ( ): Partial<PageTitleService> => {
							const _pageTitleService: Partial<PageTitleService> = { };
							Object.defineProperty( _pageTitleService, 'routeTitle', {
								get: jest.fn( ),
							});
							return _pageTitleService;
						},
					},
					{
						provide: Router,
						useFactory: ( ): Partial<Router> => {
							const _router: Partial<Router> = {
								navigate: jest.fn( ),
							};
							return _router;
						},
					},
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );

		fixture = TestBed.createComponent( PlatformComponent );
		component = fixture.componentInstance;

		authServiceStub = TestBed.inject( AuthService );
	}));

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

	test( 'should expose the full name of the authenticated user', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserSnapshot', 'get' )
			.mockReturnValueOnce( null )
			.mockReturnValueOnce( new User( '', 'Guy Incognito', '99999999' ) );

		expect( component.fullNameOfAuthenticatedUser ).toEqual( undefined );
		expect( component.fullNameOfAuthenticatedUser ).toEqual( 'Guy Incognito' );
	});

	test.todo( 'should deauthenticate the authenticated user' );

});