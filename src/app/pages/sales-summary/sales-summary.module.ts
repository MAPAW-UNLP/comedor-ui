import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesSummaryComponent } from './components/sales-summary/sales-summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

/**
 * Module for the sales summary page.
 */
@NgModule({
	declarations: [
		SalesSummaryComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		SalesSummaryComponent,
	],
})
export class SalesSummaryModule { }