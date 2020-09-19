import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';

/**
 * Módulo para la página de "página no encontrada" mostrada ante un error.
 */
@NgModule({
	declarations: [
		PaginaNoEncontradaComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		PaginaNoEncontradaComponent,
	],
})
export class PaginaNoEncontradaModule { }