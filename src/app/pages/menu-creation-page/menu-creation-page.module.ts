import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuCreationPageCTRLComponent } from './components/menu-creation-page-ctrl/menu-creation-page-ctrl.component';
import { MenuCreationPageTESTComponent } from './components/menu-creation-page-test/menu-creation-page-test.component';
import { MenuCreationPageComponent } from './components/menu-creation-page/menu-creation-page.component';

/**
 * Module for the page where a kitchen site employee can create a new menu.
 */
@NgModule({
	declarations: [
		MenuCreationPageComponent,
		MenuCreationPageCTRLComponent,
		MenuCreationPageTESTComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [
		MenuCreationPageComponent,
	],
})
export class MenuCreationPageModule { }