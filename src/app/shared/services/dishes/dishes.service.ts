import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DishItem } from 'src/app/interfaces/dish-item.interface';
import { Dish } from 'src/app/models/dish.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { DishCreationRequestDTO } from './dto/dish-creation-request.dto';
import { DishListResponseDTO } from './dto/dish-list-response.dto';
import { DishResponseDTO } from './dto/dish-response.dto';

@Injectable({
	providedIn: 'root'
})
export class DishesService {

	public constructor(
		private readonly environmentService: EnvironmentService,
		private readonly httpClient: HttpClient,
	) { }

	/**
	 * Returns an observable that emits the list of all the dishes if the server response is successful, or an
	 * error otherwise.
	 */
	public findAll( ): Observable<Dish[ ]> {
		const url: string = this.environmentService.getEndpoint( 'dishList' );

		return this.httpClient
			.get<DishListResponseDTO>( url )
			.pipe(
				map( ( dto ) => this.extractDishListFromDTO( dto ) ),
			);
	}

	/**
	 * Returns an observable that emits the dish with the provided id if the server response is successful, or
	 * an error otherwise.
	 *
	 * @param id the id of the Dish to emit.
	 */
	public findById( id: string ): Observable<Dish> {
		let url: string = this.environmentService.getEndpoint( 'dishRetrieval' );
		url = url.replace( '{id}', id );

		return this.httpClient
			.get<DishResponseDTO>( url )
			.pipe(
				map( ( dto ) => this.extractDishFromDTO( dto ) ),
			);
	}

	/**
	 * Creates a new dish from the provided arguments.
	 *
	 * Returns an observable that emits the created dish if the server response is successful, or an error
	 * otherwise.
	 */
	public create(
		name: string,
		dishItems: DishItem[ ],
	): Observable<Dish> {
		const url: string = this.environmentService.getEndpoint( 'dishCreation' );
		const mealCreationRequestDTO: DishCreationRequestDTO = {
			name: name,
			ingredients: dishItems.map( ( dishItem ) => ({
				recipe: {
					id: Number( dishItem.ingredient.id ),
				},
				quantity: dishItem.quantity,
			}))
		};

		return this.httpClient
			.put<DishResponseDTO>( url, mealCreationRequestDTO )
			.pipe(
				map( ( dto ) => this.extractDishFromDTO( dto ) ),
			);
	}

	/**
	 * Returns a list of instances of Dish created from the provided DTO.
	 */
	private extractDishListFromDTO( dto: DishListResponseDTO ): Dish[ ] {
		return dto.map( ( dtoItem ) => this.extractDishFromDTO( dtoItem ) );
	}

	/**
	 * Returns an instance of Dish created from the provided DTO.
	 */
	private extractDishFromDTO( dto: DishResponseDTO ): Dish {
		return new Dish(
			dto.id.toString( ),
			dto.name,
			dto.ingredients.map( ( ingredient ) => ({
				ingredient: new Ingredient(
					ingredient.recipe.id.toString( ),
					ingredient.recipe.name,
					ingredient.recipe.measurement,
				),
				quantity: ingredient.quantity,
			}))
		);
	}

}
