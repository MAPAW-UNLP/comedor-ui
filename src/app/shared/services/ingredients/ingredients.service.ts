import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { IngredientCreationResponseDTO } from './dto/ingredient-creation-response.dto';
import { IngredientCreationDTO } from './dto/ingredient-creation.dto';

@Injectable({
	providedIn: 'root',
})
export class IngredientsService {

	public constructor(
		private readonly environmentService: EnvironmentService,
		private readonly httpClient: HttpClient,
	) { }

	public create(ingredientName: string, measurement: string): Observable<IngredientCreationResponseDTO | undefined> {
		const url: string = this.environmentService.getEndpoint( 'ingredients' );
		const authenticationCredentialsDTO: IngredientCreationDTO = {
			name: ingredientName,
			measurement,
		};
		return this.httpClient.post<IngredientCreationResponseDTO>( url, authenticationCredentialsDTO )
		.pipe(
			catchError( ( error: HttpErrorResponse ) => {
				return of(undefined);
			}),
			// Avoid sending multiple concurrent requests.
			shareReplay( ),
		);
	}
}