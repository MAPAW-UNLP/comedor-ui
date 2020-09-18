import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/components/not-found/not-found.component';
import { NotFoundModule } from '../not-found/not-found.module';
import { PublicPageComponent } from '../public-page/components/public-page/public-page.component';
import { PublicPageModule } from '../public-page/public-page.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: PublicPageComponent,
	},
	{
		path: '404',
		component: NotFoundComponent,
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
		NotFoundModule,
		PublicPageModule,
	],
	exports: [
		RouterModule,
	]
})
export class RootRoutingModule { }