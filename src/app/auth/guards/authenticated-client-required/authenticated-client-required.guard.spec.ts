import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DeepPartial } from 'tsdef';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../services/auth/enums/user-role.enum';
import { AuthenticatedClientRequiredGuard } from './authenticated-client-required.guard';

describe( 'AuthenticatedClientRequiredGuard', ( ) => {
	let guard: AuthenticatedClientRequiredGuard;
	let authServiceStub: AuthService;

	beforeEach( ( ) => {
		TestBed.configureTestingModule({
			providers: <StaticProvider[ ]> [
				AuthenticatedClientRequiredGuard,
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

		guard = TestBed.inject( AuthenticatedClientRequiredGuard );
		authServiceStub = TestBed.inject( AuthService );
	});

	test( 'should be created', async ( ) => {
		expect( guard ).toBeTruthy( );
	});

	test( 'should allow the navigation if there is a client authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.Client );

		expect( guard.canActivate( ) ).toEqual( true );
	});

	test( 'should forbid the navigation if there is not a client authenticated', async ( ) => {
		jest.spyOn( authServiceStub, 'authenticatedUserRoleSnapshot', 'get' )
			.mockReturnValueOnce( UserRole.KitchenSiteEmployee );

		expect( guard.canActivate( ) ).toEqual( false );
	});

});