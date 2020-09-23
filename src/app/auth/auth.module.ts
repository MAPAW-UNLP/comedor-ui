import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

/**
 * Module responsible for the authentication and authorization of the application's users.
 */
@NgModule({
	imports: [
		HttpClientModule,
	],
})
export class AuthModule {

	/**
	 * Returns an instance of AuthModule loaded with the providers required in the current environment.
	 */
	public static forRoot( ): ModuleWithProviders<AuthModule> {
		return {
			ngModule: AuthModule,
			providers: [
				// DO: Add interceptor to include the access token in outbound HTTP requests
				// DO: Add guards for validation of authorization
			],
		};
	}

}