import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ConsumptionType } from 'src/app/enums/consumption-type.enum';
import { Menu } from 'src/app/models/menu.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { TicketToBuyDTO } from 'src/app/shared/services/tickets/dto/ticket-to-buy.dto';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { creditCardNumberValidator } from 'src/app/shared/validators/credit-card.validator';
import { consumptionTypeLabels } from 'src/app/constants/consumption-type-labels.constant';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import moment from 'moment';

interface PaymentMethod {
	id: string;
	name: string;
}
/**
 * Top-level component of the ShoppingCartPage module.
 */
@Component({
	selector: 'cu-shopping-cart-page',
	templateUrl: './shopping-cart-page.component.html',
	styleUrls: [ './shopping-cart-page.component.scss' ],
	// tslint:disable-next-line: use-component-view-encapsulation
	encapsulation: ViewEncapsulation.None
})
export class ShoppingCartPageComponent implements OnInit {

	public showStepper = false;
	public paymentMethodFormGroup!: FormGroup;
	public cardInfoFormGroup!: FormGroup;
	public cartItems: Menu[] = [];
	public isWaitingForServerResponse = false;
	public lastStepMessage: string = '';
	public buySucceded: boolean = false;
	// tslint:disable-next-line: no-magic-numbers
	public validMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	public validYears: number[] = [];
	public cardIsExpired = false;

	public paymentMethods: PaymentMethod[] = [
		{
			id: 'CARD',
			name: 'Tarjeta'
		}
	];

	@ViewChild( 'stepper' )
	public readonly stepperInputRef!: MatStepper;

	public get pageUrls( ) {
		return PageUrls;
	}

	public constructor(
		private readonly _formBuilder: FormBuilder,
		public readonly cartService: CartService,
		public readonly ticketService: TicketsService,
		public readonly router: Router,
	) {
		const today = moment();
		for (let index = 1; index < 10; index++) {
			this.validYears.push(today.year());
			today.add(1, 'year');
		}
	}

	public ngOnInit() {

		this.cardInfoFormGroup = this._formBuilder.group({
			name: ['', Validators.required],
			cardNumber: ['', [Validators.required, creditCardNumberValidator]],
			expirancy: ['', [Validators.required]],
			expirancyMonth: ['', [Validators.required]],
			expirancyYear: ['', [Validators.required]],
			ccv: ['', [Validators.required]],
		});
		this.paymentMethodFormGroup = this._formBuilder.group({
			paymentMethod: ['', Validators.required]
		});
		this.cartItems = this.cartService.getCartItems();
	}

	public proceedToPayment(): void {
		if (this.paymentMethodFormGroup.invalid) {
			return;
		}
		this.showStepper = true;
	}

	public getSummaryOptionText(menu: Menu): string {
		const date = moment(menu.date, ['DD/MM/YYYY', 'YYYY-MM-DD']).locale('es').format('dddd DD/MM/YYYY');
		return `${menu.name} - ${date} - ${menu.kitchenSite.name} - ${consumptionTypeLabels[menu.consumptionType]}`;
	}

	public returnToSummary(): void {
		this.paymentMethodFormGroup.reset();
		this.cardInfoFormGroup.reset();
		this.showStepper = false;
	}

	public getTotalAmount(): string {
		return this.cartItems.reduce((acc, current) => acc + current.unitPrice, 0).toString();
	}

	public removeFromCart(menu: Menu): void {
		this.cartItems = this.cartService.remove(menu.id);
	}

	public get ccvDigitCountToExpected( ): string {
		return `${ this.cardInfoFormGroup.get('ccv')?.value?.length || 0 } / 3`;
	}

	public getCardLastNumbers(): string {
		const cardNumber = this.cardInfoFormGroup.get('cardNumber')?.value?.split('');
		return cardNumber ? cardNumber.slice(cardNumber.length - 4, cardNumber.length ).join('') : '';
	}

	public updateExpirancy(): void {
		const today = moment();
		const expirancyMonth = this.cardInfoFormGroup.get('expirancyMonth')?.value;
		const expirancyYear = this.cardInfoFormGroup.get('expirancyYear')?.value;
		if (expirancyMonth && expirancyYear) {
			if (expirancyYear === today.year() && expirancyMonth < (today.month() + 1)) {
				this.cardInfoFormGroup.get('expirancy')?.setValue(null);
			} else {
				this.cardInfoFormGroup.get('expirancy')?.setValue('good');
			}
			this.cardInfoFormGroup.get('expirancy')?.markAsDirty();
		} else {
			return;
		}
	}

	public buy(): void {
		const today = moment();
		const expirancyMonth = this.cardInfoFormGroup.get('expirancyMonth')?.value;
		const expirancyYear = this.cardInfoFormGroup.get('expirancyYear')?.value;
		if (expirancyYear === today.year() && expirancyMonth < today.month()) {
			this.cardIsExpired = true;
		} else {
			this.cardInfoFormGroup.get('expirancy')?.setValue('good');
			this.cardIsExpired = false;
		}
		if (this.cardInfoFormGroup.invalid || this.paymentMethodFormGroup.invalid || this.cardIsExpired) {
			return ;
		}
		this.isWaitingForServerResponse = true;
		const items: TicketToBuyDTO[] = this.cartItems.map((ci) => {
			return {
				menu: {
					id: Number.parseInt(ci.id)
				},
				ticketType: ci.consumptionType
			};
		});
		this.ticketService.create({ items })
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
				this.buySucceded = true;
				this.cartItems = this.cartService.empty();
				this.lastStepMessage = 'Gracias por su compra !';
				this.stepperInputRef.next();
			},
			error: ( error: Error ) => {
				this.buySucceded = false;
				this.lastStepMessage = 'Algo salió mal con su compra, intente nuevamente';
				this.stepperInputRef.next();
			},
		});
	}

	public changeConsumptionType(menu: Menu, type: ConsumptionType): void {
		menu.consumptionType = type;
		this.cartService.updateMenu(menu);
	}

	public visitDetailPage( mealId: string ): void {
		const url = PageUrls.menuDetail.replace( ':id', mealId );
		this.router.navigate([url]);
	}
}