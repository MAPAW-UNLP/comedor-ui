import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import { Meal } from 'src/app/models/meal.model';
import { FuzzySearchService } from 'src/app/shared/services/fuzzy-search/fuzzy-search.service';
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
	public currentMeals: Meal[] = [];
	public isWaitingForServerResponse = true;

	public searchForm: FormGroup = new FormGroup({
		[ 'searchInput' ]: new FormControl( '', {
			validators: [],
		})
	});

	public get pageUrls( ) {
		return PageUrls;
	}

	public constructor(
		private readonly mealsService: MealsService,
		public readonly router: Router,
		private readonly fuzzySearchService: FuzzySearchService,
	) {
		this.mealsService.findAll()
		.subscribe({
			next: (meals: Meal[]) => {
				this.meals = meals;
				this.currentMeals = meals;
				this.isWaitingForServerResponse = false;
			},
			error: (error: Error) => {
				this.isWaitingForServerResponse = false;
				console.error('error getting meals');
			}
		});
	}

	public trackItem(index: number, meal: Meal) {
		return meal.id;
	}

	public searchMeals(): void {
		const searchedValue = this.searchForm.get('searchInput')?.value;
		this.currentMeals = this.meals.filter(
			(m: Meal) => this.fuzzySearchService.isFuzzilyIncludedInText(searchedValue, m.name)
		);
	}


	public navigateToDetailView( mealId: string ): void {
		const url: string = PageUrls.menuDetail.replace( ':id', mealId );
		this.router.navigate([ url ]);
	}
}