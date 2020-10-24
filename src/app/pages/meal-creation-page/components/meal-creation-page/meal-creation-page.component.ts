import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { delay, first, mapTo, switchMapTo, tap } from 'rxjs/operators';
import { DishType } from 'src/app/enums/dish-type.enum';
import { Dish } from 'src/app/models/dish.model';
import { DishesService } from 'src/app/shared/services/dishes/dishes.service';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
import { MealCreationRequestDTO } from 'src/app/shared/services/meals/dto/meal-creation-request.dto';
import { MealsService } from 'src/app/shared/services/meals/meals.service';
import { autocompleteValidator } from 'src/app/shared/validators/autocomplete.validator';
import { DishTypeAutocompleteOption } from './interfaces/dish-type-autocomplete-option.interface';
import { MealItem } from '../../../../interfaces/meal-item.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Top-level component of the MealCreationPage module.
 */
@Component({
	selector: 'cu-meal-creation-page',
	templateUrl: './meal-creation-page.component.html',
	styleUrls: [ './meal-creation-page.component.scss' ],
})
export class MealCreationPageComponent implements OnInit {
	private readonly _mealNameFieldName: string = 'mealNameField';
	private readonly _dishTypeFieldName: string = 'dishTypeField';
	private readonly _dishFieldName: string = 'dishField';
	private readonly _addedDishesFieldName: string = 'addedDishesField';
	private readonly _isSuitableForCeliacsFieldName: string = 'isSuitableForCeliacsField';
	private readonly _isSuitableForVegetariansFieldName: string = 'isSuitableForVegetariansField';
	private readonly _observationsFieldName: string = 'observationsField';

	private readonly _dishTypeOptions: DishTypeAutocompleteOption[ ] = [
		{
			value: DishType.Appetizer,
			label: 'Entrada',
		},
		{
			value: DishType.MainDish,
			label: 'Plato principal',
		},
		{
			value: DishType.SideDish,
			label: 'Guarnición',
		},
		{
			value: DishType.Drink,
			label: 'Bebida',
		},
		{
			value: DishType.Dessert,
			label: 'Postre',
		},
	];
	private readonly _mealCreationForm: FormGroup = new FormGroup({
		[ this._mealNameFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
		[ this._dishTypeFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
				autocompleteValidator( this.dishTypeOptions.map( (_) => _.label ) ),
			],
		}),
		[ this._dishFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
		[ this._addedDishesFieldName ]: new FormControl( [ ], {
			validators: [
				Validators.required,
				Validators.minLength( 1 ),
			],
		}),
		[ this._isSuitableForCeliacsFieldName ]: new FormControl( false, {
			validators: [
				Validators.required,
			],
		}),
		[ this._isSuitableForVegetariansFieldName ]: new FormControl( false, {
			validators: [
				Validators.required,
			],
		}),
		[ this._observationsFieldName ]: new FormControl( '' ),
	});

	private _isWaitingForServerResponse: boolean = false;
	private _availableDishes: Dish[ ] = [ ];

	public get mealCreationForm( ): FormGroup {
		return this._mealCreationForm;
	}

	public get mealNameFieldName( ): string {
		return this._mealNameFieldName;
	}

	public get dishTypeFieldName( ): string {
		return this._dishTypeFieldName;
	}

	public get dishFieldName( ): string {
		return this._dishFieldName;
	}

	public get addedDishesFieldName( ): string {
		return this._addedDishesFieldName;
	}

	public get isSuitableForCeliacsFieldName( ): string {
		return this._isSuitableForCeliacsFieldName;
	}

	public get isSuitableForVegetariansFieldName( ): string {
		return this._isSuitableForVegetariansFieldName;
	}

	public get observationsFieldName( ): string {
		return this._observationsFieldName;
	}

	public get mealNameField( ): AbstractControl {
		return this.mealCreationForm.controls[ this.mealNameFieldName ];
	}

	public get dishTypeField( ): AbstractControl {
		return this.mealCreationForm.controls[ this.dishTypeFieldName ];
	}

	public get dishField( ): AbstractControl {
		return this._mealCreationForm.controls[ this.dishFieldName ];
	}

	public get addedDishesField( ): AbstractControl {
		return this._mealCreationForm.controls[ this.addedDishesFieldName ];
	}

	public get isSuitableForCeliacsField( ): AbstractControl {
		return this._mealCreationForm.controls[ this.isSuitableForCeliacsFieldName ];
	}

	public get isSuitableForVegetariansField( ): AbstractControl {
		return this._mealCreationForm.controls[ this.isSuitableForVegetariansFieldName ];
	}

	public get observationsField( ): AbstractControl {
		return this._mealCreationForm.controls[ this.observationsFieldName ];
	}

	public get dishTypeOptions( ): DishTypeAutocompleteOption[ ] {
		return this._dishTypeOptions;
	}

	private get dishTypeOptionLabels( ): string[ ] {
		return this.dishTypeOptions.map( ( option ) => option.label );
	}

	public get hasRequiredMealNameError( ): boolean {
		return this.mealNameField.hasError( 'required' );
	}

	public get hasRequiredDishTypeError( ): boolean {
		return this.dishTypeField.hasError( 'required' );
	}

	public get hasIncorrectDishTypeError( ): boolean {
		return this.dishTypeField.hasError( 'autocomplete' );
	}

	public get hasRequiredDishError( ): boolean {
		return this.dishField.hasError( 'required' );
	}

