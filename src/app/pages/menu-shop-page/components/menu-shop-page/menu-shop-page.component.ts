import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

/**
 * Top-level component of the MenuShopPage module.
 */
@Component({
	selector: 'cu-menu-shop-page',
	templateUrl: './menu-shop-page.component.html',
	styleUrls: [ './menu-shop-page.component.scss' ],
})
export class MenuShopPageComponent {

	private readonly noTicketsMessage = 'No hay menús disponibles para la fecha y sede elegida, pruebe con otra fecha o sede.';
	private readonly errorGettingTicketsMessage = `Ocurió un error al cargar los menús, intente nuevamente`;
	public menus: Menu[] = [];
	public kitchenSites: KitchenSiteDTO[] = [];
	public searchFormGroup!: FormGroup;
	public readonly minDate = moment();
	public isWaitingForServerResponse = false;
	public isFirstPaint: boolean = true;
	public emptyTicketsMessage: string | null = null;

	public constructor(
		private readonly _formBuilder: FormBuilder,
		public readonly cartService: CartService,
		private readonly menusService: MenusService,
		private readonly kitchenSiteService: KitchenSitesService,
		private readonly router: Router,
		public readonly authService: AuthService,
		private route: ActivatedRoute
	) {
		this.menus = [];
		const queryParams = this.route.snapshot.queryParams;
		const dateParam = queryParams['date'] || '';
		let date: Moment | null = null
		if(dateParam) {
			const dateAsMoment = moment(dateParam);
			if(dateAsMoment.isValid()) {
				date = dateAsMoment;
			}
		}
		this.searchFormGroup = this._formBuilder.group({
			date: [date || '', [Validators.required]],
			kitchenSite: ['' , [Validators.required]]
		});
		this.kitchenSiteService.getAll().subscribe((sites: KitchenSiteDTO[]) => {
			this.kitchenSites = sites;
			const kitchenSiteId = parseInt(queryParams['kitchen_site']) || ''
			const paramKitchenSite = sites.find( s => s.id === kitchenSiteId)
			if(paramKitchenSite){
				this.searchFormGroup.get('kitchenSite')?.setValue(paramKitchenSite.id)
			}
			if(paramKitchenSite && date) {
				this.search()
			} else {
				this.searchFormGroup.reset();
				this.router.navigate(
					[],
					{
					  relativeTo: this.route,
					  queryParams: { date: null, kitchen_site: null },
					  queryParamsHandling: 'merge'
					});
			}
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

	public search(): void {
		if (this.searchFormGroup.invalid) {
			return ;
		}
		this.emptyTicketsMessage = null;
		this.isFirstPaint = false;
		this.isWaitingForServerResponse = true;
		const kitchenSiteId: number  = this.searchFormGroup.get('kitchenSite')?.value;
		const date: string = this.searchFormGroup.get('date')?.value.format('YYYY-MM-DD');
		this.router.navigate(
			[],
			{
			  relativeTo: this.route,
			  queryParams: { date, kitchen_site: kitchenSiteId },
			  queryParamsHandling: 'merge'
			});
		this.menusService.search(date, kitchenSiteId)
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
			next: ( response: Menu[] ) => {
				if (response.length) {
					this.menus = response;
				} else {
					this.emptyTicketsMessage = this.noTicketsMessage;
				}
			},
			error: ( error: HttpErrorResponse ) => {
				if (error.status === 403) {
					this.emptyTicketsMessage = error.error?.message || this.errorGettingTicketsMessage;
				} else {
					this.emptyTicketsMessage = this.errorGettingTicketsMessage;
				}
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