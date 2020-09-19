import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RaizModule } from './app/paginas/raiz/raiz.module';

// tslint:disable: no-console

platformBrowserDynamic( )
	.bootstrapModule( RaizModule )
	.catch( ( error: unknown ) => {
		console.error( error );
	});