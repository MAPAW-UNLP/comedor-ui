import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { take } from 'rxjs/operators';
import { ConsumptionType } from 'src/app/enums/consumption-type.enum';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuCardComponent } from './menu-card.component';

// tslint:disable: no-magic-numbers

describe( 'MenuCardComponent', ( ) => {
	let component: MenuCardComponent;
	let fixture: ComponentFixture<MenuCardComponent>;

	beforeEach( async ( ) => {
		await TestBed
			.configureTestingModule({
				declarations: [
					MenuCardComponent,
				],
				imports: [
					SharedModule,
				],
				schemas: [
					CUSTOM_ELEMENTS_SCHEMA,
				],
			})
			.compileComponents( );
	});

	beforeEach( ( ) => {
		fixture = TestBed.createComponent( MenuCardComponent );
		component = fixture.componentInstance;
		fixture.detectChanges( );
	});

	it( 'should be created', async ( ) => {
		expect( component ).toBeTruthy( );
	});

	describe( 'thumbnail', ( ) => {

		it( 'should return it', async ( ) => {
			expect( component.thumbnailSource ).toEqual( undefined );
		});

		it( 'should update it', async ( ) => {
			component.thumbnailSource = 'a thumbnail source';
			fixture.detectChanges( );
			expect( component.thumbnailSource ).toEqual( 'a thumbnail source' );
		});

		it( 'should return whether it should be displayed or not', async ( ) => {
			expect( component.shouldDisplayThumbnail ).toEqual( false );

			component.thumbnailSource = 'a thumbnail source';
			fixture.detectChanges( );
			expect( component.shouldDisplayThumbnail ).toEqual( true );
		});

	});

	describe( 'card title', ( ) => {

		it( 'should return a default card title when it is not set', async ( ) => {
			expect( component.cardTitle ).toEqual( 'Menú sin nombre' );
		});

		it( 'should update it', async ( ) => {
			component.cardTitle = 'a card title';
			fixture.detectChanges( );
			expect( component.cardTitle ).toEqual( 'a card title' );
		});

	});

	describe( 'price', ( ) => {

		it( 'should return it', async ( ) => {
			expect( component.price ).toEqual( undefined );
		});

		it( 'should update it', async ( ) => {
			component.price = 100;
			fixture.detectChanges( );
			expect( component.price ).toEqual( 100 );
		});

		describe( 'price tag', ( ) => {

			it( 'should be undefined if the price is undefined', async ( ) => {
				expect( component.priceTag ).toEqual( undefined );
			});

			it( 'should include decimals for low prices', async ( ) => {
				component.price = 123456;
				fixture.detectChanges( );
				expect( component.priceTag ).toEqual( '$123456,00' );
			});

			it( 'should not include decimals for high prices', async ( ) => {
				component.price = 1234567;
				fixture.detectChanges( );
				expect( component.priceTag ).toEqual( '$1234567' );
			});

			it( 'should return whether it should be displayed or not', async ( ) => {
				expect( component.shouldDisplayPriceTag ).toEqual( false );

				component.price = 100;
				fixture.detectChanges( );
				expect( component.shouldDisplayPriceTag ).toEqual( true );
			});

		});

	});

	describe( 'date', ( ) => {

		it( 'should return it', async ( ) => {
			expect( component.date ).toEqual( undefined );
		});

		it( 'should update it', async ( ) => {
			component.date = '2021-01-01';
			fixture.detectChanges( );
			expect( component.date ).toEqual( '2021-01-01' );
		});

		it( 'should return whether it should be displayed or not', async ( ) => {
			expect( component.shouldDisplayDate ).toEqual( false );

			component.date = '2021-01-01';
			fixture.detectChanges( );
			expect( component.shouldDisplayDate ).toEqual( true );
		});

	});

	describe( 'kitchen site name', ( ) => {

		it( 'should return it', async ( ) => {
			expect( component.kitchenSiteName ).toEqual( undefined );
		});

		it( 'should update it', async ( ) => {
			component.kitchenSiteName = 'a kitchen site name';
			fixture.detectChanges( );
			expect( component.kitchenSiteName ).toEqual( 'a kitchen site name' );
		});

		it( 'should return whether it should be displayed or not', async ( ) => {
			expect( component.shouldDisplayKitchenSiteName ).toEqual( false );

			component.kitchenSiteName = 'a kitchen site name';
			fixture.detectChanges( );
			expect( component.shouldDisplayKitchenSiteName ).toEqual( true );
		});

	});

	describe( 'date and kitchen site name container', ( ) => {

		it( 'should return whether it should be displayed or not', async ( ) => {
			expect( component.shouldDisplayDateAndKitchenSiteName ).toEqual( false );

			component.date = undefined;
			component.kitchenSiteName = 'a kitchen site name';
			fixture.detectChanges( );
			expect( component.shouldDisplayDateAndKitchenSiteName ).toEqual( true );

			component.kitchenSiteName = undefined;
			component.date = '2021-01-01';
			fixture.detectChanges( );
			expect( component.shouldDisplayDateAndKitchenSiteName ).toEqual( true );

			component.kitchenSiteName = 'a kitchen site name';
			component.date = '2021-01-01';
			fixture.detectChanges( );
			expect( component.shouldDisplayDateAndKitchenSiteName ).toEqual( true );
		});

	});

	describe( 'minimum purchase anticipation', ( ) => {

		it( 'should return it', async ( ) => {
			expect( component.minimumPurchaseAnticipation ).toEqual( undefined );
		});

		it( 'should update it', async ( ) => {
			component.minimumPurchaseAnticipation = 2;
			fixture.detectChanges( );
			expect( component.minimumPurchaseAnticipation ).toEqual( 2 );
		});

		describe( 'minimum purchase anticipation label', ( ) => {

			it( 'should be undefined if the minimum purchase anticipation is undefined', async ( ) => {
				expect( component.minimumPurchaseAnticipationLabel ).toEqual( undefined );
			});

			it( 'should display a singularized label', async ( ) => {
				component.minimumPurchaseAnticipation = 1;
				fixture.detectChanges( );
				expect( component.minimumPurchaseAnticipationLabel ).toEqual(
					'1 día de anticipación mínima'
				);
			});

			it( 'should display a pluralized label', async ( ) => {
				component.minimumPurchaseAnticipation = 2;
				fixture.detectChanges( );
				expect( component.minimumPurchaseAnticipationLabel ).toEqual(
					'2 días de anticipación mínima'
				);
			});

			it( 'should return whether it should be displayed or not', async ( ) => {
				expect( component.shouldDisplayMinimumPurchaseAnticipationLabel ).toEqual( false );

				component.minimumPurchaseAnticipation = 1;
				fixture.detectChanges( );
				expect( component.shouldDisplayMinimumPurchaseAnticipationLabel ).toEqual( true );
			});

		});

	});

	describe( 'consumption type', ( ) => {

		it( 'should return it', async ( ) => {
			expect( component.consumptionType ).toEqual( undefined );
		});

		it( 'should update it', async ( ) => {
			component.consumptionType = ConsumptionType.OnSite;
			fixture.detectChanges( );
			expect( component.consumptionType ).toEqual( ConsumptionType.OnSite );

			component.consumptionType = ConsumptionType.Takeaway;
			fixture.detectChanges( );
			expect( component.consumptionType ).toEqual( ConsumptionType.Takeaway );
		});

		it( 'should return whether it should be displayed or not', async ( ) => {
			expect( component.shouldDisplayConsumptionTypeSelector ).toEqual( false );

			component.consumptionType = ConsumptionType.OnSite;
			fixture.detectChanges( );
			expect( component.shouldDisplayConsumptionTypeSelector ).toEqual( true );
		});

		describe( 'event emitter', ( ) => {

			it( 'should expose it', async ( ) => {
				expect( component.consumptionTypeChange ).toBeInstanceOf( EventEmitter );
			});

			it( 'should emit when a value is selected', async ( ) => {
				let valueEmitted: ConsumptionType | undefined = undefined;

				component.consumptionTypeChange
					.pipe(
						take( 1 ),
					)
					.subscribe( ( value: ConsumptionType ) => {
						valueEmitted = value;
					});
				const fakeEvent: MatButtonToggleChange = <MatButtonToggleChange> <unknown> {
					value: ConsumptionType.OnSite,
				};
				component.handleConsumptionTypeChange( fakeEvent );

				expect( valueEmitted ).toEqual( ConsumptionType.OnSite );
			});

		});

		it( 'should expose the options to display', async ( ) => {
			expect( component.consumptionTypeOptions ).toEqual([
				{
					value: ConsumptionType.Takeaway,
					label: 'Para retirar',
				},
				{
					value: ConsumptionType.OnSite,
					label: 'Para consumir en comedor',
				},
			]);
		});

	});

	describe( 'menu is in shopping cart', ( ) => {

		it( 'should be false by default when it is not defined', async ( ) => {
			expect( component.menuIsInShoppingCart ).toEqual( false );
		});

		it( 'should update it', async ( ) => {
			component.menuIsInShoppingCart = true;
			fixture.detectChanges( );
			expect( component.menuIsInShoppingCart ).toEqual( true );

			component.menuIsInShoppingCart = false;
			fixture.detectChanges( );
			expect( component.menuIsInShoppingCart ).toEqual( false );
		});

	});

	describe( 'another menu is in shopping cart in same date', ( ) => {

		it( 'should be false by default when it is not defined', async ( ) => {
			expect( component.anotherMenuIsInShoppingCartInSameDate ).toEqual( false );
		});

		it( 'should update it', async ( ) => {
			component.anotherMenuIsInShoppingCartInSameDate = true;
			fixture.detectChanges( );
			expect( component.anotherMenuIsInShoppingCartInSameDate ).toEqual( true );

			component.anotherMenuIsInShoppingCartInSameDate = false;
			fixture.detectChanges( );
			expect( component.anotherMenuIsInShoppingCartInSameDate ).toEqual( false );
		});

	});

	describe( 'should display cart action button', ( ) => {

		it( 'should be false by default when it is not defined', async ( ) => {
			expect( component.shouldDisplayCartActionButton ).toEqual( false );
		});

		it( 'should update it', async ( ) => {
			component.shouldDisplayCartActionButton = true;
			fixture.detectChanges( );
			expect( component.shouldDisplayCartActionButton ).toEqual( true );

			component.shouldDisplayCartActionButton = false;
			fixture.detectChanges( );
			expect( component.shouldDisplayCartActionButton ).toEqual( false );
		});

	});

	describe( '"View more" button', ( ) => {

		describe( 'event emitter', ( ) => {

			it( 'should expose it', async ( ) => {
				expect( component.viewMoreButtonClick ).toBeInstanceOf( EventEmitter );
			});

			it( 'should emit', async ( ) => {
				let aValueWasEmitted: boolean = false;

				component.viewMoreButtonClick
					.pipe(
						take( 1 ),
					)
					.subscribe( ( ) => {
						aValueWasEmitted = true;
					});
				component.handleViewMoreButtonClick( );

				expect( aValueWasEmitted ).toEqual( true );
			});

		});

	});

	describe( 'Cart action button', ( ) => {

		it( 'should expose its color', async ( ) => {
			component.menuIsInShoppingCart = true;
			fixture.detectChanges( );
			expect( component.cartActionButtonColor ).toEqual( 'warn' );

			component.menuIsInShoppingCart = false;
			fixture.detectChanges( );
			expect( component.cartActionButtonColor ).toEqual( 'accent' );
		});

		it( 'should expose its icon', async ( ) => {
			component.menuIsInShoppingCart = false;
			component.anotherMenuIsInShoppingCartInSameDate = false;
			fixture.detectChanges( );
			expect( component.cartActionButtonIcon ).toEqual( 'shopping_cart' );

			component.menuIsInShoppingCart = true;
			component.anotherMenuIsInShoppingCartInSameDate = false;
			fixture.detectChanges( );
			expect( component.cartActionButtonIcon ).toEqual( 'remove_shopping_cart' );

			component.menuIsInShoppingCart = false;
			component.anotherMenuIsInShoppingCartInSameDate = true;
			fixture.detectChanges( );
			expect( component.cartActionButtonIcon ).toEqual( 'cached' );
		});

		it( 'should expose its text', async ( ) => {
			component.menuIsInShoppingCart = false;
			component.anotherMenuIsInShoppingCartInSameDate = false;
			fixture.detectChanges( );
			expect( component.cartActionButtonText ).toEqual( 'Agregar al carro' );

			component.menuIsInShoppingCart = true;
			component.anotherMenuIsInShoppingCartInSameDate = false;
			fixture.detectChanges( );
			expect( component.cartActionButtonText ).toEqual( 'Eliminar del carro' );

			component.menuIsInShoppingCart = false;
			component.anotherMenuIsInShoppingCartInSameDate = true;
			fixture.detectChanges( );
			expect( component.cartActionButtonText ).toEqual( 'Reemplazar en carro' );
		});

		it( 'should handle a click event', async ( ) => {
			spyOn( component, 'handleAddToCartButtonClick' );
			spyOn( component, 'handleRemoveFromCartButtonClick' );
			spyOn( component, 'handleReplaceInCartButtonClick' );

			component.menuIsInShoppingCart = false;
			component.anotherMenuIsInShoppingCartInSameDate = false;
			fixture.detectChanges( );
			component.handleCartActionButtonClick( );
			expect( component.handleAddToCartButtonClick ).toHaveBeenCalledTimes( 1 );

			component.menuIsInShoppingCart = true;
			component.anotherMenuIsInShoppingCartInSameDate = false;
			fixture.detectChanges( );
			component.handleCartActionButtonClick( );
			expect( component.handleRemoveFromCartButtonClick ).toHaveBeenCalledTimes( 1 );

			component.menuIsInShoppingCart = false;
			component.anotherMenuIsInShoppingCartInSameDate = true;
			fixture.detectChanges( );
			component.handleCartActionButtonClick( );
			expect( component.handleReplaceInCartButtonClick ).toHaveBeenCalledTimes( 1 );
		});

		describe( '"Add to cart" button', ( ) => {

			describe( 'event emitter', ( ) => {

				it( 'should expose it', async ( ) => {
					expect( component.addToCartButtonClick ).toBeInstanceOf( EventEmitter );
				});

				it( 'should emit', async ( ) => {
					let aValueWasEmitted: boolean = false;

					component.addToCartButtonClick
						.pipe(
							take( 1 ),
						)
						.subscribe( ( ) => {
							aValueWasEmitted = true;
						});
					component.handleAddToCartButtonClick( );

					expect( aValueWasEmitted ).toEqual( true );
				});

			});

		});

		describe( '"Remove from cart" button', ( ) => {

			describe( 'event emitter', ( ) => {

				it( 'should expose it', async ( ) => {
					expect( component.removeFromCartButtonClick ).toBeInstanceOf( EventEmitter );
				});

				it( 'should emit', async ( ) => {
					let aValueWasEmitted: boolean = false;

					component.removeFromCartButtonClick
						.pipe(
							take( 1 ),
						)
						.subscribe( ( ) => {
							aValueWasEmitted = true;
						});
					component.handleRemoveFromCartButtonClick( );

					expect( aValueWasEmitted ).toEqual( true );
				});

			});

		});

		describe( '"Replace in cart" button', ( ) => {

			describe( 'event emitter', ( ) => {

				it( 'should expose it', async ( ) => {
					expect( component.replaceInCartButtonClick ).toBeInstanceOf( EventEmitter );
				});

				it( 'should emit', async ( ) => {
					let aValueWasEmitted: boolean = false;

					component.replaceInCartButtonClick
						.pipe(
							take( 1 ),
						)
						.subscribe( ( ) => {
							aValueWasEmitted = true;
						});
					component.handleReplaceInCartButtonClick( );

					expect( aValueWasEmitted ).toEqual( true );
				});

			});

		});

	});

});