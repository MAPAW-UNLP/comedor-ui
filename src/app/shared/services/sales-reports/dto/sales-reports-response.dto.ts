import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';

export interface SalesReportsResponseDTO {
	meals: {
		name: string;
		cantSales: number;
		ingredients: {
			name: string;
			quantity: number;
			measurement: MeasurementUnit;
		}[ ];
	}[ ];
	ingredients: {
		name: string;
		quantity: number;
		measurement: MeasurementUnit;
	}[ ];
};