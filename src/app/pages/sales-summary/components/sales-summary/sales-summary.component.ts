import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import moment, { Moment } from 'moment';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import { ConsumptionType } from 'src/app/enums/consumption-type.enum';
import { Menu } from 'src/app/models/menu.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { KitchenSiteDTO } from 'src/app/shared/services/kitchenSites/dto/kitchen-site.dto';
import { KitchenSitesService } from 'src/app/shared/services/kitchenSites/kitchen-sites.service';
import { MenusService } from 'src/app/shared/services/menus/menus.service';
import { SalesReportsResponseDTO } from 'src/app/shared/services/sales-reports/dto/sales-reports-response.dto';
import { SalesReportsService } from 'src/app/shared/services/sales-reports/sales-reports.service';

@Component({
	selector: 'cu-sales-summary',
	templateUrl: './sales-summary.component.html',
	styleUrls: ['./sales-summary.component.scss']
})
export class SalesSummaryComponent {
	public salesReports: SalesReportsResponseDTO = {
		meals: [],
		ingredients: [],
	};
	public kitchenSites: KitchenSiteDTO[ ] = [];
	public searchFormGroup!: FormGroup;
	public readonly minDate = moment( );
	public isWaitingForServerResponse = false;
	public isFirstRender = true;

	public get hasSalesReports( ): boolean {
		return this.salesReports.meals.length > 0;
	}

	public constructor(
		private readonly _formBuilder: FormBuilder,
		public readonly cartService: CartService,
		private readonly salesReportsService: SalesReportsService,
		private readonly kitchenSiteService: KitchenSitesService,
		private readonly snackBar: MatSnackBar,
		private readonly router: Router,
		public readonly authService: AuthService,
	) {
		this.searchFormGroup = this._formBuilder.group({
			date: [ '', [ Validators.required ] ],
			kitchenSite: [ '', [ Validators.required ] ],
		});
		this.kitchenSiteService.getAll( ).subscribe( ( sites: KitchenSiteDTO[ ] ) => {
			this.kitchenSites = sites;
		});
	}

	public removeFromCart(menu: Menu): void {
		this.cartService.remove(menu.id);
	}

	public datePickerFilter = (d: Moment | null): boolean => {
		const date = (d || moment());
		// Prevent Saturday and Sunday from being selected.
		return (date.day() !== 0 && date.day() !== 6);
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

	public search( ): void {
		if (this.searchFormGroup.invalid) {
			return ;
		}
		this.isWaitingForServerResponse = true;

		const kitchenSiteId: string = this.searchFormGroup.get( 'kitchenSite' )?.value;
		const date: Moment = this.searchFormGroup.get( 'date' )?.value;

		this.salesReportsService
			.get( date.format('YYYY-MM-DD'), kitchenSiteId )
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
				next: ( salesReportsResponseDTO: SalesReportsResponseDTO ) => {
					this.isFirstRender = false;
					this.salesReports = salesReportsResponseDTO;
				},
				error: ( ) => {
					this.showSnackBar(
						`Ocurió un error al cargar el resumen, intente nuevamente`
					);
				},
			});
	}

	public changeConsumptionType(menu: Menu, type: ConsumptionType): void {
		menu.consumptionType = type;
		this.cartService.updateMenu(menu);
	}

	public navigateToDetailView( mealId: string ): void {
		const url: string = PageUrls.menuDetail.replace( ':id', mealId );
		this.router.navigate([ url ]);
	}
}
