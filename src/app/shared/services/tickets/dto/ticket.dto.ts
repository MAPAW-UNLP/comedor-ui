import { ConsumptionType } from 'src/app/enums/consumption-type.enum';
import { Menu } from 'src/app/models/menu.model';

export interface TicketDTO {
	menu: Menu;
	type: ConsumptionType;
	cosumed: Boolean;
}