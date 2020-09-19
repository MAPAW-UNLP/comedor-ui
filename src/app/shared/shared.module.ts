import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';

/**
 * Module containing all the reusable dependencies of the app.
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