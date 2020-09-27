import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserForbiddenGuard } from 'src/app/auth/guards/authenticated-user-forbidden/authenticated-user-forbidden';
import { AuthenticatedUserRequiredGuard } from 'src/app/auth/guards/authenticated-user-required/authenticated-user-required';
import { AuthenticationPageModule } from '../authentication-page/authentication-page.module';
import { AuthenticationPageComponent } from '../authentication-page/components/authentication-page/authentication-page.component';
import { NotFoundPageComponent } from '../not-found-page/components/not-found-page/not-found-page.component';
import { NotFoundPageModule } from '../not-found-page/not-found-page.module';
import { PlatformComponent } from '../platform/components/platform/platform.component';
import { PlatformModule } from '../platform/platform.module';
import { ProtectedPageComponent } from '../protected-page/components/protected-page/protected-page.component';
import { ProtectedPageModule } from '../protected-page/protected-page.module';
import { PublicPageComponent } from '../public-page/components/public-page/public-page.component';
import { PublicPageModule } from '../public-page/public-page.module';

const routes: Routes = [
	{
		path: 'ingresar',
		component: AuthenticationPageComponent,
		canActivate: [
			AuthenticatedUserForbiddenGuard,
		],
	},
	{
		path: '',
		pathMatch: 'prefix',
		component: PlatformComponent,
		canActivate: [
			AuthenticatedUserRequiredGuard,
		],
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: PublicPageComponent,
			},
			{
				path: 'protected-page',
				component: ProtectedPageComponent,
			},
			{
				path: '404',
				component: NotFoundPageComponent,
			},
		],
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
		PublicPageModule,
		AuthenticationPageModule,
		ProtectedPageModule,
		NotFoundPageModule,
		PlatformModule,
		RouterModule.forRoot( routes ),
	],
	exports: [
		RouterModule,
	],
})
export class RootRoutingModule { }