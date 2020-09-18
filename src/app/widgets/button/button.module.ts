import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';

/**
 * Module for the button widget.
 */
@NgModule({
	declarations: [
		ButtonComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		ButtonComponent,
	],
})
export class ButtonModule { }