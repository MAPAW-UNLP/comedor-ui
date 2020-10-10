import { AbstractControl, ValidatorFn } from '@angular/forms';

export const autocompleteValidator = (validOptions: string[]): ValidatorFn => {
	return (control: AbstractControl): { [key: string]: boolean } | null => {
		if (!!control.value) {
			return validOptions.some((option) => option === control.value) ?
			null
			:
			{ 'autocomplete': true };
		} else {
			return null;
		}
	};
};