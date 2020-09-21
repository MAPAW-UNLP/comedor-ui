/**
 * Representa una opción de un menú que describe un combo junto con su precio y stock.
 */
export interface OpcionDeMenu {

	/**
	 * Identificador único del combo asociado a la opción de menú.
	 */
	idCombo: string;

	/**
	 * Precio unitario de la comida para esta opción de menú en particular.
	 */
	precioUnitario: number;

	/**
	 * Stock actual de la comida dentro del menú.
	 *
	 * Determina la cantidad de tickets disponibles para esta opción del menú y disminuye a medida que los
	 * clientes compran tickets seleccionando esta opción del menú.
	 */
	stockActual: number;

}