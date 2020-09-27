import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlatformComponent } from './components/platform/platform.component';

/**
 * Module for the platform, where the views restricted only for authorized users are rendered.
 */
@NgModule({
	declarations: [
		PlatformComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
})
export class PlatformModule { }