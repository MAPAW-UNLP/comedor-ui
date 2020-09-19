import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

/**
 * Module for the Not Found error page.
 */
@NgModule({
	declarations: [
		NotFoundComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	exports: [
		NotFoundComponent,
	],
})
export class NotFoundModule { }