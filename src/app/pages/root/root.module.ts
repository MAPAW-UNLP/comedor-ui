import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule } from 'src/app/auth/auth.module';
import { localStorageKeys } from 'src/app/constants/local-storage-keys.constant';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment.local';
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
		AuthModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: ( ): string | null => localStorage.getItem( localStorageKeys.accessToken ),
				allowedDomains: [ environment.serverUrl.domain ],
			},
		}),
		RootRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
	],
	bootstrap: [
		RootComponent,
	],
})
export class RootModule { }