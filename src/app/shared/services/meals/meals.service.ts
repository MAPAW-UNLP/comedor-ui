import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { MealDTO } from './dto/meal.dto';
import { map } from 'rxjs/operators';
import { MealItem } from 'src/app/interfaces/meal-item.interface';
import { Dish } from 'src/app/models/dish.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Meal } from 'src/app/models/meal.model';
import { MealCreationRequestDTO } from './dto/meal-creation-request.dto';
import { MealResponseDTO } from './dto/meal-response.dto';
import { MealListResponseDTO } from './dto/meal-list-response.dto';
import { DishItem } from 'src/app/interfaces/dish-item.interface';

/**
 * Service that provides queries for the meals in the system and commands to update them.
 */
@Injectable({
	providedIn: 'root',
})
export class MealsService {

	public constructor(
		private readonly environmentService: EnvironmentService,
		private readonly httpClient: HttpClient,
	) { }

	public getAll(): Observable<MealDTO[]> {
		const url: string = `${this.environmentService.getEndpoint( 'meals' )}/`;
		return this.httpClient
			.get<MealDTO[]>( url )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	public get(mealId: string): Observable<MealDTO> {
		const url: string = `${this.environmentService.getEndpoint( 'meals' )}/`;
		const params = { id: mealId };
		return this.httpClient
			.get<MealDTO>( url, { params })
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	// /**
	//  * Returns an observable that emits the list of all the meals if the server response is successful, or an
	//  * error otherwise.
	//  */
	public findAll( ): Observable<Meal[ ]> {
		const url: string = this.environmentService.getEndpoint( 'mealList' );

		return this.httpClient
			.get<MealListResponseDTO>( url )
			.pipe(
				map( ( dto ) => this.extractMealListFromDTO( dto ) ),
			);
	}

	/**
	 * Returns an observable that emits the meal with the provided id if the server response is successful, or
	 * an error otherwise.
	 *
	 * @param id the id of the Meal to emit.
	 */
	public findById( id: string ): Observable<Meal> {
		let url: string = this.environmentService.getEndpoint( 'mealRetrieval' );
		url = url.replace( '{id}', id );

		return this.httpClient
			.get<MealResponseDTO>( url )
			.pipe(
				map( ( dto ) => this.extractMealFromDTO( dto ) ),
			);
	}

	/**
	 * Creates a new meal from the provided arguments.
	 *
	 * Returns an observable that emits the created meal if the server response is successful, or an error
	 * otherwise.
	 */
	public create(
		name: string,
		items: MealItem[ ],
		isSuitableForCeliacs: boolean,
		isSuitableForVegetarians: boolean,
		observations: string | undefined,
	): Observable<Meal> {
		const url: string = this.environmentService.getEndpoint( 'mealCreation' );
		const mealCreationRequestDTO: MealCreationRequestDTO = {
			name: name,
			items: items.map( ( item ) => ({
				name: item.dish.name,
				recipe: {
					id: Number( item.dish.id )
				},
				type: item.dishType,
			})),
			suitableForCeliacs: isSuitableForCeliacs,
			suitableForVegetarians: isSuitableForVegetarians,
			observations: observations,
		};

		return this.httpClient
			.put<MealResponseDTO>( url, mealCreationRequestDTO )
			.pipe(
				map( ( dto ) => this.extractMealFromDTO( dto ) ),
			);
	}

	/**
	 * Returns a list of instances of Meal created from the provided DTO.
	 */
	private extractMealListFromDTO( dto: MealListResponseDTO ): Meal[ ] {
		return dto.map( ( dtoItem ) => this.extractMealFromDTO( dtoItem ) );
	}

	/**
	 * Returns an instance of Meal created from the provided DTO.
	 */
	private extractMealFromDTO( dto: MealResponseDTO ): Meal {
		return new Meal(
			dto.id.toString( ),
			dto.name,
			dto.suitableForCeliacs,
			dto.suitableForVegetarians,
			dto.items.map( ({ recipe: dishRecipe, type }): MealItem => ({
				dish: new Dish(
					dishRecipe.id.toString( ),
					dishRecipe.name,
					dishRecipe.ingredients.map( ({ recipe: ingredientRecipe, quantity }): DishItem => ({
						ingredient: new Ingredient(
							ingredientRecipe.id.toString( ),
							ingredientRecipe.name,
							ingredientRecipe.measurement,
						),
						quantity: quantity,
					})),
				),
				dishType: type,
			})),
			dto.observations,
		);
	}
}