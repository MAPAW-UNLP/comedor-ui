import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';

interface DishListResponseDTOItem {
	id: number;
	name: string;
	ingredients: {
		id: number;
		recipe: {
			id: number;
			name: string;
			measurement: MeasurementUnit;
		};
		quantity: number;
	}[ ];
}

export interface DishListResponseDTO extends Array<DishListResponseDTOItem> { }