import { Component } from '@angular/core';
import { PageUrls } from 'src/app/constants/page-urls.constant';

/**
 * Top-level component for the NotFoundPage module.
 */
@Component({
	selector: 'cu-not-found-page',
	templateUrl: './not-found-page.component.html',
	styleUrls: [ './not-found-page.component.scss' ],
})
export class NotFoundPageComponent {

	public get pageUrls( ) {
		return PageUrls;
	}

}