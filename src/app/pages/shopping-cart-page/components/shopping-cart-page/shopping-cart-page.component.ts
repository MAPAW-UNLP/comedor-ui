import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import moment from 'moment';
import { tap } from 'rxjs/operators';
import { ConsumptionType } from 'src/app/enums/consumption-type.enum';
import { Menu } from 'src/app/models/menu.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { TicketDTO } from 'src/app/shared/services/tickets/dto/ticket.dto';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { creditCardExpirancyValidator, creditCardNumberValidator } from 'src/app/shared/validators/credit-card.validator';


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
})
export class ShoppingCartPageComponent implements OnInit {

	public showStepper = false;
	public paymentMethodFormGroup!: FormGroup;
	public cardInfoFormGroup!: FormGroup;
	public cartItems: Menu[] = [];
	public isWaitingForServerResponse = false;
	public lastStepMessage: string = '';
	public buySucceded: boolean = false;

	public paymentMethods: PaymentMethod[] = [
		{
			id: 'CARD',
			name: 'Tarjeta'
		}
	];

	@ViewChild( 'stepper' )
	public readonly stepperInputRef!: MatStepper;

	public constructor(
		private readonly _formBuilder: FormBuilder,
		public readonly cartService: CartService,
		public readonly ticketService: TicketsService,
		public readonly router: Router,
		) { }

	public ngOnInit() {

		this.cardInfoFormGroup = this._formBuilder.group({
			name: ['', Validators.required],
			cardNumber: ['', [Validators.required, creditCardNumberValidator]],
			expirancy: ['', [Validators.required, creditCardExpirancyValidator]],
			ccv: ['', [Validators.required]]
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
		return `${menu.name} - ${date} - ${menu.kitchenSite.name}`;
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


	public get expirancyDigitCountToExpected( ): string {
		return `${ this.cardInfoFormGroup.get('expirancy')?.value.length } / 4`;
	}

	public get ccvDigitCountToExpected( ): string {
		return `${ this.cardInfoFormGroup.get('ccv')?.value.length } / 3`;
	}

	public getCardLastNumbers(): string {
		const cardNumber = this.cardInfoFormGroup.get('cardNumber')?.value.split('');
		return cardNumber.slice(cardNumber.length - 4, cardNumber.length ).join('');
	}

	public buy(): void {
		if (this.cardInfoFormGroup.invalid || this.paymentMethodFormGroup.invalid) {
			return ;
		}
		this.isWaitingForServerResponse = true;
		const items: TicketDTO[] = this.cartItems.map((ci) => {
			return {
				menu: {
					id: Number.parseInt(ci.id)
				},
				ticketType: ConsumptionType.OnSite
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
}