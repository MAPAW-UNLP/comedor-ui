import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MaterialModule } from '../material/material.module';

/**
 * Module that exports all the reusable dependencies in the application.
 */
@NgModule({
	declarations: [
		MenuCardComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
	],
	exports: [
		MenuCardComponent,
	],
})
export class WidgetsModule { }