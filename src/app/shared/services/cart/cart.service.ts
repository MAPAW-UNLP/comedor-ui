import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CartService {

	private readonly CART_KEY = 'CART';
	private cartState: string[] = [];

	public constructor() {
		let cart: string[];
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

	public add(entry: string): void {
		const existOnCart = this.cartState.find((cartItem) => cartItem === entry);
		if (existOnCart) {
			return;
		}
		this.cartState = this.cartState.concat([entry]);
		this.persistCartOnSession(this.cartState);
	}

	public remove(entry: string): void {
		this.cartState = this.cartState.filter((cartItem) => cartItem !== entry);
		this.persistCartOnSession(this.cartState);
	}

	public getCartItems(): string[] {
		return this.cartState;
	}

	public getAmountOfItems(): number {
		return this.cartState.length;
	}

	private persistCartOnSession(cart: string[]): void {
		window.sessionStorage.setItem(this.CART_KEY, JSON.stringify(cart));
	}

}