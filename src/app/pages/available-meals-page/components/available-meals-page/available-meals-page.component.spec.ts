import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableMealsPageComponent } from './available-meals-page.component';

describe( 'AvailableMealsPageComponent', ( ) => {
	let component: AvailableMealsPageComponent;
	let fixture: ComponentFixture<AvailableMealsPageComponent>;

	beforeEach( async ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					AvailableMealsPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( AvailableMealsPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});