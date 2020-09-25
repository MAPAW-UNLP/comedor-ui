import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProtectedPageComponent } from './protected-page.component';

describe( 'ProtectedPageComponent', ( ) => {
	let component: ProtectedPageComponent;
	let fixture: ComponentFixture<ProtectedPageComponent>;

	beforeEach( waitForAsync( ( ) => {
		TestBed
			.configureTestingModule({
				declarations: [
					ProtectedPageComponent,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	}));

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( ProtectedPageComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	test( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

});