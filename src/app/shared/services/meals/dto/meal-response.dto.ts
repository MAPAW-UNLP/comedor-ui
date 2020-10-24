import { DishType } from 'src/app/enums/dish-type.enum';
import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';

export interface MealResponseDTO {
	id: number;
	name: string;
	items: {
		id: number;
		name: string;
		recipe: {
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
		};
		type: DishType;
	}[ ];
	suitableForCeliacs: boolean;
	suitableForVegetarians: boolean;
	observations: string;
}