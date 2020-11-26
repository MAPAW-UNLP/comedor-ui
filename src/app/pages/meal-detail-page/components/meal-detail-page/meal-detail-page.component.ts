import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Meal } from 'src/app/models/meal.model';
import { MealsService } from 'src/app/shared/services/meals/meals.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { DishType } from 'src/app/enums/dish-type.enum';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { EvaluationsService } from 'src/app/shared/services/evaluations/evaluations.service';
import { map } from 'rxjs/operators';
import { MenuReview } from 'src/app/shared/modules/widgets/components/menu-review-editor/interfaces/menu-review.interface';
import { UserRole } from 'src/app/auth/services/auth/enums/user-role.enum';

type Evaluation = {
	rating: number;
	commentary?: string;
	clientId: number;
	clientName: string;
};

@Component({
	selector: 'cu-meal-detail-page',
	templateUrl: './meal-detail-page.component.html',
	styleUrls: [ './meal-detail-page.component.scss' ],
})
export class MealDetailPageComponent implements OnInit {

	private readonly ID_PARAM_NAME = 'id';
	public meal: Meal | undefined = undefined;
	public isWaitingForServerResponse: boolean = true;
	public evaluations: Evaluation[ ] = [ ];

	public readonly dishTypeOptions: StringMap = {
		[DishType.Appetizer]: 'Entrada',
		[DishType.MainDish]: 'Plato principal',
		[DishType.SideDish]: 'Guarnición',
		[DishType.Drink]: 'Bebida',
		[DishType.Dessert]: 'Postre',
	};

	public get isAlreadyEvaluated( ): boolean {
		const currentUserId = this.authService.authenticatedUserSnapshot?.id;
		if ( currentUserId === null ) {
			return false;
		}
		return this.evaluations.some( ( evaluation ) => (
			evaluation.clientId.toString( ) === currentUserId
		));
	}

	public get displayEditor( ): boolean {
		return !this.isAlreadyEvaluated && this.authService.aClientIsAuthenticatedSnapshot;
	}

	public constructor(
		private readonly route: ActivatedRoute,
		private readonly mealService: MealsService,
		public readonly location: Location,
		public readonly authService: AuthService,
		private readonly evaluationService: EvaluationsService,
	) { }

	public ngOnInit() {
		this.route.params.subscribe((params) => {
			const mealId = params[this.ID_PARAM_NAME];
			this.mealService.findById(mealId).subscribe((meal: Meal | undefined) => {
				this.meal = meal;
				this.isWaitingForServerResponse = false;
			});
			this.evaluationService
				.getAllForMeal( mealId )
				.pipe(
					map( ( list ) => list.map( ( item ): Evaluation => ({
						rating: item.score,
						commentary: item.comments ?? undefined,
						clientId: item.idClient,
						clientName: item.clientName,
					})))
				)
				.subscribe(( evaluations ) => {
					this.evaluations = evaluations;
				});
		});
	}

	public saveReview( event: MenuReview ): void {
		const mealId: number = this.route.snapshot.params[ this.ID_PARAM_NAME ];
		this.evaluationService.create( mealId, event.rating, event.commentary ).subscribe({
			next: ( dto ) => {
				this.evaluations.push({
					clientId: dto.idClient,
					rating: dto.score,
					commentary: dto.comments,
					clientName: dto.clientName,
				});
			}
		});
	}

}