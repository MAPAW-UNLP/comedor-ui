import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

/**
 * Module for the "not found" page displayed on a routing error or unauthorized access.
 */
@NgModule({
	declarations: [
		NotFoundPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		NotFoundPageComponent,
	],
})
export class NotFoundPageModule { }