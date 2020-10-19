import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingCartPageComponent } from './components/shopping-cart-page/shopping-cart-page.component';

/**
 * Module for the page where a client can view all the menus they have added to the shopping cart.
 */
@NgModule({
	declarations: [
		ShoppingCartPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		ShoppingCartPageComponent,
	],
})
export class ShoppingCartPageModule { }