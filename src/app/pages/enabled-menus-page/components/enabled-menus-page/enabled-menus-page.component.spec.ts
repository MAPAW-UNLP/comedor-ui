import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnabledMenusPageComponent } from './enabled-menus-page.component';

describe( 'EnabledMenusPageComponent', ( ) => {
	let component: EnabledMenusPageComponent;
	let fixture: ComponentFixture<EnabledMenusPageComponent>;

	beforeEach( async ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					EnabledMenusPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( EnabledMenusPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});