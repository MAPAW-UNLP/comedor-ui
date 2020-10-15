import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
import { IngredientsService } from 'src/app/shared/services/ingredients/ingredients.service';
import { IngredientRecipeDTO } from 'src/app/shared/services/ingredients/dto/ingredient-recipe.dto';
import { Subscription } from 'rxjs';

/**
 * Top-level component of the IngredientsCreationPage module.
 */
@Component({
	selector: 'cu-dish-creation-page',
	templateUrl: './dish-creation-page.component.html',
	styleUrls: [ './dish-creation-page.component.scss' ],
})
export class DishCreationPageComponent implements AfterViewInit, OnDestroy {
	private readonly _dishNameFieldName: string = 'ingredientNameField';

	private _isWaitingForServerResponse: boolean = false;

	private readonly ingredientsSubscription: Subscription;

	public ingredients: IngredientRecipeDTO[] = [];

	private readonly _dishCreationForm: FormGroup = new FormGroup({
		[ this._dishNameFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
	});

	@ViewChild( 'dishNameInput' )
	private readonly _dishNameInputRef!: ElementRef<HTMLInputElement>;

	public get dishCreationForm( ): FormGroup {
		return this._dishCreationForm;
	}

	public get dishNameFieldName( ): string {
		return this._dishNameFieldName;
	}

	public get dishNameField( ): AbstractControl {
		return this.dishCreationForm.controls[ this.dishNameFieldName ];
	}


	public get hasRequiredDishNameError( ): boolean {
		return this.dishNameField.hasError( 'required' );
	}

	public get requiredDishNameErrorMessage( ): string {
		return 'Tenés que ingresar el nombre del plato';
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

	public get submitButtonIsDisabled( ): boolean {
		return this.dishCreationForm.invalid || this.isWaitingForServerResponse;
	}

	public constructor(
		private readonly ingredientsService: IngredientsService,
		private readonly fuzzySearchService: FuzzySearchService,
		private readonly snackBar: MatSnackBar,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly route: ActivatedRoute,
	) {
		this.ingredientsSubscription = this.ingredientsService.getAll().subscribe( (ingredients) => {
			this.ingredients = ingredients;
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
		if ( this.dishCreationForm.invalid ) {
			return;
		}
		this.isWaitingForServerResponse = true;

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
