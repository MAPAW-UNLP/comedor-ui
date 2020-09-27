import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DeepPartial } from 'tsdef';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../services/auth/enums/user-role.enum';
import { HomePageRedirectorGuard } from './home-page-redirector.guard';

describe( 'HomePageRedirectorGuard', ( ) => {
	let guard: HomePageRedirectorGuard;
	let authServiceStub: AuthService;
	let routerStub: Router;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				HomePageRedirectorGuard,
				{
					provide: AuthService,
					useFactory: ( ): DeepPartial<AuthService> => {
						const _authService: DeepPartial<AuthService> = { };
						Object.defineProperty( _authService, 'authenticatedUserRoleSnapshot', {
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

		guard = TestBed.inject( HomePageRedirectorGuard );
		authServiceStub = TestBed.inject( AuthService );
		routerStub = TestBed.inject( Router );
	});

	it( 'should be created', async ( ) => {
		expect( guard ).toBeTruthy( );
	});

	test( 'should redirect to the home page of an authenticated client', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.Client );

		expect( guard.canActivate( ) ).toEqual( false );
		expect( routerStub.navigate ).toHaveBeenCalledTimes( 1 );
		expect( routerStub.navigate ).toHaveBeenCalledWith([ '/mis-tickets' ]);
	});

	test( 'should redirect to the home page of an authenticated kitchen site employee', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.KitchenSiteEmployee );

		expect( guard.canActivate( ) ).toEqual( false );
		expect( routerStub.navigate ).toHaveBeenCalledTimes( 1 );
		expect( routerStub.navigate ).toHaveBeenCalledWith([ '/menus-disponibles' ]);
	});

	test( 'should redirect to the home page of an authenticated user with an unknown role', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( <UserRole> <unknown> 'unknown' );

		expect( guard.canActivate( ) ).toEqual( false );
		expect( routerStub.navigate ).toHaveBeenCalledTimes( 1 );
		expect( routerStub.navigate ).toHaveBeenCalledWith([ '/404' ]);
	});

});