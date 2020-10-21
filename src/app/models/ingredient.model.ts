import { MeasurementUnit } from '../enums/measurement-unit.enum';
import { Entity } from './entity.model';

/**
 * Model that represents an individual ingredient that can be part of a dish, with its own name and associated
 * measurement unit.
 */
export class Ingredient extends Entity {
	private readonly _name: string;
	private readonly _measurementUnit: MeasurementUnit;

	/**
	 * The unique identifier of the ingredient.
	 */
	public get id( ): string {
		return super.id;
	}

	/**
	 * The name of the ingredient.
	 */
	public get name( ): string {
		return this._name;
	}

	/**
	 * The measurement unit associated with the ingredient.
	 */
	public get measurementUnit( ): MeasurementUnit {
		return this._measurementUnit;
	}

	public constructor(
		id: string,
		name: string,
		measurementUnit: MeasurementUnit,
	) {
		super( id );
		this._name = name;
		this._measurementUnit = measurementUnit;
	}

}