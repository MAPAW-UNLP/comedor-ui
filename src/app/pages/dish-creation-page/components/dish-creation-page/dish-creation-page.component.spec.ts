import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishCreationPageComponent } from './dish-creation-page.component';

describe( 'DishCreationPageComponent', ( ) => {
	let component: DishCreationPageComponent;
	let fixture: ComponentFixture<DishCreationPageComponent>;

	beforeEach( async ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					DishCreationPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( DishCreationPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});