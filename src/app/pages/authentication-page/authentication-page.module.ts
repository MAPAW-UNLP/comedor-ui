import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationPageComponent } from './components/authentication-page/authentication-page.component';

/**
 * Module for the authentication page.
 */
@NgModule({
	declarations: [
		AuthenticationPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
		DigitOnlyModule,
	],
	exports: [
		AuthenticationPageComponent,
	],
})
export class AuthenticationPageModule { }