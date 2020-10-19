import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
import { autocompleteValidator } from 'src/app/shared/validators/autocomplete.validator';
import moment, { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { KitchenSitesService } from 'src/app/shared/services/kitchenSites/kitchen-sites.service';
import { KitchenSiteDTO } from 'src/app/shared/services/kitchenSites/dto/kitchen-site.dto';


interface AutocompleteData {
	value: string;
	label: string;
}

/**
 * Top-level component of the MenuCreationPage module.
 */
@Component({
	selector: 'cu-menu-creation-page',
	templateUrl: './menu-creation-page.component.html',
	styleUrls: [ './menu-creation-page.component.scss' ],
})
export class MenuCreationPageComponent{

	private readonly avalibleCombos: AutocompleteData[ ] = [
		{
			value: '1',
			label: 'Mila',
		},
		{
			value: '2',
			label: 'Pizza',
		},
		{
			value: '3',
			label: 'Pollo',
		}
	];

	public kitchenSites: KitchenSiteDTO[ ] = [];

	@ViewChild( 'datepicker' )
	public readonly datepickerInputRef!: ElementRef<HTMLInputElement>;
	@ViewChild( 'picker' )
	public readonly pickerInputRef!: MatDatepicker<Moment | undefined>;

	private readonly avalibleCombosLabels: string[] =  this.avalibleCombos.map((c) => c.label);

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
				autocompleteValidator( this.avalibleCombosLabels ),
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
		[ this._priceFieldName ]: new FormControl( '', {
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
			],
		}),
	});

	// private _isWaitingForServerResponse: boolean = false;

	public constructor(
		private readonly fuzzySearchService: FuzzySearchService,
		private readonly kitchenSitesService: KitchenSitesService,
		private readonly snackBar: MatSnackBar,
	) {
		this.kitchenSitesService.getAll().subscribe( (r) => {
			this.kitchenSites = r;
			this.kitchenSiteField.setValue(this.kitchenSitesLabels(r));
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

	/**
	 * The form group for authentication displayed on the page.
	 */
	public get menuCreationForm( ): FormGroup {
		return this._menuCreationForm;
	}

	public displayCombosLabels(combo: AutocompleteData): string {
		return combo.label;
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

	public get filteredCombosOptions( ): AutocompleteData[ ] {
		const fieldText: string = this.comboField.value;

		if ( fieldText === '' ) {
			return this.avalibleCombos;
		}

		return this.avalibleCombos.filter( ( combo ) => {
			return this.fuzzySearchService.isFuzzilyIncludedInText( fieldText, combo.label );
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
		console.log('date');
	}
}