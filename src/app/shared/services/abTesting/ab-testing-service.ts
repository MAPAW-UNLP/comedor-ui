import { Injectable } from '@angular/core';
import { localStorageKeys } from 'src/app/constants/local-storage-keys.constant';
import { Menu } from 'src/app/models/menu.model';
import { menuBuilderFromStorage } from 'src/app/shared/utils/menu-builder';

@Injectable({
	providedIn: 'root',
})
export class AbTestingService {

	private readonly AbKey = localStorageKeys.abBranch;
	private readonly branch: string;

	public constructor() {
		this.branch = window.localStorage.getItem(this.AbKey) || 'CTRL';
	}

	public getBranch(): string {
		return this.branch;
	}

}