import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';

describe( 'NotFoundComponent', ( ) => {
	let component: NotFoundComponent;
	let fixture: ComponentFixture<NotFoundComponent>;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					NotFoundComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	}));

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( NotFoundComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});