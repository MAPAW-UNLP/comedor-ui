import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { dniLength } from 'src/app/constants/dni-length.constant';
import { dniLengthValidator } from 'src/app/shared/validators/dni-length.validator';

/**
 * Top-level component for the AuthenticationPage module.
 */
@Component({
	selector: 'cu-authentication-page',
	templateUrl: './authentication-page.component.html',
	styleUrls: [ './authentication-page.component.scss' ],
})
export class AuthenticationPageComponent implements AfterViewInit {
	private readonly _dniFieldName: string = 'dniField';
	private readonly _passwordFieldName: string = 'passwordField';
	private readonly _authenticationForm: FormGroup = new FormGroup({
		[ this._dniFieldName ]: new FormControl( '', {
			validators: [
				Validators.required,
				dniLengthValidator,
			],
		}),
		[ this._passwordFieldName ]: new FormControl( '', [
			Validators.required,
		]),
	});
	private _hasInvalidCredentials: boolean = false;
	private _isWaitingForServerResponse: boolean = false;

	@ViewChild( 'dniInput' )
	private readonly _dniInputRef!: ElementRef<HTMLInputElement>;

	@ViewChild( 'passwordInput' )
	private readonly _passwordInputRef!: ElementRef<HTMLInputElement>;

	/**
	 * The form group for authentication displayed on the page.
	 */
	public get authenticationForm( ): FormGroup {
		return this._authenticationForm;
	}

	/**
	 * The name of the form control associated to the DNI field.
	 */
	public get dniFieldName( ): string {
		return this._dniFieldName;
	}

	/**
	 * The name of the form control associated to the password field.
	 */
	public get passwordFieldName( ): string {
		return this._passwordFieldName;
	}

	/**
	 * The form ocntrol associated to the DNI field.
	 */
	public get dniField( ): AbstractControl {
		return this.authenticationForm.controls[ this.dniFieldName ];
	}

	/**
	 * The form ocntrol associated to the password field.
	 */
	public get passwordField( ): AbstractControl {
		return this.authenticationForm.controls[ this.passwordFieldName ];
	}

	/**
	 * Returns the number of DNI digits entered compared with the expected.
	 *
	 * It's rendered as a hint or error below the DNI field.
	 */
	public get dniDigitCountToExpected( ): string {
		return `${ this.dniField.value.length } / ${ this.expectedDniLength }`;
	}

	/**
	 * It's _true_ if the user hasn't entered a DNI and _false_ otherwise.
	 */
	public get hasRequiredDniError( ): boolean {
		return this.dniField.hasError( 'required' );
	}

	/**
	 * It's _true_ if the user hasn't entered a DNI with the expected length, and _false_ otherwise.
	 *
	 * It's also _false_ if the length is zero, because that case is covered by the "required" validator.
	 */
	public get hasDniLengthError( ): boolean {
		return this.dniField.hasError( 'dniLength' ) && !this.hasRequiredDniError;
	}

	/**
	 * It's _true_ if the user hasn't entered a password and _false_ otherwise.
	 */
	public get hasRequiredPasswordError( ): boolean {
		return this.passwordField.hasError( 'required' );
	}

	/**
	 * It's _true_ if the user attempted to authenticate with an invalid combination of DNI and password before,
	 * and _false_ otherwise.
	 */
	public get hasInvalidCredentialsError( ): boolean {
		return this._hasInvalidCredentials;
	}

	/**
	 * The text message to display when the user hasn't entered a DNI.
	 */
	public get requiredDniErrorMessage( ): string {
		return 'Tenés que ingresar tu DNI';
	}

	/**
	 * The text message to display when the user hasn't entered a DNI with the expected length.
	 */
	public get dniLengthErrorMessage( ): string {
		return 'Tu DNI tiene que tener 8 dígitos';
	}

