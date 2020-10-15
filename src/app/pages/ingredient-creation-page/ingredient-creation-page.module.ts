import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientCreationPageComponent } from './components/ingredient-creation-page/ingredient-creation-page.component';

/**
 * Module for the page where a kitchen site employee can create a new ingredient.
 */
@NgModule({
	declarations: [
		IngredientCreationPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		IngredientCreationPageComponent,
	],
})
export class IngredientCreationPageModule { }