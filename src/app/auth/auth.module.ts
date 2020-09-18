import { ModuleWithProviders, NgModule } from '@angular/core';

/**
 * Module responsible for the authentication and authorization of users in the app.
 */
@NgModule( )
export class AuthModule {

	/**
	 * Returns an instance of the AuthModule loaded with the providers for the current execution environment.
	 */
	public static forRoot( ): ModuleWithProviders<AuthModule> {
		return {
			ngModule: AuthModule,
			providers: [
				// DO: Add custom HttpInterceptor to include authorization token in outbound requests
				// DO: Add custom guards for authorization checking
			],
		};
	}

}