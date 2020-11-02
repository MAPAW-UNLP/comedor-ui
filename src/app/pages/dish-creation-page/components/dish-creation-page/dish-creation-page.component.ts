import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
import { IngredientsService } from 'src/app/shared/services/ingredients/ingredients.service';
import { IngredientRecipeDTO } from 'src/app/shared/services/ingredients/dto/ingredient-recipe.dto';
import { Subscription } from 'rxjs';
import { DishesService } from 'src/app/shared/services/dishes/dishes.service';
import { DishItem } from 'src/app/interfaces/dish-item.interface';
import { tap } from 'rxjs/operators';
import { Dish } from 'src/app/models/dish.model';

/**
 * Top-level component of the IngredientsCreationPage module.
 */
@Component({
	selector: 'cu-dish-creation-page',
	templateUrl: './dish-creation-page.component.html',
	styleUrls: [ './dish-creation-page.component.scss' ],
})
export class DishCreationPageComponent implements AfterViewInit, OnDestroy {
	public readonly dishNameFieldName: string = 'dishNameField';
	public readonly ingredientNameFieldName: string = 'ingredientNameField';
	public readonly ingredientQuantityFieldName: string = 'ingredientQuantityField';
	public readonly addedIngredientsFieldName: string = 'addedIngredientsField';

	private _isWaitingForServerResponse: boolean = false;

	private readonly ingredientsSubscription: Subscription;

	public ingredients: IngredientRecipeDTO[] = [];

	private readonly _dishCreationForm: FormGroup = new FormGroup({
		[ this.dishNameFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
		[ this.ingredientNameFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
		[ this.ingredientQuantityFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
				Validators.min(0.001)
			],
		}),
		[ this.addedIngredientsFieldName ]: new FormControl( [ ], {
			validators: [
				Validators.required,
				Validators.minLength( 1 ),
			],
		}),
	});

	@ViewChild( 'dishNameInput' )
	private readonly _dishNameInputRef!: ElementRef<HTMLInputElement>;

	public get dishCreationForm( ): FormGroup {
		return this._dishCreationForm;
	}

	public get dishNameField( ): AbstractControl {
		return this.dishCreationForm.controls[ this.dishNameFieldName ];
	}

	public get ingredientNameField( ): AbstractControl {
		return this.dishCreationForm.controls[ this.ingredientNameFieldName ];
	}

	public get ingredientQuantityField( ): AbstractControl {
		return this.dishCreationForm.controls[ this.ingredientQuantityFieldName ];
	}

	public get addedIngredientsField( ): AbstractControl {
		return this.dishCreationForm.controls[ this.addedIngredientsFieldName ];
	}


	public get hasRequiredDishNameError( ): boolean {
		return this.dishNameField.hasError( 'required' );
	}

	public get hasRequiredIngredientNameError( ): boolean {
		return this.ingredientNameField.hasError( 'required' );
	}

	public get hasRequiredIngredientQuantityError( ): boolean {
		return this.ingredientQuantityField.hasError( 'required' );
	}

	public get hasIncorrectIngredientNameError( ): boolean {
		return this.ingredientNameField.hasError( 'autocomplete' );
	}

	public get hasInvalidIngredientQuantityFormatError(): boolean {
		return this.ingredientQuantityField.hasError('pattern');
	}

	public get hasInvalidQuantityIngredientQuantityError(): boolean {
		return this.ingredientQuantityField.hasError('min');
	}


	public get isWaitingForServerResponse( ): boolean {
		return this._isWaitingForServerResponse;
	}

	public set isWaitingForServerResponse( value: boolean ) {
		this._isWaitingForServerResponse = value;

		if ( value ) {
			this.dishNameField.disable( );
		}
		else {
			this.dishNameField.enable( );
		}
	}

	public get submitbuttonText( ): string {
		return this.isWaitingForServerResponse
			? 'Creando'
			: 'Crear';
	}

	public get submitButtonIsEnabled( ): boolean {
		return this.dishNameField.valid
			&& this.addedIngredientsField.valid;
	}

	public get requiredDishNameErrorMessage( ): string {
		return 'Tenés que ingresar el nombre del plato';
	}

