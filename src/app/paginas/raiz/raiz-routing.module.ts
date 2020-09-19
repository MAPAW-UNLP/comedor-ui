import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNoEncontradaComponent } from '../pagina-no-encontrada/componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { PaginaNoEncontradaModule } from '../pagina-no-encontrada/pagina-no-encontrada.module';
import { PaginaPublicaComponent } from '../pagina-publica/componentes/pagina-publica/pagina-publica.component';
import { PaginaPublicaModule } from '../pagina-publica/pagina-publica.module';

const rutas: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: PaginaPublicaComponent,
	},
	{
		path: '404',
		component: PaginaNoEncontradaComponent,
	},
	{
		path: '**',
		redirectTo: '/404',
	},
];

/**
 * Módulo de ruteo para el módulo raíz.
 */
@NgModule({
	imports: [
		RouterModule.forRoot( rutas ),
		PaginaNoEncontradaModule,
		PaginaPublicaModule,
	],
	exports: [
		RouterModule,
	]
})
export class RaizRoutingModule { }