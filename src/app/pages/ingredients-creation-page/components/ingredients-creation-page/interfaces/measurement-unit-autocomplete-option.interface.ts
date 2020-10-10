import { MeasurementUnit } from 'src/app/enums/measurement-unit.enum';

/**
 * Object that associates the value of a measurement unit with the label used in an autocomplete option for it.
 */
export interface MeasurementUnitAutocompleteOption {

	/**
	 * The value of the autocomplete option that uniquely identifies the measurement unit.
	 */
	value: MeasurementUnit;

	/**
	 * The text to display in the autocomplete option.
	 */
	label: string;

}