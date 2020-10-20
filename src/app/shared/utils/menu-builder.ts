import { Menu } from 'src/app/models/menu.model';

export const menuBuilderFromService = (response: Menu[]): Menu[] => {
	return response.map((menu) => {
		return new Menu(menu.id, menu.name, menu.kitchenSite, menu.date, menu.meal, menu.unitPrice, menu.currentStock);
});
};

export const menuBuilderFromStorage = (response: any[]): Menu[] => {
	return response.map((menu) => {
		return new Menu(
			menu._id,
			menu._name,
			menu._kitchenSite,
			menu._date,
			menu._meal,
			menu._unitPrice,
			menu._currentStock,
			menu._consumptionType
		);
});
};