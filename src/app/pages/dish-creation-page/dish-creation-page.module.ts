import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientCreationPageModule } from '../ingredient-creation-page/ingredient-creation-page.module';
import { DishCreationPageComponent } from './components/dish-creation-page/dish-creation-page.component';

/**
 * Module for the page where a kitchen site employee can create a new dish.
 */
@NgModule({
	declarations: [
		DishCreationPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
		IngredientCreationPageModule
	],
	exports: [
		DishCreationPageComponent,
	],
})
export class DishCreationPageModule { }