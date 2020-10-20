import { Injectable } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { menuBuilderFromStorage } from 'src/app/shared/utils/menu-builder';

@Injectable({
	providedIn: 'root',
})
export class CartService {

	private readonly CART_KEY = 'CART';
	private cartState: Menu[] = [];

	public constructor() {
		let cart: Menu[];
		const rawCart: string | null = window.sessionStorage.getItem(this.CART_KEY);
		if (rawCart === null) {
			cart = [];
			this.persistCartOnSession(cart);
		} else {
			try {
				cart = menuBuilderFromStorage(JSON.parse(rawCart));
			}
			catch {
				cart = [];
				this.persistCartOnSession(cart);
			}
		}
		this.cartState = cart;
	}

	public add(menu: Menu): Menu[] {
		if (this.isInCart(menu)) {
			return this.cartState;
		}
		this.cartState = this.cartState.concat([menu]);
		this.persistCartOnSession(this.cartState);
		return this.cartState;
	}

	public remove(menuId: string): Menu[] {
		this.removeWithoutPersistOnStorage(menuId);
		this.persistCartOnSession(this.cartState);
		return this.cartState;
	}

	public replace(menu: Menu): Menu[] {
		const target: Menu | undefined = this.getReplacementFor(menu);
		if (target) {
			this.removeWithoutPersistOnStorage(target.id);
			this.add(menu);
		}
		return this.cartState;
	}

	public empty(): Menu[] {
		this.cartState = [];
		this.persistCartOnSession(this.cartState);
		return this.cartState;
	}

	public updateMenu(menu: Menu): Menu[] {
		if (this.isInCart(menu)) {
			this.removeWithoutPersistOnStorage(menu.id);
			return this.add(menu);
		}
		return this.cartState;
	}

	public getCartItems(): Menu[] {
		return this.cartState;
	}

	public getAmountOfItems(): number {
		return this.cartState.length;
	}

	public isInCart(menu: Menu): boolean {
		return this.cartState.some((cartMenu) => cartMenu.id === menu.id);
	}

	public canBeReplaced(menu: Menu): boolean {
		return !!this.getReplacementFor(menu);
	}

	private getReplacementFor(menu: Menu): Menu | undefined {
		return this.cartState.find((cartMenu) => cartMenu.date === menu.date && cartMenu.id !== menu.id);
	}

	private removeWithoutPersistOnStorage(menuId: string): void {
		this.cartState = this.cartState.filter((cartItem) => cartItem.id !== menuId);
	}

	private persistCartOnSession(cart: Menu[]): void {
		window.sessionStorage.setItem(this.CART_KEY, JSON.stringify(cart));
	}

}