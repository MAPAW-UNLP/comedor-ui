import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketExchangePageComponent } from './components/ticket-exchange-page/ticket-exchange-page.component';

/**
 * Module for the page where a client can view all the menus available for purchasing.
 */
@NgModule({
	declarations: [
		TicketExchangePageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		TicketExchangePageComponent,
	],
})
export class TicketExchangePageModule { }