import { ValidatorFn } from '@angular/forms';
import { dniLength } from 'src/app/constants/dni-length.constant';

/**
 * Function that receives a control and returns a validation error if its value doesn't match that of a DNI,
 * and _null_ otherwise.
 */
export const dniLengthValidator: ValidatorFn = ( control ) => {
	const dniRegex: RegExp = new RegExp( `^\\d{${ dniLength }}$`, 'i' );
	const dni: string = control.value.trim( );
	const dniHasValidLength = dniRegex.test( dni );

	return ( dniHasValidLength )
		? null
		: {
			dniLength: {
				value: control.value,
			},
		};
};