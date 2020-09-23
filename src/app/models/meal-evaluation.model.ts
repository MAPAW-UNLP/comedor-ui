import { MealEvaluationScore } from '../enums/meal-evaluation-score.enum';
import { Client } from './client.model';
import { Entity } from './entity.model';
import { Meal } from './meal.model';

/**
 * Model that represents the evaluation of a meal from a client.
 */
export class MealEvaluation extends Entity {
	private readonly _client: Client;
	private readonly _meal: Meal;
	private readonly _score: MealEvaluationScore;
	private readonly _comment: string;

	/**
	 * The unique identifier of the meal evaluation.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The client who authored the meal evaluation.
	 */
	public get client( ): Client {
		return this._client;
	}

	/**
	 * The meal being evaluated.
	 */
	public get meal( ): Meal {
		return this._meal;
	}

	/**
	 * The score given to the meal, from 1 (the worst) to 5 (the best).
	 */
	public get score( ): number {
		return this._score;
	}

	/**
	 * The comment added by the client to the evaluation of the meal.
	 */
	public get comment( ): string | null {
		return this._comment;
	}

	public constructor(
		id: string,
		client: Client,
		meal: Meal,
		score: MealEvaluationScore,
		comment: string,
	) {
		super( id );
		this._client = client;
		this._meal = meal;
		this._score = score;
		this._comment = comment;
	}

}