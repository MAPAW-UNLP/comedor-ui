import { ValidatorFn } from '@angular/forms';
import moment from 'moment';

/**
 * Function that receives a control and returns a validation error if its value doesn't match that of a DNI,
 * and _null_ otherwise.
 */

const creditCardRegex = {
	visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
	mastercard: /^(?:5[1-5][0-9]{14})$/,
	amex: /^(?:3[47][0-9]{13})$/,
};

export const creditCardNumberValidator: ValidatorFn = ( control ) => {
	const cardNumber: string = control.value.trim( ) || '';
	if (cardNumber === '') {
		return null;
	} else {
		const isValid = Object.values(creditCardRegex).some((regex: RegExp) => regex.test(cardNumber));
		return isValid ? null : { 'invalidCardNumberFormat' : true };
	}
};

export const creditCardExpirancyValidator: ValidatorFn = ( control ) => {
	let expirancy: string;
	let expirancyMonth: number;
	let expirancyYear: number;
	try {
		expirancy = control.value.trim( );
		expirancyMonth = Number.parseInt(expirancy.slice(0, 2));
		expirancyYear = Number.parseInt(expirancy.slice(2, 4));
	} catch {
		expirancy = '';
		expirancyMonth = 0;
		expirancyYear = 0;
	}
	if (expirancy === '') {
		return null;
	}
	if (expirancyMonth > 12 ){
		return { 'invalidCardExpirancyFormat' : true };
	}
	if ( expirancyMonth && expirancyYear ) {
		const today = moment();
		const month = today.month() + 1;
		// Get last 2 digits
		const year = Number.parseInt(today.format('YY'));
		let isValid;
		if (year === expirancyYear) {
			isValid = expirancyMonth >= month;
		} else {
			isValid = expirancyYear >= year;
		}
		return isValid ? null : { 'invalidCardExpirancy' : true };
	}else {
		return { 'invalidCardExpirancyFormat' : true };
	}
};