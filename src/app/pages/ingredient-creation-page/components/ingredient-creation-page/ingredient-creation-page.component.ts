import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
import { IngredientRecipeDTO } from 'src/app/shared/services/ingredients/dto/ingredient-recipe.dto';
import { IngredientsService } from 'src/app/shared/services/ingredients/ingredients.service';
import { autocompleteValidator } from 'src/app/shared/validators/autocomplete.validator';
import { MeasurementUnitAutocompleteOption } from './interfaces/measurement-unit-autocomplete-option.interface';

/**
 * Top-level component of the IngredientCreationPage module.
 */
@Component({
	selector: 'cu-ingredient-creation-page',
	templateUrl: './ingredient-creation-page.component.html',
	styleUrls: [ './ingredient-creation-page.component.scss' ],
})
export class IngredientCreationPageComponent implements AfterViewInit {
	private readonly _ingredientNameFieldName: string = 'ingredientNameField';
	private readonly _measurementUnitFieldName: string = 'measurementUnitField';
	private readonly _ingredientCreated = new EventEmitter<void>( );
	private readonly _measurementUnitOptions: MeasurementUnitAutocompleteOption[ ] = [
		{
			value: MeasurementUnit.CubicCentimetre,
			label: 'Centímetros cúbicos',
		},
		{
			value: MeasurementUnit.Gram,
			label: 'Gramos',
		},
		{
			value: MeasurementUnit.Kilogram,
			label: 'Kilogramos',
		},
		{
			value: MeasurementUnit.Litre,
			label: 'Litros',
		},
		{
			value: MeasurementUnit.Millilitre,
			label: 'Mililitros',
		},
		{
			value: MeasurementUnit.Unit,
			label: 'Unidades',
		},
	];
	private readonly _ingredientCreationForm: FormGroup = new FormGroup({
		[ this._ingredientNameFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
		[ this._measurementUnitFieldName ]: new FormControl( '', [
			Validators.required,
			autocompleteValidator( this.measurementUnitOptionLabels ),
		]),
	});

	private _isWaitingForServerResponse: boolean = false;

	@Output( )
	public get ingredientCreated(): EventEmitter<void> {
		return this._ingredientCreated;
	}

	@ViewChild( 'ingredientNameInput' )
	private readonly _ingredientNameInputRef!: ElementRef<HTMLInputElement>;

	public get ingredientCreationForm( ): FormGroup {
		return this._ingredientCreationForm;
	}

	public get ingredientNameFieldName( ): string {
		return this._ingredientNameFieldName;
	}

	public get measurementUnitFieldName( ): string {
		return this._measurementUnitFieldName;
	}

	public get ingredientNameField( ): AbstractControl {
		return this.ingredientCreationForm.controls[ this.ingredientNameFieldName ];
	}

	public get measurementUnitField( ): AbstractControl {
		return this.ingredientCreationForm.controls[ this.measurementUnitFieldName ];
	}

	private get measurementUnitOptions( ): MeasurementUnitAutocompleteOption[ ] {
		return this._measurementUnitOptions;
	}

	private get measurementUnitOptionLabels( ): string[ ] {
		return this.measurementUnitOptions.map( ( option ) => option.label );
	}

	public get filteredMeasurementUnitOptionLabels( ): string[ ] {
		const fieldText: string = this.measurementUnitField.value;

		if ( fieldText === '' ) {
			return this.measurementUnitOptionLabels;
		}

		return this.measurementUnitOptionLabels.filter( ( label ) => {
			return this.fuzzySearchService.isFuzzilyIncludedInText( fieldText, label );
		});
	}

	public get hasRequiredIngredientNameError( ): boolean {
		return this.ingredientNameField.hasError( 'required' );
	}

	public get hasRequiredMeasurementUnitError( ): boolean {
		return this.measurementUnitField.hasError( 'required' );
	}

	public get hasInvalidMeasurementError( ): boolean {
		return this.measurementUnitField.hasError( 'autocomplete' );
	}

	public get requiredIngredientNameErrorMessage( ): string {
		return 'Tenés que ingresar el nombre del ingrediente';
	}

	public get requiredMeasurementUnitErrorMessage( ): string {
		return 'Tenés que ingresar la unidad de medida del ingrediente';
	}

	public get invalidMeasurementUnitErrorMessage( ): string {
		return 'Tenés que ingresar una unidad de medida de la lista';
	}

	public get isWaitingForServerResponse( ): boolean {
		return this._isWaitingForServerResponse;
	}

	public set isWaitingForServerResponse( value: boolean ) {
		this._isWaitingForServerResponse = value;

		if ( value ) {
			this.ingredientNameField.disable( );
			this.measurementUnitField.disable( );
		}
		else {
			this.ingredientNameField.enable( );
			this.measurementUnitField.enable( );
		}
	}

	public get submitbuttonText( ): string {
		return this.isWaitingForServerResponse
			? 'Creando'
			: 'Crear';
	}

	public get submitButtonIsDisabled( ): boolean {
		return this.ingredientCreationForm.invalid || this.isWaitingForServerResponse;
	}

	public constructor(
		private readonly ingredientsService: IngredientsService,
		private readonly fuzzySearchService: FuzzySearchService,
		private readonly snackBar: MatSnackBar,
		private readonly changeDetectorRef: ChangeDetectorRef,
	) { }

	public ngAfterViewInit( ): void {
		this.focusIngredientNameInput( );
	}

	public create( ): void {
		if ( this.ingredientCreationForm.invalid ) {
			return;
		}

		this.isWaitingForServerResponse = true;

		const ingredientName: string = this.ingredientNameField.value;
		const measurementUnit: MeasurementUnit = this.getMeasurementUnitByLabel(
			this.measurementUnitField.value
		);

		this.ingredientsService
			.create( ingredientName, measurementUnit )
			.pipe(
				tap({
					next: ( ) => {
						this.isWaitingForServerResponse = false;
					},
					error: ( ) => {
						this.isWaitingForServerResponse = false;
					},
				}),
			)
			.subscribe({
				next: ( response: IngredientRecipeDTO ) => {
					this.showSnackBar(
						`El ingrediente se creó exitosamente`
					);
					this.ingredientCreationForm.reset( );
					this.ingredientCreated.emit();
				},
				error: ( error: Error ) => {
					this.showSnackBar(
						`Ocurió un error al crear el ingrediente, intente nuevamente`
					);
				},
			});
	}

	/**
	 * Programatically swtiches the user focus to the ingredient name input.
	 */
	private focusIngredientNameInput( ): void {
		this._ingredientNameInputRef.nativeElement.focus( );
		this.changeDetectorRef.detectChanges( );
	}

	/**
	 * Retrieves the unique identifying value of the measurement unit by it's label in the autocomplete control.
	 *
	 * Throws an error if there's no measurement unit with the provided label.
	 */
	private getMeasurementUnitByLabel( measurementUnitLabel: string ): MeasurementUnit {
		const measurementUnit: MeasurementUnit | undefined = this._measurementUnitOptions
			.find( ( option ) => option.label === measurementUnitLabel )
			?.value;

		if ( measurementUnit === undefined ) {
			throw new Error( `There's no measurement unit with label "${ measurementUnitLabel }".` );
		}
		else {
			return measurementUnit;
		}
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