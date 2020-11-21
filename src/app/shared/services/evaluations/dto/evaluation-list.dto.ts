export interface EvaluationListDTO extends Array<{
	id: number;
	idMeal: number;
	idClient: number;
	comments: string;
	score: number;
}> { }