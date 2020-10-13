import { ConsumptionType } from 'src/app/enums/consumption-type.enum';

/**
 * Represents the metadata of an option to select a consumption type.
 */
export interface ConsumptionTypeOption {

	/**
	 * The actual value of the option.
	 */
	value: ConsumptionType;

	/**
	 * The displayed label of the option.
	 */
	label: string;

}