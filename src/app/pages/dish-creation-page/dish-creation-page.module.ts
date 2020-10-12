import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DishCreationPageComponent } from './components/dish-creation-page/dish-creation-page.component';

/**
 * Module for the page where a kitchen site employee can create ingredients.
 */
@NgModule({
	declarations: [
		DishCreationPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		DishCreationPageComponent,
	],
})
export class DishCreationPageModule { }