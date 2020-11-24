import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { KitchenSite } from 'src/app/models/kitchen-site.model';
import { EnvironmentService } from 'src/app/pages/root/services/environment/environment.service';
import { TicketCreationRequestDTO } from './dto/ticket-creation-request.dto';
import { TicketDTO } from './dto/ticket.dto';

@Injectable({
	providedIn: 'root',
})
export class TicketsService {

	public constructor(
		private readonly environmentService: EnvironmentService,
		private readonly httpClient: HttpClient,
	) { }

	public create(
		body: TicketCreationRequestDTO
	): Observable<any> {
		const url: string = `${this.environmentService.getEndpoint( 'tickets' )}/buy`;
		return this.httpClient
			.post<TicketCreationRequestDTO>( url, body )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	public getMyTickets(): Observable<TicketDTO[]> {
		const url: string = `${this.environmentService.getEndpoint( 'tickets' )}/pending`;
		return this.httpClient
			.get<TicketDTO[]>( url )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	public search(date: String, dni: string, kitchenSiteId: number): Observable<TicketDTO> {
		const url: string = `${this.environmentService.getEndpoint( 'tickets' )}/search`;
		const body = {
			kitchenSite: {
				id: kitchenSiteId
			},
			date,
			dni
		};
		return this.httpClient
			.post<TicketDTO>( url, body )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}

	public consume(id: number): Observable<any> {
		const url: string = `${this.environmentService.getEndpoint( 'tickets' )}/consume`;
		const body = {
			id
		};
		return this.httpClient
			.post<any>( url, body )
			.pipe(
				// Avoid sending multiple concurrent requests.
				shareReplay( ),
			);
	}
}