import { Component } from '@angular/core';
import { AbTestingService } from 'src/app/shared/services/abTesting/ab-testing-service';

/**
 * Top-level component of the MenuCreationPage module.
 */
@Component({
	selector: 'cu-menu-creation-page',
	templateUrl: './menu-creation-page.component.html',
	styleUrls: [ './menu-creation-page.component.scss' ],
})
export class MenuCreationPageComponent {

	public readonly branch: string;

	public constructor(
		public readonly abTestingService: AbTestingService,
	) {
		this.branch = this.abTestingService.getBranch();
	}
}