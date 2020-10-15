import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuCreationPageComponent } from './components/menu-creation-page/menu-creation-page.component';

/**
 * Module for the page where a kitchen site employee can create a new menu.
 */
@NgModule({
	declarations: [
		MenuCreationPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		MenuCreationPageComponent,
	],
})
export class MenuCreationPageModule { }