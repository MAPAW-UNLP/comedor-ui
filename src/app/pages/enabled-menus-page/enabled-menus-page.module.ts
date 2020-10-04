import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnabledMenusPageComponent } from './components/enabled-menus-page/enabled-menus-page.component';

/**
 * Module for the page where a kitchen site employee can see and manage all the enabled menus.
 */
@NgModule({
	declarations: [
		EnabledMenusPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		EnabledMenusPageComponent,
	],
})
export class EnabledMenusPageModule { }