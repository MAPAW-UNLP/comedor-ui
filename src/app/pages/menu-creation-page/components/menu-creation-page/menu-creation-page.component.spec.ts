import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCreationPageComponent } from './menu-creation-page.component';

describe( 'MenuCreationPageComponent', ( ) => {
	let component: MenuCreationPageComponent;
	let fixture: ComponentFixture<MenuCreationPageComponent>;

	beforeEach( async ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					MenuCreationPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( MenuCreationPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});