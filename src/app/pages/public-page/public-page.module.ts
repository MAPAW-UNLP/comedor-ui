import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicPageComponent } from './components/public-page/public-page.component';

/**
 * Module for the public page displayed as the home.
 */
@NgModule({
	declarations: [
		PublicPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		PublicPageComponent,
	],
})
export class PublicPageModule { }