import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootModule } from './app/pages/root/root.module';

// tslint:disable: no-console

registerLocaleData( localeEsAR, 'es-AR' );

platformBrowserDynamic( )
	.bootstrapModule( RootModule )
	.catch( ( error: unknown ) => {
		console.error( error );
	});