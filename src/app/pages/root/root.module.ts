import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RootComponent } from './components/root/root.component';
import { RootRoutingModule } from './root-routing.module';

/**
 * Root module of the Angular application.
 */
@NgModule({
	declarations: [
		RootComponent,
	],
	imports: [
		BrowserModule,
		AuthModule.forRoot( ),
		RootRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
	],
	bootstrap: [
		RootComponent,
	],
})
export class RootModule { }