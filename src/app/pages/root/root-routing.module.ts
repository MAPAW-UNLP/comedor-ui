import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticatedClientRequiredGuard } from 'src/app/auth/guards/authenticated-client-required/authenticated-client-required.guard';
import { AuthenticatedKitchenSiteEmployeeRequiredGuard } from 'src/app/auth/guards/authenticated-kitchen-site-employee-required/authenticated-kitchen-site-employee-required.guard';
import { AuthenticatedUserForbiddenGuard } from 'src/app/auth/guards/authenticated-user-forbidden/authenticated-user-forbidden.guard';
import { AuthenticatedUserRequiredGuard } from 'src/app/auth/guards/authenticated-user-required/authenticated-user-required.guard';
import { HomePageRedirectorGuard } from 'src/app/auth/guards/home-page-redirector/home-page-redirector.guard';
import { ComedorUniversitarioRoutes } from 'src/app/interfaces/comedor-universitario-routes.interface';
import { AuthenticationPageModule } from '../authentication-page/authentication-page.module';
import { AuthenticationPageComponent } from '../authentication-page/components/authentication-page/authentication-page.component';
import { AvailableMealsPageModule } from '../available-meals-page/available-meals-page.module';
import { AvailableMealsPageComponent } from '../available-meals-page/components/available-meals-page/available-meals-page.component';
import { ClientOwnTicketsPageModule } from '../client-own-tickets-page/client-own-tickets-page.module';
import { ClientOwnTicketsPageComponent } from '../client-own-tickets-page/components/client-own-tickets-page/client-own-tickets-page.component';
import { EnabledMenusPageComponent } from '../enabled-menus-page/components/enabled-menus-page/enabled-menus-page.component';
import { EnabledMenusPageModule } from '../enabled-menus-page/enabled-menus-page.module';
import { NotFoundPageComponent } from '../not-found-page/components/not-found-page/not-found-page.component';
import { NotFoundPageModule } from '../not-found-page/not-found-page.module';
import { PlatformComponent } from '../platform/components/platform/platform.component';
import { PlatformModule } from '../platform/platform.module';

const routes: ComedorUniversitarioRoutes = [
	{
		path: 'ingresar',
		component: AuthenticationPageComponent,
		canActivate: [
			AuthenticatedUserForbiddenGuard,
		],
		data: {
			pageTitle: 'Ingresar',
		},
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
				canActivate: [
					HomePageRedirectorGuard,
				],
				component: NotFoundPageComponent,
				// No "data" object as this route won't be loaded because of the home page redirector guard.
			},
			{
				path: 'mis-tickets',
				component: ClientOwnTicketsPageComponent,
				canActivate: [
					AuthenticatedClientRequiredGuard,
				],
				data: {
					pageTitle: 'Mis tickets',
				},
			},
			{
				path: 'menus-disponibles',
				component: AvailableMealsPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Menús disponibles',
				},
			},
			{
				path: 'menus-habilitados',
				component: EnabledMenusPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Menús habilitados',
				},
			},
			{
				path: '404',
				component: NotFoundPageComponent,
				data: {
					pageTitle: 'Página no encontrada',
				},
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
		AuthenticationPageModule,
		PlatformModule,
		NotFoundPageModule,
		ClientOwnTicketsPageModule,
		AvailableMealsPageModule,
		EnabledMenusPageModule,
		RouterModule.forRoot( routes ),
	],
	exports: [
		RouterModule,
	],
})
export class RootRoutingModule { }