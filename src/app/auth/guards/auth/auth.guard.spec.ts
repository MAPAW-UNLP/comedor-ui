import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DeepPartial } from 'tsdef';
import { AuthService } from '../../services/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe( 'AuthGuard', ( ) => {
	let guard: AuthGuard;
	let authServiceStub: DeepPartial<AuthService>;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				AuthGuard,
				{
					provide: AuthService,
					useFactory: ( ): DeepPartial<AuthService> => {
						const _authService: DeepPartial<AuthService> = { };
						Object.defineProperty( _authService, 'aUserIsAuthenticatedSnapshot', {
							get: jest.fn( ),
						});
						return _authService;
					},
				},
			],
		});

		guard = TestBed.inject( AuthGuard );
		authServiceStub = TestBed.inject( AuthService );
	});

	test( 'should be created', async ( ) => {
		expect( guard ).toBeTruthy( );
	});

	test( 'should allow the navigation if there is a user authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'aUserIsAuthenticatedSnapshot', 'get' )
			.mockReturnValueOnce( true );

		expect( guard.canActivate( ) ).toEqual( true );
	});

	test( 'should redirect to the authentication page if there is no user authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'aUserIsAuthenticatedSnapshot', 'get' )
			.mockReturnValueOnce( false );

		expect( guard.canActivate( ) ).toEqual( false );
		// DO: Verify that the router is asked to redirect to the authentication page.
	});

});