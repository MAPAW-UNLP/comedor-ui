import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MaterialModule } from '../material/material.module';
import { ExchangeCardComponent } from './components/exchange-card/exchange-card.component';

/**
 * Module that exports all the reusable dependencies in the application.
 */
@NgModule({
	declarations: [
		MenuCardComponent,
		ExchangeCardComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
	],
	exports: [
		MenuCardComponent,
		ExchangeCardComponent,
	],
})
export class WidgetsModule { }