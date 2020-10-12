import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ConsumptionType } from 'src/app/enums/consumption-type.enum';
import { ConsumptionTypeOption } from './interfaces/consumption-type-option.interface';

/**
 * Dumb component used to display a menu (or meal) in a card list.
 *
 * Its appearance and behavior can be configured via bindings.
 */
@Component({
	selector: 'cu-menu-card',
	templateUrl: './menu-card.component.html',
	styleUrls: [ './menu-card.component.scss' ],
})
export class MenuCardComponent {
	private _thumbnailSource: string | undefined;
	private _cardTitle: string | undefined;
	private _price: number | undefined;
	private _date: string | undefined;
	private _kitchenSiteName: string | undefined;
	private _minimumPurchaseAnticipation: number | undefined;
	private _consumptionType: ConsumptionType | undefined;
	private _menuIsInShoppingCart: boolean | undefined;
	private _anotherMenuIsInShoppingCartInSameDate: boolean | undefined;
	private _shouldDisplayCartActionButton: boolean | undefined;

	private readonly _consumptionTypeChange = new EventEmitter<ConsumptionType>( );
	private readonly _viewMoreButtonClick = new EventEmitter<void>( );
	private readonly _addToCartButtonClick = new EventEmitter<void>( );
	private readonly _removeFromCartButtonClick = new EventEmitter<void>( );
	private readonly _replaceInCartButtonClick = new EventEmitter<void>( );

	private readonly _consumptionTypeOptions: ConsumptionTypeOption[ ] = [
		{
			value: ConsumptionType.Takeaway,
			label: 'Para retirar',
		},
		{
			value: ConsumptionType.OnSite,
			label: 'Para consumir en comedor',
		},
	];

	/**
	 * The value for the `src` attribute of the card's thumbnail image.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get thumbnailSource( ): string | undefined {
		return this._thumbnailSource;
	}
	@Input( )
	public set thumbnailSource( value: string | undefined ) {
		this._thumbnailSource = value;
	}

	/**
	 * The title of the card.
	 *
	 * If it's not present, it's _undefined_.
	 *
	 * It should represent the name of the meal associated to the card, or to the menu associated to the card.
	 */
	public get cardTitle( ): string | undefined {
		return this._cardTitle ?? 'Menú sin nombre';
	}
	@Input( )
	public set cardTitle( value: string | undefined ) {
		this._cardTitle = value;
	}

	/**
	 * The unit price of the menu associated to the card.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get price( ): number | undefined {
		return this._price;
	}
	@Input( )
	public set price( value: number | undefined ) {
		this._price = value;
	}

	/**
	 * The date of the menu associated to the card, if applicable.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get date( ): string | undefined {
		return this._date;
	}
	@Input( )
	public set date( value: string | undefined ) {
		this._date = value;
	}

	/**
	 * The name of the kitchen site of the menu associated to the card, if applicable.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get kitchenSiteName( ): string | undefined {
		return this._kitchenSiteName;
	}
	@Input( )
	public set kitchenSiteName( value: string | undefined ) {
		this._kitchenSiteName = value;
	}

	/**
	 * The minimum amount of days before the due date of a menu allowed for purchases.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get minimumPurchaseAnticipation( ): number | undefined {
		return this._minimumPurchaseAnticipation;
	}
	@Input( )
	public set minimumPurchaseAnticipation( value: number | undefined ) {
		this._minimumPurchaseAnticipation = value;
	}

	/**
	 * The consumption type of the menu associated to the card, if applicable.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get consumptionType( ): ConsumptionType | undefined {
		return this._consumptionType;
	}
	@Input( )
	public set consumptionType( value: ConsumptionType | undefined ) {
		this._consumptionType = value;
	}

	/**
	 * It's _true_ if the menu associated to the card is already in the shopping cart and _false_ otherwise.
	 *
	 * If it's not present, it's _false_ by default.
	 */
	public get menuIsInShoppingCart( ): boolean | undefined {
		return this._menuIsInShoppingCart ?? false;
	}
	@Input( )
	public set menuIsInShoppingCart( value: boolean | undefined ) {
		this._menuIsInShoppingCart = value;
	}

