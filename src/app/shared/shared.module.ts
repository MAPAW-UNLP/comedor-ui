import { NgModule } from '@angular/core';
import { MaterialModule } from './modulos/material/material.module';

/**
 * Modulo que exporta todas las dependencias reutilizables de la app.
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