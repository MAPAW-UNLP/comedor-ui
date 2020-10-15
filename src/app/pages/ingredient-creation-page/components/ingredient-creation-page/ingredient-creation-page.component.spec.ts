import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
import { IngredientsService } from 'src/app/shared/services/ingredients/ingredients.service';
import { DeepPartial } from 'tsdef';
import { IngredientCreationPageComponent } from './ingredient-creation-page.component';

describe( 'IngredientCreationPageComponent', ( ) => {
	let component: IngredientCreationPageComponent;
	let fixture: ComponentFixture<IngredientCreationPageComponent>;

	beforeEach( async ( ) => {
		await TestBed
			.configureTestingModule({
				declarations: [
					IngredientCreationPageComponent,
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
						provide: FuzzySearchService,
						useFactory: ( ): DeepPartial<FuzzySearchService> => {
							const _fuzzySearchService: DeepPartial<FuzzySearchService> = {
								isFuzzilyIncludedInText: jest.fn( ),
							};
							return _fuzzySearchService;
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
		fixture = TestBed.createComponent( IngredientCreationPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	it( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});