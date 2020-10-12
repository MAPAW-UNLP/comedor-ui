import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';

export interface IngredientRecipeDTO {
	id: string;
	name: string;
	measurement: MeasurementUnit;
}