import { CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { DeepPartial } from 'tsdef';
import { AuthenticationPageComponent } from './authentication-page.component';

describe( 'AuthenticationPageComponent', ( ) => {
	let component: AuthenticationPageComponent;
	let fixture: ComponentFixture<AuthenticationPageComponent>;

	beforeEach( async ( ) => {
		await TestBed
			.configureTestingModule({
				declarations: [
					AuthenticationPageComponent,
				],
				providers: <StaticProvider[ ]> [
					{
						provide: AuthService,
						useFactory: ( ): DeepPartial<AuthService> => {
							const _authService: DeepPartial<AuthService> = {
								authenticate: jest.fn( ),
							};
							Object.defineProperty( _authService, 'authenticatedUserSnapshot', {
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
					{
						provide: MatSnackBar,
						useFactory: ( ): DeepPartial<MatSnackBar> => {
							const _snackBar: DeepPartial<MatSnackBar> = {
								open: jest.fn( ),
							};
							return _snackBar;
						},
					},
				],
				imports: [
					ReactiveFormsModule,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( AuthenticationPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	it( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});