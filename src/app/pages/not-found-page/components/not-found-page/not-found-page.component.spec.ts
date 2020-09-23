import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotFoundPageComponent } from './not-found-page.component';

describe( 'NotFoundPageComponent', ( ) => {
	let component: NotFoundPageComponent;
	let fixture: ComponentFixture<NotFoundPageComponent>;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					NotFoundPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	}));

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( NotFoundPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});