	/**
	 * The text message to display when the user hasn't entered a password.
	 */
	public get requiredPasswordErrorMessage( ): string {
		return 'Tenés que ingresar tu contraseña';
	}

	/**
	 * The text message to display when the server rejected the provided DNi and password.
	 */
	public get invalidCredentialsErrorMessage( ): string {
		return 'El usuario y la contraseña que ingresaste no coinciden';
	}

	/**
	 * The expected number of digits in a DNI.
	 */
	public get expectedDniLength( ): number {
		return dniLength;
	}

	/**
	 * It's _true_ if the form is waiting for the server's response and _false_ otherwise.
	 *
	 * Updating its value will enable or disable the authentication form.
	 */
	public get isWaitingForServerResponse( ): boolean {
		return this._isWaitingForServerResponse;
	}
	public set isWaitingForServerResponse( value: boolean ) {
		this._isWaitingForServerResponse = value;

		if ( value ) {
			this.dniField.disable( );
			this.passwordField.disable( );
		}
		else {
			this.dniField.enable( );
			this.passwordField.enable( );
		}
	}

	/**
	 * The text of the submit button, whose text depends on whether the form is waiting for the server's
	 * response or not.
	 */
	public get submitbuttonText( ): string {
		return this.isWaitingForServerResponse
			? 'Ingresando'
			: 'Ingresar';
	}

	/**
	 * It's _true_ if the submit button should be disabled and _true_ otherwise.
	 */
	public get submitButtonIsDisabled( ): boolean {
		return this.authenticationForm.invalid || this.isWaitingForServerResponse;
	}

	public constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly snackBar: MatSnackBar,
	) { }

	public ngAfterViewInit( ): void {
		this.focusDniInput( );
	}

	/**
	 * Attempts to authenticate the user with the credentials entered in the authentication form.
	 *
	 * If the authentication is successful, the user is redirected to their home page.
	 *
	 * If it is unsuccessful the "password" field is reset and the user is informed of the authentication error.
	 *
	 * If the server responds with another type of error, the user is informed about it and advised to retry in
	 * a few seconds.
	 */
	public authenticate( ): void {
		if ( this.authenticationForm.invalid ) {
			return;
		}

		this.isWaitingForServerResponse = true;
		this.authService
			.authenticate( this.dniField.value, this.passwordField.value )
			.pipe(
				tap({
					next: ( ) => {
						this.isWaitingForServerResponse = false;
					},
					error: ( ) => {
						this.isWaitingForServerResponse = false;
					},
				}),
			)
			.subscribe({
				next: ( authenticationSucceeded ) => {
					if ( authenticationSucceeded ) {
						const userFullName = this.authService.authenticatedUserSnapshot?.fullName;
						this.showSnackBar(
							`Ingresaste al sistema como ${ userFullName }.`
						);
						this.router.navigate([ '/' ]);
					}
					else {
						this._hasInvalidCredentials = true;
						this.passwordField.setValue( '' );
						this.focusPasswordInput( );
					}
				},
				error: ( authenticationError: Error ) => {
					this.showSnackBar(
						'Ocurrió un error al ingresar. Intentá de nuevo en unos segundos.',
					);
				},
			});
	}

	/**
	 * Programatically swtiches the user focus to the DNI input.
	 */
	private focusDniInput( ): void {
		this._dniInputRef.nativeElement.focus( );
	}

	/**
	 * Programatically swtiches the user focus to the password input.
	 */
	private focusPasswordInput( ): void {
		this._passwordInputRef.nativeElement.focus( );
	}

	/**
	 * Displays a snack bar with the provided text message.
	 */
	private showSnackBar( message: string ): void {
		const closeButtonText: string = 'CERRAR';
		const snackBarConfiguration: MatSnackBarConfig = {
			duration: 10000,
			horizontalPosition: 'start',
			verticalPosition: 'bottom',
		};
		this.snackBar.open( message, closeButtonText, snackBarConfiguration );
	}

}