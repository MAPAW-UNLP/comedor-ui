import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvailableMealsPageComponent } from './components/available-meals-page/available-meals-page.component';

/**
 * Module for the page where a kitchen site employee can see and manage all the available meals.
 */
@NgModule({
	declarations: [
		AvailableMealsPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		AvailableMealsPageComponent,
	],
})
export class AvailableMealsPageModule { }