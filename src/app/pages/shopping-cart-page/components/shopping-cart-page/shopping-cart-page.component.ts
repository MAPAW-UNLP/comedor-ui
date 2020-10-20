import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { Menu } from 'src/app/models/menu.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
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

	public paymentMethods: PaymentMethod[] = [
		{
			id: 'CARD',
			name: 'Tarjeta'
		}
	];

	public constructor(
		private readonly _formBuilder: FormBuilder,
		public readonly cartService: CartService,
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

	}
}