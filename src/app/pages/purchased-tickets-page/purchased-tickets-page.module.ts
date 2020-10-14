import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchasedTicketsPageComponent } from './components/purchased-tickets-page/purchased-tickets-page.component';

/**
 * Module for the page where a client can view all the tickets they have purchased.
 */
@NgModule({
	declarations: [
		PurchasedTicketsPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		PurchasedTicketsPageComponent,
	],
})
export class PurchasedTicketsPageModule { }