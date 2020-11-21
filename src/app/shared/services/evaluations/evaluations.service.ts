import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { EvaluationListDTO } from './dto/evaluation-list.dto';
import { EvaluationDTO } from './dto/evaluation.dto';

@Injectable({
	providedIn: 'root'
})
export class EvaluationsService {

	public constructor(
		private readonly httpClient: HttpClient,
		private readonly environmentService: EnvironmentService,
	) { }

	public getAllForMeal( mealId: number ): Observable<EvaluationListDTO> {
		const url: string = this.environmentService
			.getEndpoint( 'evaluationList' )
			.replace( '{id}', mealId.toString( ) );

		return this.httpClient.get<EvaluationListDTO>( url );
	}

	public create( mealId: number, rating: number, commentary?: string ): Observable<EvaluationDTO> {
		const url: string = this.environmentService.getEndpoint( 'evaluationCreation' );
		const body = {
			idMeal: mealId,
			comments: commentary,
			score: rating,
		};

		return this.httpClient.post<EvaluationDTO>( url, body );
	}

}
