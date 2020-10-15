import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { IngredientCreationRequestDTO } from './dto/ingredient-creation-request.dto';
import { IngredientRecipeDTO } from './dto/ingredient-recipe.dto';

@Injectable({
	providedIn: 'root',
})
export class IngredientsService {

	public constructor(
		private readonly environmentService: EnvironmentService,
		private readonly httpClient: HttpClient,
	) { }

	public create(
		ingredientName: string,
		measurementUnit: MeasurementUnit,
	): Observable<IngredientRecipeDTO> {
		const url: string = `${this.environmentService.getEndpoint( 'ingredientRecipe' )}/save`;
		const ingredientCreationRequestDTO: IngredientCreationRequestDTO = {
			name: ingredientName,
			measurement: measurementUnit,
		};

		return this.httpClient
			.put<IngredientRecipeDTO>( url, ingredientCreationRequestDTO )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	public getAll(): Observable<IngredientRecipeDTO[]> {
		const url: string = `${this.environmentService.getEndpoint( 'ingredientRecipe' )}/`;
		return this.httpClient
			.get<IngredientRecipeDTO[]>( url )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	public get(ingredientId: string): Observable<IngredientRecipeDTO> {
		const url: string = `${this.environmentService.getEndpoint( 'ingredientRecipe' )}/`;
		const params = { id: ingredientId };
		return this.httpClient
			.get<IngredientRecipeDTO>( url, { params })
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}
}