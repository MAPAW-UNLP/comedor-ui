import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';
import { IngredientCreationResponseDTO } from 'src/app/shared/services/ingredients/dto/ingredient-creation-response.dto';
import { IngredientsService } from 'src/app/shared/services/ingredients/ingredients.service';
import { autocompleteValidator } from 'src/app/shared/validators/autocomplete.validator';

/**
 * Top-level component of the IngredientsCreationPage module.
 */
@Component({
	selector: 'cu-ingredients-creation-page',
	templateUrl: './ingredients-creation-page.component.html',
	styleUrls: [ './ingredients-creation-page.component.scss' ],
})
export class IngredientsCreationPageComponent implements OnInit {
	private readonly _ingredientNameFieldName: string = 'ingredientNameField';
	private readonly _measurementUnitFieldName: string = 'measurementUnitField';

	public readonly measurements = Object.keys( MeasurementUnit );
	public filteredMeasurements: string[ ] = this.measurements;

	private readonly _ingredientCreationForm: FormGroup = new FormGroup({
		[ this._ingredientNameFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
		[ this._measurementUnitFieldName ]: new FormControl( '', [
			Validators.required,
			autocompleteValidator( this.measurements ),
		]),
	});

	private _isWaitingForServerResponse: boolean = false;

	@ViewChild( 'ingredientNameInput' )
	private readonly _ingredientNameInputRef!: ElementRef<HTMLInputElement>;

	@ViewChild( 'measurementUnitInput' )
	private readonly _measurementUnitInputRef!: ElementRef<HTMLInputElement>;

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
		private readonly snackBar: MatSnackBar,
	) { }

	public ngOnInit() {
		this.measurementUnitField.valueChanges
		.subscribe((change) => {
			this.filteredMeasurements = this._autocompleteFilter(change);
		});
	}

	private _autocompleteFilter(value: string): string[] {
		const filterValue = value?.toLowerCase() || '';
		return this.measurements.filter((measurement) => measurement.toLowerCase().includes(filterValue));
	}

	public create( ): void {
		if ( this.ingredientCreationForm.invalid ) {
			return;
		}

		this.isWaitingForServerResponse = true;
		this.ingredientsService
			.create( this.ingredientNameField.value, this.measurementUnitField.value )
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
				next: ( response: IngredientCreationResponseDTO | undefined ) => {
					if ( response ) {
						this.showSnackBar(
							`El ingrediente se creó exitosamente`
						);
						this.ingredientCreationForm.reset();
					}
					else {
						this.showSnackBar(
							`Ocurió un error al crear el ingrediente, intente nuevamente`
						);
					}
				},
			});
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