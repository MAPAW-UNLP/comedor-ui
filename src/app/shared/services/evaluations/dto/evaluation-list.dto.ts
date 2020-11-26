export interface EvaluationListDTO extends Array<{
	id: number;
	idMeal: number;
	idClient: number;
	clientName: string;
	comments: string;
	score: number;
}> { }