	/**
	 * It's _true_ if another menu is already in the cart for the same date as the one associated to the card
	 * and _false_ otherwise.
	 *
	 * If it's not present, it's _false_ by default.
	 */
	public get anotherMenuIsInShoppingCartInSameDate( ): boolean | undefined {
		return this._anotherMenuIsInShoppingCartInSameDate ?? false;
	}
	@Input( )
	public set anotherMenuIsInShoppingCartInSameDate( value: boolean | undefined ) {
		this._anotherMenuIsInShoppingCartInSameDate = value;
	}

	/**
	 * It's _true_ if another menu is already in the cart for the same date as the one associated to the card
	 * and _false_ otherwise.
	 *
	 * If it's not present, it's _false_ by default.
	 */
	public get shouldDisplayCartActionButton( ): boolean | undefined {
		return this._shouldDisplayCartActionButton ?? false;
	}
	@Input( )
	public set shouldDisplayCartActionButton( value: boolean | undefined ) {
		this._shouldDisplayCartActionButton = value;
	}

	/**
	 * The price tag of the card.
	 *
	 * It should reprensent the unit price of the menu associated to the card, if applicable.
	 *
	 * If it's not present, it's _undefined_.
	 *
	 * It shows or hides the decimals depending on how large the price tag is.
	 */
	public get priceTag( ): string | undefined {
		const maximumRepresentablePrice = 999999;

		return ( this.price === undefined )
			? undefined
			: ( this.price <= maximumRepresentablePrice )
				? `$${ this.price },00`
				: `$${ this.price }`;
	}

	/**
	 * The displayed label for the minimum amount of days available to purchase the item associated to the card
	 * before it's due date.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get minimumPurchaseAnticipationLabel( ): string | undefined {
		return ( this.minimumPurchaseAnticipation === undefined )
			? undefined
			: ( this.minimumPurchaseAnticipation === 1 )
				? `${ this.minimumPurchaseAnticipation } día de anticipación mínima`
				: `${ this.minimumPurchaseAnticipation } días de anticipación mínima`;
	}

	/**
	 * It's _true_ if the card should display the provided thumbnail and _false_ if the card should display a
	 * placeholder instead.
	 */
	public get shouldDisplayThumbnail( ): boolean {
		return this.thumbnailSource !== undefined;
	}

	/**
	 * It's _true_ if the card should display the price tag and _false_ otherwise.
	 */
	public get shouldDisplayPriceTag( ): boolean {
		return this.price !== undefined;
	}

	/**
	 * It's _true_ if the card should display the date and _false_ otherwise.
	 */
	public get shouldDisplayDate( ): boolean {
		return this.date !== undefined;
	}

	/**
	 * It's _true_ if the card should display the kitchen site name and _false_ otherwise.
	 */
	public get shouldDisplayKitchenSiteName( ): boolean {
		return this.kitchenSiteName !== undefined;
	}

	/**
	 * It's _true_ if the card should display the metadata container for the date and kitchen site name and
	 * _false_ otherwise.
	 */
	public get shouldDisplayDateAndKitchenSiteName( ): boolean {
		return this.shouldDisplayDate || this.shouldDisplayKitchenSiteName;
	}

	/**
	 * It's _true_ if the card should display the minimum purchase anticipation label and _false_ otherwise.
	 */
	public get shouldDisplayMinimumPurchaseAnticipationLabel( ): boolean {
		return this.minimumPurchaseAnticipation !== undefined;
	}

	/**
	 * It's _true_ if the card should display the consumption type selector and _false_ otherwise.
	 */
	public get shouldDisplayConsumptionTypeSelector( ): boolean {
		return this.consumptionType !== undefined;
	}

	/**
	 * The Material color used for the cart action button of the card.
	 *
	 * It depends on whether the menu associated to the card or another in the same date already is in the
	 * shopping cart.
	 */
	public get cartActionButtonColor( ): string {
		return this.menuIsInShoppingCart
			? 'warn'
			: 'accent';
	}

