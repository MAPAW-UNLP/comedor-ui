import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProtectedPageComponent } from './components/protected-page/protected-page.component';

/**
 * Module for the public page displayed as the home.
 */
@NgModule({
	declarations: [
		ProtectedPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		ProtectedPageComponent,
	],
})
export class ProtectedPageModule { }