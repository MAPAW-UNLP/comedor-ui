import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
import { autocompleteValidator } from 'src/app/shared/validators/autocomplete.validator';
import moment, { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { KitchenSitesService } from 'src/app/shared/services/kitchenSites/kitchen-sites.service';
import { KitchenSiteDTO } from 'src/app/shared/services/kitchenSites/dto/kitchen-site.dto';
import { MealsService } from 'src/app/shared/services/meals/meals.service';
import { MealDTO } from 'src/app/shared/services/meals/dto/meal.dto';
import { MenusService } from 'src/app/shared/services/menus/menus.service';
import { MenuCreationRequestDTO } from 'src/app/shared/services/menus/dto/menu-creation-request.dto';
import { tap } from 'rxjs/operators';

/**
 * Top-level component of the MenuCreationPage module.
 */
@Component({
	selector: 'cu-menu-creation-page-test',
	templateUrl: './menu-creation-page-test.component.html',
	styleUrls: [ './menu-creation-page-test.component.scss' ],
})
export class MenuCreationPageTESTComponent{

	public avalibleCombos: MealDTO[ ] = [];

	public kitchenSites: KitchenSiteDTO[ ] = [];

	@ViewChild( 'datepicker' )
	public readonly datepickerInputRef!: ElementRef<HTMLInputElement>;
	@ViewChild( 'picker' )
	public readonly pickerInputRef!: MatDatepicker<Moment | undefined>;

	private readonly _comboFieldName: string = 'comboField';
	private readonly _anticipationFieldName: string = 'anticipationField';
	private readonly _stockFieldName: string = 'stockField';
	private readonly _priceFieldName: string = 'priceField';
	private readonly _kitchenSitesFieldName: string = 'kitchenSitesField';
	private readonly _sellingDatesFieldName: string = 'sellingDatesField';
	public readonly minDate = moment().add(1, 'day');

	private readonly _menuCreationForm: FormGroup = new FormGroup({
		[ this._comboFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
			],
		}),
		[ this._anticipationFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
				Validators.min(1)
			],
		}),
		[ this._stockFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
				Validators.min(1)
			],
		}),
		[ this._priceFieldName ]: new FormControl( '100', {
			validators: [
				Validators.required,
				Validators.min(1)
			],
		}),
		[ this._kitchenSitesFieldName ]: new FormControl( [], {
			validators: [
				Validators.required,
			],
		}),
		[ this._sellingDatesFieldName ]: new FormControl( [], {
			validators: [
				Validators.required,
				Validators.minLength( 1 ),
			],
		}),
	});

	public isWaitingForServerResponse: boolean = false;

	public constructor(
		private readonly fuzzySearchService: FuzzySearchService,
		private readonly kitchenSitesService: KitchenSitesService,
		private readonly mealsService: MealsService,
		private readonly menusService: MenusService,
		private readonly snackBar: MatSnackBar,
	) {
		this.kitchenSitesService.getAll().subscribe( (r) => {
			this.kitchenSites = r;
			this.kitchenSiteField.setValue(this.kitchenSitesLabels(r));
		});
		this.mealsService.getAll().subscribe( (r) => {
			this.avalibleCombos = r;
			this.comboField.setValidators([
				Validators.required,
				autocompleteValidator( this.avalibleCombosLabels(r) )
			]);
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

	private  kitchenSitesLabels(kitchenSites: KitchenSiteDTO[]): string[] {
		return kitchenSites.map((ks) => ks.name);
	}

	private  avalibleCombosLabels(combos: MealDTO[]): string[] {
		return this.avalibleCombos.map((ks) => ks.name);
	}

	private getComboByName( name: string ): MealDTO {
		const combo: MealDTO | undefined = this.avalibleCombos
			.find( ( option ) => option.name === name );

		if ( combo === undefined ) {
			throw new Error( `There's no menu with label "${ name }".` );
		}
		else {
			return combo;
		}
	}

	private getKitchenSitesByNames( names: string[]): KitchenSiteDTO[] {
		const kitchenSites: KitchenSiteDTO[] = this.kitchenSites
			.filter( ( option ) => names.includes(option.name) );

		if (kitchenSites.length === 0) {
			throw new Error( `There's no kitchen sites with names "${ names }".` );
		}
		else {
			return kitchenSites;
		}
	}

	/**
	 * The form group for authentication displayed on the page.
	 */
	public get menuCreationForm( ): FormGroup {
		return this._menuCreationForm;
	}

	public get comboField( ): AbstractControl {
		return this.menuCreationForm.controls[ this._comboFieldName ];
	}

	public get anticipationField( ): AbstractControl {
		return this.menuCreationForm.controls[ this._anticipationFieldName ];
	}

	public get stockField( ): AbstractControl {
		return this.menuCreationForm.controls[ this._stockFieldName ];
	}

	public get priceField( ): AbstractControl {
		return this.menuCreationForm.controls[ this._priceFieldName ];
	}

	public get kitchenSiteField( ): AbstractControl {
		return this.menuCreationForm.controls[ this._kitchenSitesFieldName ];
	}

	public get sellingDatesField( ): AbstractControl {
		return this.menuCreationForm.controls[ this._sellingDatesFieldName ];
	}

	public get filteredCombosOptions( ): MealDTO[ ] {
		const fieldText: string = this.comboField.value;

		if ( fieldText === '' ) {
			return this.avalibleCombos;
		}

		return this.avalibleCombos.filter( ( combo ) => {
			return this.fuzzySearchService.isFuzzilyIncludedInText( fieldText, combo.name );
		});
	}

	public addDate(): void {
		const value = this.datepickerInputRef.nativeElement.value;
		if (!!value) {
			const previousValue = this.sellingDatesField.value || [];
			this.sellingDatesField.setValue(previousValue.concat(value));
			this.datepickerInputRef.nativeElement.value = '';
			this.pickerInputRef.select(undefined);
		}
	}

	public removeDate(date: string): void {
		this.sellingDatesField.setValue(this.sellingDatesField.value?.filter((v: string) => date !== v) || []);
	}

	public formatDate(date: string): string {
		const asMoment = moment(date, 'DD/MM/YYYY').locale('es');
		return asMoment.format('dddd DD/MM/YYYY');
	}

	public datePickerFilter = (d: Moment | null): boolean => {
		const date = (d || moment());
		const selectedDates = this.sellingDatesField.value?.map((v: string) => moment(v, 'DD/MM/YYYY').toString()) || [];
		// Prevent Saturday and Sunday from being selected.
		return (date.day() !== 0 && date.day() !== 6) && !(selectedDates.includes(date.toString()));
	}

	public create(): void {
		if (this.menuCreationForm.invalid) {
			return ;
		}

		this.isWaitingForServerResponse = true;

		const name: string = this.comboField.value; // TODO PEDIR QUE LO SAQUEN - NO APLICA
		const meal: MealDTO = this.getComboByName(this.comboField.value);
		const anticipationDays = Number.parseInt(this.anticipationField.value);
		const stock = Number.parseInt(this.stockField.value);
		const unitPrice = Number.parseInt(this.priceField.value);
		const kitchenSites = this.getKitchenSitesByNames(this.kitchenSiteField.value).map((ks) => { return { id: ks.id}; });
		const habilitedDates = this.sellingDatesField.value.map((s: string) => moment(s, 'DD/MM/YYYY').format('YYYY-MM-DD'));
		const body: MenuCreationRequestDTO = {
			name,
			meal: {
				id: meal.id
			},
			anticipationDays,
			stock,
			unitPrice,
			kitchenSites,
			habilitedDates
		};
		this.menusService.create(body)
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
			next: ( response: any ) => {
				this.showSnackBar(
					`El menú ahora está a la venta en las fechas indicadas.`
				);
				this.menuCreationForm.reset( );
			},
			error: ( error: Error ) => {
				this.showSnackBar(
					`Ocurió un error al crear el menú, intente nuevamente`
				);
			},
		});
	}
}