import { CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';
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
							const _authService: Partial<AuthService> = {
								getClaim: jest.fn( ),
							};
							Object.defineProperty( _authService, 'userIsAuthenticated', {
								get: jest.fn( ),
							});
							return _authService;
						}
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

	test( 'should expose the authenticated user\'s full name', async ( ) => {
		jest.spyOn( authServiceStub, 'getClaim' )
			.mockReturnValueOnce( undefined )
			.mockReturnValueOnce( 'Fulano De Tal' );

		expect( component.userFullName ).toEqual( undefined );
		expect( component.userFullName ).toEqual( 'Fulano De Tal' );
	});

	test( 'should expose the environment name', async ( ) => {
		expect( component.environmentName ).toEqual( environment.name );
	});

	test( 'should expose whether the user is authenticated or not', async ( ) => {
		jest.spyOn( authServiceStub, 'userIsAuthenticated', 'get' )
			.mockReturnValueOnce( true )
			.mockReturnValueOnce( false );

		expect( component.userIsAuthenticated ).toEqual( true );
		expect( component.userIsAuthenticated ).toEqual( false );
	});

	test.todo( 'should log in' );

	test.todo( 'should log out' );

});