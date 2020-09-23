import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootModule } from './app/pages/root/root.module';

// tslint:disable: no-console

platformBrowserDynamic( )
	.bootstrapModule( RootModule )
	.catch( ( error: unknown ) => {
		console.error( error );
	});