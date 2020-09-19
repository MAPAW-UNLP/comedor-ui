import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PaginaPublicaComponent } from './pagina-publica.component';

describe( 'PaginaPublicaComponent', ( ) => {
	let component: PaginaPublicaComponent;
	let fixture: ComponentFixture<PaginaPublicaComponent>;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					PaginaPublicaComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	}));

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( PaginaPublicaComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'debería ser creado', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});