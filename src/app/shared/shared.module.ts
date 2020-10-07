import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { WidgetsModule } from './modules/widgets/widgets.module';

/**
 * Module that exports all the reusable dependencies in the application.
 */
@NgModule({
	imports: [
		MaterialModule,
		WidgetsModule,
	],
	exports: [
		MaterialModule,
		WidgetsModule,
	],
})
export class SharedModule { }