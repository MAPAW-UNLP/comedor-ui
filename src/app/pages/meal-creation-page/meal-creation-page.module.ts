import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealCreationPageComponent } from './components/meal-creation-page/meal-creation-page.component';

/**
 * Module for the page where a kitchen site employee can create a new menu.
 */
@NgModule({
	declarations: [
		MealCreationPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		MealCreationPageComponent,
	],
})
export class MealCreationPageModule { }