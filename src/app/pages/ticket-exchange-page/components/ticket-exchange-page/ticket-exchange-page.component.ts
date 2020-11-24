import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import moment, { Moment } from 'moment';
import { tap } from 'rxjs/operators';
import { dniLength } from 'src/app/constants/dni-length.constant';
import { AbTestingService } from 'src/app/shared/services/abTesting/ab-testing-service';
import { KitchenSiteDTO } from 'src/app/shared/services/kitchenSites/dto/kitchen-site.dto';
import { KitchenSitesService } from 'src/app/shared/services/kitchenSites/kitchen-sites.service';
import { TicketDTO } from 'src/app/shared/services/tickets/dto/ticket.dto';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { dniLengthValidator } from 'src/app/shared/validators/dni-length.validator';

/**
 * Top-level component of the MenuShopPage module.
 */
@Component({
	selector: 'cu-ticket-exchange-page',
	templateUrl: './ticket-exchange-page.component.html',
	styleUrls: [ './ticket-exchange-page.component.scss' ],
})
export class TicketExchangePageComponent {

	public ticket: TicketDTO | undefined;
	public kitchenSites: KitchenSiteDTO[] = [];
	public searchFormGroup!: FormGroup;
	public readonly minDate = moment();
	public isWaitingForServerResponse = false;
	public isFirstPaint: boolean = true;
	public isConsumingTicket: boolean = false;
	public ticketConsumed: boolean = false;

	public constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly ticketsService: TicketsService,
		private readonly kitchenSiteService: KitchenSitesService,
		private readonly snackBar: MatSnackBar,
		private readonly AbTestingService: AbTestingService
	) {
		this.searchFormGroup = this._formBuilder.group({
			date: ['', [Validators.required]],
			kitchenSite: ['', [Validators.required]],
			dni: ['', [Validators.required, dniLengthValidator]],
		});
		this.kitchenSiteService.getAll().subscribe((sites: KitchenSiteDTO[]) => {
			this.kitchenSites = sites;
		});
	}

	public get dniField( ): AbstractControl {
		// tslint:disable-next-line: no-string-literal
		return this.searchFormGroup.controls[ 'dni' ];
	}

	public get dniDigitCountToExpected( ): string {
		return `${ this.dniField.value.length } / ${ dniLength }`;
	}

	public get hasRequiredDniError( ): boolean {
		return this.dniField.hasError( 'required' );
	}

	public get hasDniLengthError( ): boolean {
		return this.dniField.hasError( 'dniLength' ) && !this.hasRequiredDniError;
	}

	public get requiredDniErrorMessage( ): string {
		return 'Tenés que ingresar un DNI';
	}

	public get dniLengthErrorMessage( ): string {
		return 'El DNI tiene que tener 8 dígitos';
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

	public search(): void {
		console.log(this.AbTestingService.getBranch());
		if (this.searchFormGroup.invalid) {
			return ;
		}
		this.ticketConsumed = false;
		this.isFirstPaint = false;
		this.isWaitingForServerResponse = true;
		const kitchenSiteId: number  = this.searchFormGroup.get('kitchenSite')?.value;
		const dniNumber: number  = this.searchFormGroup.get('dni')?.value;
		const date: Moment = this.searchFormGroup.get('date')?.value;
		if (dniNumber && date && kitchenSiteId) {
			this.ticketsService.search(date.format('YYYY-MM-DD'), dniNumber.toString(), kitchenSiteId)
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
				next: ( response: TicketDTO ) => {
					this.ticket = response;
					this.ticketConsumed = this.ticket.consumed;
				},
				error: ( error: Error ) => {
					this.showSnackBar(
						`Ocurió un error al buscar el ticket, intente nuevamente`
					);
				},
			});
		}
	}

	public consumeTicket(id: number): void {
		this.isConsumingTicket = true;
		this.ticketsService.consume(id)
		.subscribe({
			next: ( response: any ) => {
				this.isFirstPaint = true;
				this.isConsumingTicket = false;
				this.ticketConsumed = true;
				this.showSnackBar(
					`El ticket se canjeó correctamente`
				);
			},
			error: ( error: Error ) => {
				this.isConsumingTicket = false;
				this.showSnackBar(
					`Ocurió un error al canjear el ticket, intente nuevamente`
				);
			},
		});
	}
}