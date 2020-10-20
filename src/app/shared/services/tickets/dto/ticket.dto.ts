import { ConsumptionType } from 'src/app/enums/consumption-type.enum';

export interface TicketDTO {
	menu: EntityID;
	ticketType: ConsumptionType;
}

interface EntityID {
	id: number;
}