	/**
	 * The icon used for the cart action button of the card.
	 *
	 * It depends on whether the menu associated to the card or another in the same date already is in the
	 * shopping cart.
	 */
	public get cartActionButtonIcon( ): string {
		return this.menuIsInShoppingCart
			? 'remove_shopping_cart'
			: this.anotherMenuIsInShoppingCartInSameDate
				? 'cached'
				: 'shopping_cart';
	}

	/**
	 * The text used for the cart action button of the card.
	 *
	 * It depends on whether the menu associated to the card or another in the same date already is in the
	 * shopping cart.
	 */
	public get cartActionButtonText( ): string {
		return this.menuIsInShoppingCart
			? 'Eliminar del carro'
			: this.anotherMenuIsInShoppingCartInSameDate
				? 'Reemplazar en carro'
				: 'Agregar al carro';
	}

	/**
	 * The event emitter for consumption type changes.
	 */
	@Output( )
	public get consumptionTypeChange( ): EventEmitter<ConsumptionType> {
		return this._consumptionTypeChange;
	}

	/**
	 * The event emitter for clicks on the "View more" button.
	 */
	@Output( )
	public get viewMoreButtonClick( ): EventEmitter<void> {
		return this._viewMoreButtonClick;
	}

	/**
	 * The event emitter for clicks on the "Add to cart" button.
	 */
	@Output( )
	public get addToCartButtonClick( ): EventEmitter<void> {
		return this._addToCartButtonClick;
	}

	/**
	 * The event emitter for clicks on the "Remove from cart" button.
	 */
	@Output( )
	public get removeFromCartButtonClick( ): EventEmitter<void> {
		return this._removeFromCartButtonClick;
	}

	/**
	 * The event emitter for clicks on the "Replace in cart" button.
	 */
	@Output( )
	public get replaceInCartButtonClick( ): EventEmitter<void> {
		return this._replaceInCartButtonClick;
	}

	/**
	 * The list of options for consumption type selection in the card.
	 */
	public get consumptionTypeOptions( ): ConsumptionTypeOption[ ] {
		return this._consumptionTypeOptions;
	}

	/**
	 * Handles the event of a change in the consumption type by reemitting it to the user of the card through
	 * the consumptionTypeChange event emitter.
	 */
	public handleConsumptionTypeChange( event: MatButtonToggleChange ): void {
		this.consumptionTypeChange.emit( event.value );
	}

	/**
	 * Handles the event of a click in the "View more" button by reemitting it to the user of the card through
	 * the viewMoreButtonClick event emitter.
	 */
	public handleViewMoreButtonClick( ): void {
		this.viewMoreButtonClick.emit( undefined );
	}

	/**
	 * Handles the event of a click in the cart action button and, depending on whether or not the menu
	 * associated to the card is in the shopping cart, or another menu is for the same date, it delegates the
	 * handling to the corresponding handler.
	 */
	public handleCartActionButtonClick( ): void {
		if ( this.menuIsInShoppingCart ) {
			this.handleRemoveFromCartButtonClick( );
		}
		else if ( this.anotherMenuIsInShoppingCartInSameDate ) {
			this.handleReplaceInCartButtonClick( );
		}
		else {
			this.handleAddToCartButtonClick( );
		}
	}

	/**
	 * Handles the event of a click in the "Add to cart" button by reemitting it to the user of the card
	 * through the viewMoreButtonClick event emitter.
	 */
	public handleAddToCartButtonClick( ): void {
		this.addToCartButtonClick.emit( undefined );
	}

	/**
	 * Handles the event of a click in the "Remove from cart" button by reemitting it to the user of the card
	 * through the viewMoreButtonClick event emitter.
	 */
	public handleRemoveFromCartButtonClick( ): void {
		this.removeFromCartButtonClick.emit( undefined );
	}

	/**
	 * Handles the event of a click in the "Replace in cart" button by reemitting it to the user of the card
	 * through the viewMoreButtonClick event emitter.
	 */
	public handleReplaceInCartButtonClick( ): void {
		this.replaceInCartButtonClick.emit( undefined );
	}

}