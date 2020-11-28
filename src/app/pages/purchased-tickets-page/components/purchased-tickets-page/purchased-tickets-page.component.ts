import { Component } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { PageUrls } from 'src/app/constants/page-urls.constant';
import { TicketDTO } from 'src/app/shared/services/tickets/dto/ticket.dto';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

/**
 * Top-level component of the PurchasedTicketsPage module.
 */
@Component({
	selector: 'cu-purchased-tickets-page',
	templateUrl: './purchased-tickets-page.component.html',
	styleUrls: [ './purchased-tickets-page.component.scss' ],
})
export class PurchasedTicketsPageComponent {
	public tickets: TicketDTO[] = [];
	public isWaitingForServerResponse: Boolean = true;
	public get pageUrls( ) {
		return PageUrls;
	}

	public constructor(
		private readonly ticketsService: TicketsService,
		public readonly router: Router,
	) {
		this.ticketsService.getMyTickets().subscribe((tickets: TicketDTO[]) => {
			this.tickets = tickets;
			this.isWaitingForServerResponse = false;
		});
	}

	public visitDetailPage( mealId: string ): void {
		const url = PageUrls.menuDetail.replace( ':id', mealId );
		this.router.navigate([url]);
	}

	public formatDate(date: string): string {
		const asMoment = moment(date, 'YYYY-MM-DD').locale('es');
		return asMoment.format('dddd DD/MM/YYYY');
	}

}