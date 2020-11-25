import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticatedClientRequiredGuard } from 'src/app/auth/guards/authenticated-client-required/authenticated-client-required.guard';
import { AuthenticatedKitchenSiteEmployeeRequiredGuard } from 'src/app/auth/guards/authenticated-kitchen-site-employee-required/authenticated-kitchen-site-employee-required.guard';
import { AuthenticatedUserForbiddenGuard } from 'src/app/auth/guards/authenticated-user-forbidden/authenticated-user-forbidden.guard';
import { AuthenticatedUserRequiredGuard } from 'src/app/auth/guards/authenticated-user-required/authenticated-user-required.guard';
import { HomePageRedirectorGuard } from 'src/app/auth/guards/home-page-redirector/home-page-redirector.guard';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import { ComedorUniversitarioRoutes } from 'src/app/interfaces/comedor-universitario-routes.interface';
import { AuthenticationPageModule } from '../authentication-page/authentication-page.module';
import { AuthenticationPageComponent } from '../authentication-page/components/authentication-page/authentication-page.component';
import { DishCreationPageComponent } from '../dish-creation-page/components/dish-creation-page/dish-creation-page.component';
import { DishCreationPageModule } from '../dish-creation-page/dish-creation-page.module';
import { IngredientCreationPageComponent } from '../ingredient-creation-page/components/ingredient-creation-page/ingredient-creation-page.component';
import { IngredientCreationPageModule } from '../ingredient-creation-page/ingredient-creation-page.module';
import { MealCreationPageComponent } from '../meal-creation-page/components/meal-creation-page/meal-creation-page.component';
import { MealCreationPageModule } from '../meal-creation-page/meal-creation-page.module';
import { MealDetailPageComponent } from '../meal-detail-page/components/meal-detail-page/meal-detail-page.component';
import { MealDetailPageModule } from '../meal-detail-page/meal-detail-page.module';
import { MealsPageComponent } from '../meals-page/components/meals-page/meals-page.component';
import { MealsPageModule } from '../meals-page/meals-page.module';
import { MenuCreationPageComponent } from '../menu-creation-page/components/menu-creation-page/menu-creation-page.component';
import { MenuCreationPageModule } from '../menu-creation-page/menu-creation-page.module';
import { MenuShopPageComponent } from '../menu-shop-page/components/menu-shop-page/menu-shop-page.component';
import { MenuShopPageModule } from '../menu-shop-page/menu-shop-page.module';
import { MenusPageComponent } from '../menus-page/components/menus-page/menus-page.component';
import { MenusPageModule } from '../menus-page/menus-page.module';
import { NotFoundPageComponent } from '../not-found-page/components/not-found-page/not-found-page.component';
import { NotFoundPageModule } from '../not-found-page/not-found-page.module';
import { PlatformComponent } from '../platform/components/platform/platform.component';
import { PlatformModule } from '../platform/platform.module';
import { PurchasedTicketsPageComponent } from '../purchased-tickets-page/components/purchased-tickets-page/purchased-tickets-page.component';
import { PurchasedTicketsPageModule } from '../purchased-tickets-page/purchased-tickets-page.module';
import { ShoppingCartPageComponent } from '../shopping-cart-page/components/shopping-cart-page/shopping-cart-page.component';
import { ShoppingCartPageModule } from '../shopping-cart-page/shopping-cart-page.module';
import { TicketExchangePageComponent } from '../ticket-exchange-page/components/ticket-exchange-page/ticket-exchange-page.component';
import { TicketExchangePageModule } from '../ticket-exchange-page/ticket-exchange-page.module';


const routes: ComedorUniversitarioRoutes = [
	{
		path: PageUrls.authenticationPage,
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
				path: PageUrls.myTickets,
				component: PurchasedTicketsPageComponent,
				canActivate: [
					AuthenticatedClientRequiredGuard,
				],
				data: {
					pageTitle: 'Mis tickets',
				},
			},
			{
				path: 'carro-de-compras',
				component: ShoppingCartPageComponent,
				canActivate: [
					AuthenticatedClientRequiredGuard,
				],
				data: {
					pageTitle: 'Carro de compras',
				},
			},
			{
				path: PageUrls.buyTickets,
				component: MenuShopPageComponent,
				canActivate: [
					AuthenticatedClientRequiredGuard,
				],
				data: {
					pageTitle: 'Comprar tickets',
				},
			},
			{
				path: PageUrls.enabledMenusList,
				component: MenuShopPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Menús habilitados',
				},
			},
			{
				path: PageUrls.enableMenu,
				component: MenuCreationPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Habilitar menú',
				},
			},
			{
				path: PageUrls.menusList,
				component: MealsPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Listado de menús',
				},
			},
			{
				path: PageUrls.createMenu,
				component: MealCreationPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Crear Menú',
				},
			},
			{
				path: PageUrls.menuDetail,
				component: MealDetailPageComponent,
				canActivate: [
					AuthenticatedUserRequiredGuard,
				],
				data: {
					pageTitle: 'Detalle de menú',
				},
			},
			{
				path: PageUrls.createDish,
				component: DishCreationPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Crear plato',
				},
			},
			{
				path: PageUrls.createIngredient,
				component: IngredientCreationPageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Crear ingrediente',
				},
			},
			{
				path: PageUrls.ticketExchange,
				component: TicketExchangePageComponent,
				canActivate: [
					AuthenticatedKitchenSiteEmployeeRequiredGuard,
				],
				data: {
					pageTitle: 'Canjear tickets',
				},
			},
			{
				path: PageUrls.pageNotFound,
				component: NotFoundPageComponent,
				data: {
					pageTitle: 'Página no encontrada',
				},
			},
		],
	},
	{
		path: '**',
		redirectTo: PageUrls.pageNotFound,
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
		PurchasedTicketsPageModule,
		ShoppingCartPageModule,
		MenuShopPageModule,
		MenusPageModule,
		MenuCreationPageModule,
		MealsPageModule,
		MealCreationPageModule,
		MealDetailPageModule,
		DishCreationPageModule,
		IngredientCreationPageModule,
		TicketExchangePageModule,
		RouterModule.forRoot( routes ),
	],
	exports: [
		RouterModule,
	],
})
export class RootRoutingModule { }