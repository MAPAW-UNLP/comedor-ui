import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealDetailPageComponent } from './components/meal-detail-page/meal-detail-page.component';

/**
 * Module for the page where a kitchen site employee can create a new menu.
 */
@NgModule({
	declarations: [
		MealDetailPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		MealDetailPageComponent,
	],
})
export class MealDetailPageModule { }