import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Module responsible for the authentication and authorization of the application's users.
 */
@NgModule({
	imports: [
		HttpClientModule,
		RouterModule,
	],
})
export class AuthModule { }