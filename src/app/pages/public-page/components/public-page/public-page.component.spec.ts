import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PublicPageComponent } from './public-page.component';

describe( 'PublicPageComponent', ( ) => {
	let component: PublicPageComponent;
	let fixture: ComponentFixture<PublicPageComponent>;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					PublicPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	}));

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( PublicPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});