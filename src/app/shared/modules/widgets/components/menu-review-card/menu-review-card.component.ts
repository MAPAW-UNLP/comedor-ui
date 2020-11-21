import { Component, Input } from '@angular/core';

@Component({
	selector: 'cu-menu-review-card',
	templateUrl: './menu-review-card.component.html',
	styleUrls: ['./menu-review-card.component.scss']
})
export class MenuReviewCardComponent  {
	@Input( )
	public rating: number = 0;

	@Input( )
	public commentary: string = '';

	@Input( )
	public userName: string = 'Usuario anónimo';
}
