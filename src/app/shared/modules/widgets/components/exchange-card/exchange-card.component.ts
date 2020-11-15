import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ConsumptionType } from 'src/app/enums/consumption-type.enum';
import { ConsumptionTypeOption } from '../menu-card/interfaces/consumption-type-option.interface';
import { consumptionTypeLabels } from 'src/app/constants/consumption-type-labels.constant';
import moment from 'moment';

/**
 * Dumb component used to display a menu (or meal) in the ticket exchange screen.
 *
 * Its appearance and behavior can be configured via bindings.
 */
@Component({
	selector: 'cu-exchange-card',
	templateUrl: './exchange-card.component.html',
	styleUrls: [ './exchange-card.component.scss' ],
})
export class ExchangeCardComponent {
	private _thumbnailSource: string | undefined;
	private _cardTitle: string | undefined;
	private _date: string | undefined;
	private _kitchenSiteName: string | undefined;
	private _consumptionType: ConsumptionType | undefined;
	private _shouldDisplayCartActionButton: boolean | undefined;

	private readonly _actionButtonClick = new EventEmitter<void>( );

	private readonly _consumptionTypeOptions: ConsumptionTypeOption[ ] = [
		{
			value: ConsumptionType.Takeaway,
			label: consumptionTypeLabels.TAKEAWAY,
		},
		{
			value: ConsumptionType.OnSite,
			label: consumptionTypeLabels.ON_SITE,
		},
	];

	/**
	 * The value for the `src` attribute of the card's thumbnail image.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get thumbnailSource( ): string | undefined {
		return this._thumbnailSource;
	}
	@Input( )
	public set thumbnailSource( value: string | undefined ) {
		this._thumbnailSource = value;
	}

	/**
	 * The title of the card.
	 *
	 * If it's not present, it uses a default title.
	 *
	 * It should represent the name of the meal associated to the card, or to the menu associated to the card.
	 */
	public get cardTitle( ): string | undefined {
		return this._cardTitle ?? 'Menú sin nombre';
	}
	@Input( )
	public set cardTitle( value: string | undefined ) {
		this._cardTitle = value;
	}

	/**
	 * The date of the menu associated to the card, if applicable.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get date( ): string | undefined {
		return this._date;
	}
	@Input( )
	public set date( value: string | undefined ) {
		this._date = value;
	}

	/**
	 * The name of the kitchen site of the menu associated to the card, if applicable.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get kitchenSiteName( ): string | undefined {
		return this._kitchenSiteName;
	}
	@Input( )
	public set kitchenSiteName( value: string | undefined ) {
		this._kitchenSiteName = value;
	}

	/**
	 * The consumption type of the menu associated to the card, if applicable.
	 *
	 * If it's not present, it's _undefined_.
	 */
	public get consumptionType( ): ConsumptionType | undefined {
		return this._consumptionType;
	}

	@Input( )
	public set consumptionType( value: ConsumptionType | undefined ) {
		this._consumptionType = value;
	}

	/**
	 * It's _true_ if another menu is already in the cart for the same date as the one associated to the card
	 * and _false_ otherwise.
	 *
	 * If it's not present, it's _false_ by default.
	 */
	public get shouldDisplayCartActionButton( ): boolean | undefined {
		return this._shouldDisplayCartActionButton ?? false;
	}
	@Input( )
	public set shouldDisplayCartActionButton( value: boolean | undefined ) {
		this._shouldDisplayCartActionButton = value;
	}

	public get consumptionTypeLabel(): string | undefined {
		return this.consumptionTypeOptions.find((ct) => ct.value === this.consumptionType)?.label;
	}

	/**
	 * It's _true_ if the card should display the provided thumbnail and _false_ if the card should display a
	 * placeholder instead.
	 */
	public get shouldDisplayThumbnail( ): boolean {
		return this.thumbnailSource !== undefined;
	}

	/**
	 * The event emitter for clicks on the action button.
	 */
	@Output( )
	public get actionButtonClick( ): EventEmitter<void> {
		return this._actionButtonClick;
	}

	/**
	 * The list of options for consumption type selection in the card.
	 */
	public get consumptionTypeOptions( ): ConsumptionTypeOption[ ] {
		return this._consumptionTypeOptions;
	}

	/**
	 * Handles the event of a click the action button.
	 */
	public handleActionButtonClick( ): void {
		this.actionButtonClick.emit( undefined );
	}

	public formatDate(date: string | undefined): string {
		if ( date === undefined ) {
			return '';
		}
		const asMoment = moment(date, 'YYYY-MM-DD').locale('es');
		return asMoment.format('dddd DD/MM/YYYY');
	}

}