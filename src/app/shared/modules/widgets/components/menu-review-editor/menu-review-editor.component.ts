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

	@Output( )
	public readonly ratingChanged: EventEmitter<number> = new EventEmitter<number>( );

	public get hasRating( ): boolean {
		return this.rating !== 0;
	}

	public handleRatingChangeEvent( event: RatingChangeEvent ): void {
		this.rating = event.rating;
		this.ratingChanged.emit(this.rating);
	}

	public handleSaveButtonClick( ): void {
		this.save.emit({
			rating: this.rating,
			commentary: this.commentary,
		});
	}
}
