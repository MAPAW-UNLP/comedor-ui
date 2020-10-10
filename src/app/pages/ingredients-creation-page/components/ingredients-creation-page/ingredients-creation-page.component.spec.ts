import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientsService } from 'src/app/shared/services/ingredients/ingredients.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeepPartial } from 'tsdef';
import { IngredientsCreationPageComponent } from './ingredients-creation-page.component';

describe( 'IngredientsCreationPageComponent', ( ) => {
	let component: IngredientsCreationPageComponent;
	let fixture: ComponentFixture<IngredientsCreationPageComponent>;

	beforeEach( async ( ) => {
		await TestBed
			.configureTestingModule({
				declarations: [
					IngredientsCreationPageComponent,
				],
				providers: <StaticProvider[ ]> [
					{
						provide: IngredientsService,
						useFactory: ( ): DeepPartial<IngredientsService> => {
							const _ingredientsService: DeepPartial<IngredientsService> = {
								create: jest.fn( ),
							};
							return _ingredientsService;
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
					{
						provide: ChangeDetectorRef,
						useFactory: ( ): DeepPartial<ChangeDetectorRef> => {
							const _snackBar: DeepPartial<ChangeDetectorRef> = {
								detectChanges: jest.fn( ),
							};
							return _snackBar;
						},
					},
				],
				imports: [
					ReactiveFormsModule,
					MatAutocompleteModule,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( IngredientsCreationPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	it( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});