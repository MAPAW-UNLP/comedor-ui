import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginaPublicaComponent } from './componentes/pagina-publica/pagina-publica.component';

/**
 * Módulo que representa una página no protegida por permisos que actúa como página principal.
 */
@NgModule({
	declarations: [
		PaginaPublicaComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		PaginaPublicaComponent,
	],
})
export class PaginaPublicaModule { }