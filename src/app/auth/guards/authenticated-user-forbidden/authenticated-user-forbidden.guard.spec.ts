import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DeepPartial } from 'tsdef';
import { AuthService } from '../../services/auth/auth.service';
import { AuthenticatedUserForbiddenGuard } from './authenticated-user-forbidden.guard';

describe( 'AuthenticatedUserForbiddenGuard', ( ) => {
	let guard: AuthenticatedUserForbiddenGuard;
	let authServiceStub: AuthService;
	let routerStub: Router;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				AuthenticatedUserForbiddenGuard,
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

		guard = TestBed.inject( AuthenticatedUserForbiddenGuard );
		authServiceStub = TestBed.inject( AuthService );
		routerStub = TestBed.inject( Router );
	});

	test( 'should be created', async ( ) => {
		expect( guard ).toBeTruthy( );
	});

	test( 'should allow the navigation if there is not a user authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'aUserIsAuthenticatedSnapshot', 'get' )
			.mockReturnValueOnce( false );

		expect( guard.canActivate( ) ).toEqual( true );
	});

	test( 'should redirect to the home page if there is a user authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'aUserIsAuthenticatedSnapshot', 'get' )
			.mockReturnValueOnce( true );

		expect( guard.canActivate( ) ).toEqual( false );
		expect( routerStub.navigate ).toHaveBeenCalledTimes( 1 );
		expect( routerStub.navigate ).toHaveBeenCalledWith([ '/' ]);
	});

});