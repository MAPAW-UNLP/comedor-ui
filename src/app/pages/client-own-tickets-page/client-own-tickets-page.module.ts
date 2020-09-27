import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientOwnTicketsPageComponent } from './components/client-own-tickets-page/client-own-tickets-page.component';

/**
 * Module for the page where a client can view all the tickets they have purchased.
 */
@NgModule({
	declarations: [
		ClientOwnTicketsPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		ClientOwnTicketsPageComponent,
	],
})
export class ClientOwnTicketsPageModule { }