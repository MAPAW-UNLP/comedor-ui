import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart/cart.service';

/**
 * Top-level component of the ShoppingCartPage module.
 */
@Component({
	selector: 'cu-shopping-cart-page',
	templateUrl: './shopping-cart-page.component.html',
	styleUrls: [ './shopping-cart-page.component.scss' ],
})
export class ShoppingCartPageComponent implements OnInit {

	public firstFormGroup!: FormGroup;
	public cardInfoFormGroup!: FormGroup;

	public constructor(
		private readonly _formBuilder: FormBuilder,
		public readonly cartService: CartService,
		) { }

	public ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required]
		});
		this.cardInfoFormGroup = this._formBuilder.group({
			name: ['', Validators.required],
			cardNumber: ['', Validators.required],
			expirancy: ['', Validators.required],
			ccv: ['', Validators.required]
		});
	}
}