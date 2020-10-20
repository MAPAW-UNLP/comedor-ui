import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuShopPageComponent } from './components/menu-shop-page/menu-shop-page.component';

/**
 * Module for the page where a client can view all the menus available for purchasing.
 */
@NgModule({
	declarations: [
		MenuShopPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		MenuShopPageComponent,
	],
})
export class MenuShopPageModule { }