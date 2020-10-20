import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Menu } from 'src/app/models/menu.model';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { menuBuilderFromService } from '../../utils/menu-builder';
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

	public search(
		date: string,
		kitchenSiteId: number
	): Observable<Menu[]> {
		const url: string = `${this.environmentService.getEndpoint( 'menus' )}/search`;
		const body = {
			date,
			kitchenSite: {
				id: kitchenSiteId
			}
		};
		return this.httpClient
			.post<Menu[]>( url, body )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
				map(
					(response: Menu[]) => {
						return menuBuilderFromService(response);
					}
				),
			);
	}

	public get(menuId: string): Observable<Menu> {
		const url: string = `${this.environmentService.getEndpoint( 'menus' )}/`;
		const params = { id: menuId };
		return this.httpClient
			.get<Menu>( url, { params })
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}
}