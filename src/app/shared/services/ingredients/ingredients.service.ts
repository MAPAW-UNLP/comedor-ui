import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { IngredientCreationResponseDTO } from './dto/ingredient-creation-response.dto';
import { IngredientCreationRequestDTO } from './dto/ingredient-creation-request.dto';

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
	): Observable<IngredientCreationResponseDTO> {
		const url: string = this.environmentService.getEndpoint( 'ingredients' );
		const ingredientCreationRequestDTO: IngredientCreationRequestDTO = {
			name: ingredientName,
			measurement: measurementUnit,
		};

		return this.httpClient
			.post<IngredientCreationResponseDTO>( url, ingredientCreationRequestDTO )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}
}