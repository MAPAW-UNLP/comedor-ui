import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientOwnTicketsPageComponent } from './client-own-tickets-page.component';

describe( 'ClientOwnTicketsPageComponent', ( ) => {
	let component: ClientOwnTicketsPageComponent;
	let fixture: ComponentFixture<ClientOwnTicketsPageComponent>;

	beforeEach( async ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					ClientOwnTicketsPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( ClientOwnTicketsPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});