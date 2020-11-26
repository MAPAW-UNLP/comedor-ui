import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { SalesReportsRequestDTO } from './dto/sales-reports-request.dto';
import { SalesReportsResponseDTO } from './dto/sales-reports-response.dto';

@Injectable({
	providedIn: 'root',
})
export class SalesReportsService {

	public constructor(
		private readonly httpClient: HttpClient,
		private readonly environmentService: EnvironmentService,
	) { }

	public get( date: string, kitchenSiteId: string ): Observable<SalesReportsResponseDTO> {
		const url: string = this.environmentService.getEndpoint( 'salesReports' );
		const body: SalesReportsRequestDTO = {
			date: date,
			kitchenSite: {
				id: kitchenSiteId,
			},
		};

		return this.httpClient.post<SalesReportsResponseDTO>( url, body );
	}
}
