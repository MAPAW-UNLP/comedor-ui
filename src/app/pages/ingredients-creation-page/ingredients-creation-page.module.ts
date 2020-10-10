import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientsCreationPageComponent } from './components/ingredients-creation-page/ingredients-creation-page.component';

/**
 * Module for the page where a kitchen site employee can create ingredients.
 */
@NgModule({
	declarations: [
		IngredientsCreationPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		IngredientsCreationPageComponent,
	],
})
export class IngredientsCreationPageModule { }