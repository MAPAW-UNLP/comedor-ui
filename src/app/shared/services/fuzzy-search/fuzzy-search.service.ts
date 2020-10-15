import { Injectable } from '@angular/core';

/**
 * Service that provides tools to perform fuzzy searches.
 *
 * It should be used mainly for search boxes and autocompletes.
 */
@Injectable({
	providedIn: 'root',
})
export class FuzzySearchService {

	/**
	 * Returns _true_ if the provided search text is fuzzily included in the provided target text, and _false_
	 * otherwise.
	 *
	 * @param searchText The text to check if it's fuzzily contained in the target text.
	 * @param targetText The text on which to check if the search text is fuzzily contained.
	 */
	public isFuzzilyIncludedInText( searchText: string, targetText: string ): boolean {
		const normalizedSearchText: string = this.normalizeText( searchText || '' );
		const normalizedTargetText: string = this.normalizeText( targetText );

		const regexText: string = normalizedSearchText.split( '' ).join( '(?:.*)' );
		const regex = new RegExp( regexText, 'i' );
		return regex.test( normalizedTargetText );
	}

	/**
	 * Realizes changes to the provided text to normalize it for comparison in fuzzy search.
	 */
	private normalizeText( text: string ): string {
		return text
			.trim( )
			.toLowerCase( )
			.replace( /\s/g, '' )
			.replace( /á/g, 'a' )
			.replace( /é/g, 'e' )
			.replace( /í/g, 'i' )
			.replace( /ó/g, 'o' )
			.replace( /ú|û/g, 'u' );
	}

}
