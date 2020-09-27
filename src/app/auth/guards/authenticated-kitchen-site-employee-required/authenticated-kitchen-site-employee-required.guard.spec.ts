import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DeepPartial } from 'tsdef';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../services/auth/enums/user-role.enum';
import { AuthenticatedKitchenSiteEmployeeRequiredGuard } from './authenticated-kitchen-site-employee-required.guard';

describe( 'AuthenticatedKitchenSiteEmployeeRequiredGuard', ( ) => {
	let guard: AuthenticatedKitchenSiteEmployeeRequiredGuard;
	let authServiceStub: AuthService;

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
			],
		});

		guard = TestBed.inject( AuthenticatedKitchenSiteEmployeeRequiredGuard );
		authServiceStub = TestBed.inject( AuthService );
	});

	test( 'should be created', async ( ) => {
		expect( guard ).toBeTruthy( );
	});

	test( 'should allow the navigation if there is a kitchen site employee authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.KitchenSiteEmployee );

		expect( guard.canActivate( ) ).toEqual( true );
	});

	test( 'should forbid the navigation if there is not a kitchen site employee authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.Client );

		expect( guard.canActivate( ) ).toEqual( false );
	});

});