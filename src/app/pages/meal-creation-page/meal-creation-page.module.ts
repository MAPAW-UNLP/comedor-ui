import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DishCreationPageModule } from '../dish-creation-page/dish-creation-page.module';
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
		ReactiveFormsModule,
		SharedModule,
		DishCreationPageModule
	],
	exports: [
		MealCreationPageComponent,
	],
})
export class MealCreationPageModule { }