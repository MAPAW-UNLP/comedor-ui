import { CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { RootComponent } from './root.component';

// tslint:disable: no-magic-numbers no-any

describe( 'RootComponent', ( ) => {
	let fixture: ComponentFixture<RootComponent>;
	let component: RootComponent;
	let authServiceStub: AuthService;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					RootComponent,
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
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );

		fixture = TestBed.createComponent( RootComponent );
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

	test( 'should expose whether or not there is a user authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'aUserIsAuthenticatedSnapshot', 'get' )
			.mockReturnValueOnce( true )
			.mockReturnValueOnce( false );

		expect( component.aUserIsAuthenticated ).toEqual( true );
		expect( component.aUserIsAuthenticated ).toEqual( false );
	});

	test.todo( 'should redirect to the authentication page' );

	test.todo( 'should deauthenticate the authenticated user' );

});