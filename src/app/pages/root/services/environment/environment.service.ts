import { Injectable } from '@angular/core';
import { Environment } from 'src/app/interfaces/environment.interface';
import { environment } from 'src/environments/environment';

/**
 * Service that provides access to the raw and processed environment variables of the current execution
 * environment.
 */
@Injectable({
	providedIn: 'root',
})
export class EnvironmentService {

	/**
	 * The current execution environment.
	 */
	public get environment( ): Environment {
		return environment;
	}

	/**
	 * Returns the value of the provided key in the current execution environment.
	 */
	public valueOf<T extends keyof Environment>( key: T ): Environment[ T ] {
		return environment[ key ];
	}

	/**
	 * Returns the URL of the endpoint associated to the provided resource name.
	 */
	public getEndpoint<T extends keyof Environment[ 'resourcePaths' ]>( resourceName: T ): string {
		return `${ environment.serverUrl.proxyPrefix }${ environment.resourcePaths[ resourceName ] }`;
	}

}