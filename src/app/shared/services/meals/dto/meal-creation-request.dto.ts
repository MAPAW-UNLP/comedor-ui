import { DishType } from 'src/app/enums/dish-type.enum';

export interface MealCreationRequestDTO {
	name: string;
	items: {
		name: string;
		recipe: {
			id: number;
		};
		type: DishType;
	}[ ];
	suitableForCeliacs: boolean;
	suitableForVegetarians: boolean;
	observations: string | undefined;
}