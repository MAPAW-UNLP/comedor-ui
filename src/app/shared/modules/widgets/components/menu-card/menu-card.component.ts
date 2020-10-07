import { Component } from '@angular/core';

@Component({
	selector: 'cu-menu-card',
	templateUrl: './menu-card.component.html',
	styleUrls: [ './menu-card.component.scss' ],
})
export class MenuCardComponent {

	// DO: Implement thumbnail source getter in menu card.
	/**
	 * The value for the `src` attribute of the card's thumbnail image.
	 */
	public get thumbnailSource( ): string {
		return '';
	}

	// DO: Implement title getter in menu card.
	/**
	 * The title of the card, which should represent the name of the offered meal.
	 */
	public get title( ): string {
		return 'Milanesa de ternera marinera con ensalada de lechuga y tomate + panqueques';
	}

	// DO: Implement price tag getter in menu card.
	/**
	 * The price tag of the card.
	 */
	public get priceTag( ): string {
		return '$100,00';
	}

	// DO: Implement menu date getter in menu card.
	/**
	 * The date of the menu associated to the card.
	 */
	public get date( ): string {
		return '2020-10-08';
	}

	// DO: Implement kitchen site name getter in menu card.
	/**
	 * The name of the kitchen site of the menu associated to the card.
	 */
	public get kitchenSiteName( ): string {
		return 'Bosque Este';
	}

	// DO: Implement getter to check if the menu is in already in the cart in the menu card.
	/**
	 * It's _true_ if the menu associated to the menu card is already in the shopping cart and _false_
	 * otherwise.
	 */
	public get menuIsInShoppingCart( ): boolean {
		return false;
	}

	// DO: Implement getter to check if another menu is already in the cart in the menu card.
	/**
	 * It's _true_ if another menu is already in the cart for the same date as the one associated to the menu
	 * card, and _false_ otherwise.
	 */
	public get anotherMenuIsInShoppingCart( ): boolean {
		return false;
	}

	/**
	 * The Material color used for the cart action button of the card.
	 *
	 * It depends on whether the menu associated to the card or another in the same date already is in the
	 * shopping cart.
	 */
	public get cartButtonColor( ): string {
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
	public get cartButtonIcon( ): string {
		return this.menuIsInShoppingCart
			? 'remove_shopping_cart'
			: this.anotherMenuIsInShoppingCart
				? 'shopping_cart'
				: 'shopping_cart';
	}


	/**
	 * The text used for the cart action button of the card.
	 *
	 * It depends on whether the menu associated to the card or another in the same date already is in the
	 * shopping cart.
	 */
	public get cartButtonText( ): string {
		return this.menuIsInShoppingCart
			? 'Eliminar del carro'
			: this.anotherMenuIsInShoppingCart
				? 'Reemplazar en carro'
				: 'Agregar al carro';
	}

}