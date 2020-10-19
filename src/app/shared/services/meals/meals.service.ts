import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { MealDTO } from './dto/meal.dto';

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
}