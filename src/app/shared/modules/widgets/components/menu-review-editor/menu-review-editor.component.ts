import { Component, EventEmitter, Output } from '@angular/core';
import { RatingChangeEvent } from 'angular-star-rating';
import { MenuReview } from './interfaces/menu-review.interface';

@Component({
	selector: 'cu-menu-review-editor',
	templateUrl: './menu-review-editor.component.html',
	styleUrls: ['./menu-review-editor.component.scss']
})
export class MenuReviewEditorComponent  {
	public rating: number = 0;
	public commentary: string = '';

	@Output( )
	public readonly save: EventEmitter<MenuReview> = new EventEmitter<MenuReview>( );

	public get hasRating( ): boolean {
		return this.rating !== 0;
	}

	public handleRatingChangeEvent( event: RatingChangeEvent ): void {
		this.rating = event.rating;
	}

	public handleSaveButtonClick( ): void {
		this.save.emit({
			rating: this.rating,
			commentary: this.commentary,
		});
	}
}
