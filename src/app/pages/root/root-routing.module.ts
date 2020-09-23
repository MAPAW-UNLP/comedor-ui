import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '../not-found-page/components/not-found-page/not-found-page.component';
import { NotFoundPageModule } from '../not-found-page/not-found-page.module';
import { PublicPageComponent } from '../public-page/components/public-page/public-page.component';
import { PublicPageModule } from '../public-page/pagina-publica.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: PublicPageComponent,
	},
	{
		path: '404',
		component: NotFoundPageComponent,
	},
	{
		path: '**',
		redirectTo: '/404',
	},
];

/**
 * Routing module for the root module.
 */
@NgModule({
	imports: [
		RouterModule.forRoot( routes ),
		NotFoundPageModule,
		PublicPageModule,
	],
	exports: [
		RouterModule,
	]
})
export class RootRoutingModule { }