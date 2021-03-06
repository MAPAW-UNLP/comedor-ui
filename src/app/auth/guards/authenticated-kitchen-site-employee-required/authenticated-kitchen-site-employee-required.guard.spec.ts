import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DeepPartial } from 'tsdef';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../services/auth/enums/user-role.enum';
import { AuthenticatedKitchenSiteEmployeeRequiredGuard } from './authenticated-kitchen-site-employee-required.guard';

describe( 'AuthenticatedKitchenSiteEmployeeRequiredGuard', ( ) => {
	let guard: AuthenticatedKitchenSiteEmployeeRequiredGuard;
	let authServiceStub: AuthService;
	let routerStub: Router;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				AuthenticatedKitchenSiteEmployeeRequiredGuard,
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

		guard = TestBed.inject( AuthenticatedKitchenSiteEmployeeRequiredGuard );
		authServiceStub = TestBed.inject( AuthService );
		routerStub = TestBed.inject( Router );
	});

	test( 'should be created', async ( ) => {
		expect( guard ).toBeTruthy( );
	});

	test( 'should allow the navigation if there is a kitchen site employee authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.KitchenSiteEmployee );

		expect( guard.canActivate( ) ).toEqual( true );
	});

	test( 'should redirect to the error page if there is no kitchen site employee authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.Client );

		expect( guard.canActivate( ) ).toEqual( false );
		expect( routerStub.navigate ).toHaveBeenCalledTimes( 1 );
		expect( routerStub.navigate ).toHaveBeenCalledWith([ '/404' ]);
	});

});