	public get hasIncorrectDishError( ): boolean {
		return this.dishField.hasError( 'autocomplete' );
	}

	public get requiredMealNameErrorMessage( ): string {
		return 'Tenés que ingresar el nombre del combo';
	}

	public get requiredDishTypeErrorMessage( ): string {
		return 'Tenés que ingresar el tipo de plato';
	}

	public get incorrectDishTypeErrorMessage( ): string {
		return 'El tipo de plato ingresado no existe';
	}

	public get requiredDishErrorMessage( ): string {
		return 'Tenés que ingresar el plato';
	}

	public get incorrectDishErrorMessage( ): string {
		return 'Tenés que seleccionar un plato de la lista';
	}

	public get isWaitingForServerResponse( ): boolean {
		return this._isWaitingForServerResponse;
	}

	public get filteredDishTypeOptionLabels( ): string[ ] {
		const fieldText: string = this.dishTypeField.value;

		if ( fieldText === '' ) {
			return this.dishTypeOptionLabels;
		}

		return this.dishTypeOptionLabels.filter( ( label ) => {
			return this.fuzzySearchService.isFuzzilyIncludedInText( fieldText, label );
		});
	}

	public get filteredDishOptions( ): Dish[ ] {
		if ( typeof this.dishField.value !== 'string' ) {
			return [ this.dishField.value ];
		}

		const fieldText: string = this.dishField.value;
		if ( fieldText === '' ) {
			return this._availableDishes;
		}

		const filteredDishes = this._availableDishes.filter( ( dish ) => {
			return this.fuzzySearchService.isFuzzilyIncludedInText( fieldText, dish.name );
		});
		return filteredDishes;
	}

	public get addedDishes( ): { dish: Dish; dishType: DishType }[ ] {
		return this.addedDishesField.value;
	}

	public get shouldEnableAddDishButton( ): boolean {
		return this.dishField.valid && this.dishTypeField.valid;
	}

	public get shouldEnableSubmitButton( ): boolean {
		return this.canSubmitForm;
	}

	public constructor(
		private readonly dishesService: DishesService,
		private readonly mealsService: MealsService,
		private readonly fuzzySearchService: FuzzySearchService,
		private readonly snackBar: MatSnackBar,
	) { }

	public ngOnInit( ): void {
		this.dishesService.findAll( )
			.pipe( first( ) )
			.subscribe({
				next: ( dishes ) => {
					this._availableDishes = dishes;
					this.dishField.setValidators([
						Validators.required,
						autocompleteValidator( this._availableDishes ),
					]);
				},
			});
	}

	public addDish( ): void {
		const addedDishes = this.addedDishes ?? [ ];
		this.addedDishesField.setValue([
			...addedDishes,
			{
				dish: this.dishField.value,
				dishType: this.dishTypeField.value,
			}
		]);
		this.dishField.reset( '' );
		this.dishTypeField.reset( '' );
	}

	public removeDish( dishId: string ): void {
		const addedDishes = this.addedDishes ?? [ ];
		const addedDishesWithoutRemoved = addedDishes.filter( ( dish ) => dish.dish.id !== dishId );
		this.addedDishesField.setValue( addedDishesWithoutRemoved );
	}

	public getDishName( dish: Dish ): string {
		return dish.name;
	}

	public getDishTypeForLabel( label: string ): DishType {
		const dishTypeOption = this.dishTypeOptions
			.find( ( opt ) => opt.label === label );
		const value = dishTypeOption?.value;
		return value as DishType;
	}

	private showSnackBar( message: string ): void {
		const closeButtonText: string = 'CERRAR';
		const snackBarConfiguration: MatSnackBarConfig = {
			duration: 10000,
			horizontalPosition: 'start',
			verticalPosition: 'bottom',
		};
		this.snackBar.open( message, closeButtonText, snackBarConfiguration );
	}

	public get canSubmitForm( ): boolean {
		return this.mealNameField.valid
			&& this.addedDishesField.valid;
	}

	public submitForm( ): void {
		if (!this.canSubmitForm) {
			return ;
		}

		this._isWaitingForServerResponse = true;
		this.mealsService
			.create(
				this.mealNameField.value,
				this.addedDishesField.value.map( ( entry: { dish: Dish; dishType: DishType } ) => <MealItem> ({
					dish: this._availableDishes.find( (_) => _.id === entry.dish.id ),
					dishType: this.getDishTypeForLabel( entry.dishType ),
				})),
				this.isSuitableForCeliacsField.value,
				this.isSuitableForVegetariansField.value,
				this.observationsField.value !== '' ? this.observationsField.value : undefined,
			)
			.pipe(
				tap({
					next: ( ) => {
						this._isWaitingForServerResponse = false;
					},
					error: ( ) => {
						this._isWaitingForServerResponse = false;
					},
				}),
			)
			.subscribe({
				next: ( ) => {
					this.showSnackBar(
						`El menú se creó exitosamente`
					);
					this.resetForm( );
				},
				error: ( error: Error ) => {
					console.log(error);
					this.showSnackBar(
						`Ocurió un error al crear el menú, intente nuevamente`
					);
				},
			});
	}

	private resetForm( ) {
		this.mealNameField.reset( '' );
		this.addedDishesField.reset( [ ] );
		this.observationsField.reset( '' );
		this.isSuitableForCeliacsField.reset( false );
		this.isSuitableForVegetariansField.reset( false );
		this.dishField.reset( '' );
		this.dishTypeField.reset( '' );
	}
}