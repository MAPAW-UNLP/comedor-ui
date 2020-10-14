import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
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
		SharedModule,
	],
	exports: [
		DishCreationPageComponent,
	],
})
export class DishCreationPageModule { }