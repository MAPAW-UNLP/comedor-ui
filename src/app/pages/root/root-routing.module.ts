import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth/auth.guard';
import { NotFoundPageComponent } from '../not-found-page/components/not-found-page/not-found-page.component';
import { NotFoundPageModule } from '../not-found-page/not-found-page.module';
import { ProtectedPageComponent } from '../protected-page/components/protected-page/protected-page.component';
import { ProtectedPageModule } from '../protected-page/protected-page.module';
import { PublicPageComponent } from '../public-page/components/public-page/public-page.component';
import { PublicPageModule } from '../public-page/public-page.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: PublicPageComponent,
	},
	{
		path: 'protected-page',
		component: ProtectedPageComponent,
		canActivate: [
			AuthGuard,
		],
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
		PublicPageModule,
		ProtectedPageModule,
		NotFoundPageModule,
	],
	exports: [
		RouterModule,
	]
})
export class RootRoutingModule { }