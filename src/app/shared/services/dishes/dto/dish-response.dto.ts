import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum'

export interface DishResponseDTO {
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