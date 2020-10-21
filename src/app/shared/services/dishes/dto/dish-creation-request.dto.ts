export interface DishCreationRequestDTO {
	name: string;
	ingredients: {
		recipe: {
			id: number;
		};
		quantity: number;
	}[ ];
}