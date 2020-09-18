import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from 'src/app/auth/auth.module';
import { ButtonModule } from 'src/app/widgets/button/button.module';
import { RootComponent } from './components/root/root.component';
import { RootRoutingModule } from './root-routing.module';

/**
 * Root module.
 */
@NgModule({
	declarations: [
		RootComponent,
	],
	imports: [
		BrowserModule,
		AuthModule.forRoot( ),
		RootRoutingModule,
		ButtonModule,
	],
	providers: [

	],
	bootstrap: [
		RootComponent,
	],
})
export class RootModule { }