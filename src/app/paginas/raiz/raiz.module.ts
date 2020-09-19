import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaizComponent } from './componentes/raiz/raiz.component';
import { RaizRoutingModule } from './raiz-routing.module';

/**
 * Módulo raíz.
 */
@NgModule({
	declarations: [
		RaizComponent,
	],
	imports: [
		BrowserModule,
		AuthModule.forRoot( ),
		RaizRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
	],
	providers: [

	],
	bootstrap: [
		RaizComponent,
	],
})
export class RaizModule { }