	public get requiredIngredientNameErrorMessage( ): string {
		return 'Tenés que ingresar el nombre del ingrediente';
	}

	public get requiredIngredientQuantityErrorMessage( ): string {
		return 'Tenés que ingresar la cantidad necesaria del ingrediente';
	}

	public get incorrectIngredientNameErrorMessage( ): string {
		return 'Tenés que ingresar un ingrediente de la lista';
	}

	public get invalidIngredientQuantityFormatErrorMessage( ): string {
		return 'Debe ser un numero con hasta 2 decimales y el separador de decimales debe ser el .';
	}

	public get invalidIngredientQuantityErrorMessage( ): string {
		return 'La cantidad debe ser un mayor a 0';
	}

	public get filteredIngredientsOptions( ): IngredientRecipeDTO[ ] {
		if (this.ingredientNameField.value == null) {
			return this.ingredients;
		}
		if ( typeof this.ingredientNameField.value !== 'string' ) {
			return [ this.ingredientNameField.value ];
		}

		const fieldText: string = this.ingredientNameField.value;
		if ( fieldText === '' ) {
			return this.ingredients;
		}

		const filteredIngredients = this.ingredients.filter( ( ingredient ) => {
			return this.fuzzySearchService.isFuzzilyIncludedInText( fieldText, ingredient.name );
		});
		return filteredIngredients;
	}

	public get addedIngredients( ): { ingredient: IngredientRecipeDTO; quantity: Number }[ ] {
		return this.addedIngredientsField.value;
	}

	public get shouldEnableAddIngredientButton( ): boolean {
		return this.ingredientNameField.valid && this.ingredientQuantityField.valid;
	}

	public constructor(
		private readonly ingredientsService: IngredientsService,
		private readonly fuzzySearchService: FuzzySearchService,
		private readonly snackBar: MatSnackBar,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly dishService: DishesService
	) {
		this.ingredientsSubscription = this.ingredientsService.getAll().subscribe( (ingredients) => {
			this.ingredients = ingredients;
			this.ingredientNameField.setValidators([
				Validators.required,
			]);
		});
	}

	public ngOnDestroy(): void {
		if (this.ingredientsSubscription) {
			this.ingredientsSubscription.unsubscribe();
		}
	}

	public ngAfterViewInit( ): void {
		this.focusDishNameInput( );
	}

	public create(): void {
		this.isWaitingForServerResponse = true;
		const dishName: string = this.dishNameField.value;
		const ingredients: DishItem[] = this.addedIngredientsField.value;
		this.dishService
		.create(dishName, ingredients)
		.pipe(
			tap({
				next: () => {
					this.isWaitingForServerResponse = false;
				},
				error: () => {
					this.isWaitingForServerResponse = false;
				}
			})
		)
		.subscribe({
			next: (res: Dish) => {
				this.showSnackBar(
					`El plato se creó exitosamente`
				);
				this.dishCreationForm.reset( );
			},
			error: (err) => {
				this.showSnackBar(
					`Ocurió un error al crear el plato, intente nuevamente`
				);
			}
		});

	}

	public addIngredient( ): void {
		const addedIngredients = this.addedIngredients ?? [ ];
		this.addedIngredientsField.setValue([
			{
				ingredient: this.ingredientNameField.value,
				quantity: this.ingredientQuantityField.value,
			},
			...addedIngredients,
		]);
		this.ingredientNameField.reset( '' );
		this.ingredientQuantityField.reset( '' );
	}

	public removeIngredient( ingredientId: string ): void {
		const addedIngredients = this.addedIngredients ?? [ ];
		const addedIngredientsWithoutRemoved = addedIngredients.filter( ( i ) => i.ingredient.id !== ingredientId );
		this.addedIngredientsField.setValue( addedIngredientsWithoutRemoved );
	}

	public getIngredientName( ingredient: IngredientRecipeDTO ): string {
		return ingredient?.name || '';
	}

	public getCurrentIngredientMeasurement(): string {
		return this.ingredientNameField.value?.measurement || '';
	}

	/**
	 * Programatically swtiches the user focus to the ingredient name input.
	 */
	private focusDishNameInput( ): void {
		this._dishNameInputRef.nativeElement.focus( );
		this.changeDetectorRef.detectChanges( );
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

}
