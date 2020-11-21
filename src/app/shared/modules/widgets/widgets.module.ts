import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MaterialModule } from '../material/material.module';
import { ExchangeCardComponent } from './components/exchange-card/exchange-card.component';
import { MenuReviewEditorComponent } from './components/menu-review-editor/menu-review-editor.component';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';
import { MenuReviewCardComponent } from './components/menu-review-card/menu-review-card.component';

/**
 * Module that exports all the reusable dependencies in the application.
 */
@NgModule({
	declarations: [
		MenuCardComponent,
		ExchangeCardComponent,
		MenuReviewEditorComponent,
		MenuReviewCardComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		StarRatingModule.forRoot( ),
		FormsModule,
	],
	exports: [
		MenuCardComponent,
		ExchangeCardComponent,
		MenuReviewEditorComponent,
		MenuReviewCardComponent,
	],
})
export class WidgetsModule { }