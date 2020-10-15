import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenusPageComponent } from './components/menus-page/menus-page.component';

/**
 * Module for the page where a kitchen site employee can see the list of all the menus.
 */
@NgModule({
	declarations: [
		MenusPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		MenusPageComponent,
	],
})
export class MenusPageModule { }