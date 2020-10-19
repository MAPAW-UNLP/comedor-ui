import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { MenuCreationRequestDTO } from './dto/menu-creation-request.dto';

@Injectable({
	providedIn: 'root',
})
export class MenusService {

	public constructor(
		private readonly environmentService: EnvironmentService,
		private readonly httpClient: HttpClient,
	) { }

	public create(
		body: MenuCreationRequestDTO
	): Observable<any> {
		const url: string = `${this.environmentService.getEndpoint( 'menus' )}/create`;
		return this.httpClient
			.post<MenuCreationRequestDTO>( url, body )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}
}