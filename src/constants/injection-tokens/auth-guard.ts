import { InjectionToken } from '@angular/core';
import { CanActivate } from '@angular/router';

/**
 * Injection token to identify the authentication guard.
 */
export const AUTH_GUARD: InjectionToken<CanActivate> = new InjectionToken( 'AUTH_GUARD' );