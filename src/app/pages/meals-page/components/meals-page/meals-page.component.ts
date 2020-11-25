import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import { Meal } from 'src/app/models/meal.model';
import { MealsService } from 'src/app/shared/services/meals/meals.service';

/**
 * Top-level component of the MealsPage module.
 */
@Component({
	selector: 'cu-meals-page',
	templateUrl: './meals-page.component.html',
	styleUrls: [ './meals-page.component.scss' ],
})
export class MealsPageComponent {

	public meals: Meal[] = [];
	public isWaitingForServerResponse = true;

	public get pageUrls( ) {
		return PageUrls;
	}

	public constructor(
		private readonly mealsService: MealsService,
		public readonly router: Router
	) {
		this.mealsService.findAll()
		.subscribe({
			next: (meals: Meal[]) => {
				this.meals = meals;
				this.isWaitingForServerResponse = false;
			},
			error: (error: Error) => {
				this.isWaitingForServerResponse = false;
				console.error("error getting meals");
			}
		});
	}

	public navigateToDetailView( mealId: string ): void {
		const url: string = PageUrls.menuDetail.replace( ':id', mealId );
		this.router.navigate([ url ]);
	}
}