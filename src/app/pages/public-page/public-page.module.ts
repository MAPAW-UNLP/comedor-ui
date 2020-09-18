import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicPageComponent } from './components/public-page/public-page.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'src/app/widgets/button/button.module';

/**
 * Dummy module representing a page that's not protected by the authentication guard, thus publically accessible.
 */
@NgModule({
	declarations: [
		PublicPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ButtonModule,
	],
	exports: [
		PublicPageComponent,
	],
})
export class PublicPageModule { }