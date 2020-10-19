export interface MenuCreationRequestDTO {
	name: string;
	meal: EntityId;
	anticipationDays: number;
	stock: number;
	unitPrice: number;
	kitchenSites: EntityId[];
	habilitedDates: string[];
}

interface EntityId {
	id: number;
}