import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';

/**
 * Module that exports all the reusable dependencies in the application.
 */
@NgModule({
	imports: [
		MaterialModule,
	],
	exports: [
		MaterialModule,
	],
})
export class SharedModule { }