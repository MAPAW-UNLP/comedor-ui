import { Injectable } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';

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
				cart = JSON.parse(rawCart);
			}
			catch {
				cart = [];
				this.persistCartOnSession(cart);
			}
		}
		this.cartState = cart;
	}

	public add(menu: Menu): Menu[] {
		const existOnCart = this.cartState.find((cartItem) => cartItem.id === menu.id);
		if (existOnCart) {
			return this.cartState;
		}
		this.cartState = this.cartState.concat([menu]);
		this.persistCartOnSession(this.cartState);
		return this.cartState;
	}

	public remove(menuId: string): Menu[] {
		this.cartState = this.cartState.filter((cartItem) => cartItem.id !== menuId);
		this.persistCartOnSession(this.cartState);
		return this.cartState;
	}

	public empty(): void {
		this.cartState = [];
		this.persistCartOnSession(this.cartState);
	}

	public getCartItems(): Menu[] {
		return this.cartState;
	}

	public getAmountOfItems(): number {
		return this.cartState.length;
	}

	private persistCartOnSession(cart: Menu[]): void {
		window.sessionStorage.setItem(this.CART_KEY, JSON.stringify(cart));
	}

}