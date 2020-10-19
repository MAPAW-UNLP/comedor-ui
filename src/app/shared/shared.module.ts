import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { WidgetsModule } from './modules/widgets/widgets.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
		MatMomentDateModule
	],
})
export class SharedModule { }