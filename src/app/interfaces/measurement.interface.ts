import { MeasurementUnit } from '../enums/measurement-unit.enum';

/**
 * Quantification of a physical property in terms of a standardized measurement unit.
 */
export interface Measurement {

	/**
	 * The numeric value of the measurement.
	 */
	value: number;

	/**
	 * The measurement unit on which the value is expressed.
	 */
	measurementUnit: MeasurementUnit;

}