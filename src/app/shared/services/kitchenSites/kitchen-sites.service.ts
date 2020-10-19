import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { KitchenSiteDTO } from './dto/kitchen-site.dto';

@Injectable({
	providedIn: 'root',
})
export class KitchenSitesService {

	public constructor(
		private readonly environmentService: EnvironmentService,
		private readonly httpClient: HttpClient,
	) { }

	public getAll(): Observable<KitchenSiteDTO[]> {
		const url: string = `${this.environmentService.getEndpoint( 'kitchenSite' )}/`;
		return this.httpClient
			.get<KitchenSiteDTO[]>( url )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	public get(kitchenSiteId: string): Observable<KitchenSiteDTO> {
		const url: string = `${this.environmentService.getEndpoint( 'kitchenSite' )}/`;
		const params = { id: kitchenSiteId };
		return this.httpClient
			.get<KitchenSiteDTO>( url, { params })
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}
}