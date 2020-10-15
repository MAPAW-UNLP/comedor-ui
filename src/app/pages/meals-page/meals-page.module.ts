import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealsPageComponent } from './components/meals-page/meals-page.component';

/**
 * Module for the page where a kitchen site employee can see the list of all the meals.
 */
@NgModule({
	declarations: [
		MealsPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		MealsPageComponent,
	],
})
export class MealsPageModule { }