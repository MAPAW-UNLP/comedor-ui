import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Meal } from 'src/app/models/meal.model';
import { MealsService } from 'src/app/shared/services/meals/meals.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
	selector: 'cu-meal-detail-page',
	templateUrl: './meal-detail-page.component.html',
	styleUrls: [ './meal-detail-page.component.scss' ],
})
export class MealDetailPageComponent implements OnInit {

	private readonly ID_PARAM_NAME = 'id';
	public meal: Meal | undefined = undefined;
	public isWaitingForServerResponse: boolean = true;

	public constructor(
		private readonly route: ActivatedRoute,
		private readonly mealService: MealsService,
		public readonly location: Location,
		public readonly authService: AuthService,
	) { }

	public ngOnInit() {
		this.route.params.subscribe((params) => {
			const mealId = params[this.ID_PARAM_NAME];
			this.mealService.findById(mealId).subscribe((meal: Meal | undefined) => {
				this.meal = meal;
				this.isWaitingForServerResponse = false;
			});
		});
	}

}