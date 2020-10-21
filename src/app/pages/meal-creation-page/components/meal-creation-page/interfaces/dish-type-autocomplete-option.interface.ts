import { DishType } from 'src/app/enums/dish-type.enum';

/**
 * Object that associates the value of a dish type with the label used in an autocomplete option for it.
 */
export interface DishTypeAutocompleteOption {

	/**
	 * The value of the autocomplete option that uniquely identifies the dish type.
	 */
	value: DishType;

	/**
	 * The text to display in the autocomplete option.
	 */
	label: string;

}