import { RolDeComidaEnCombo } from '../enumerativos/rol-de-comida-en-combo';
import { Comida } from '../modelos/comida.model';

/**
 * Representa uno de los items de un combo, asociado a una comida en particular, y que describe el rol de dicha comida
 * dentro del combo (ej: plato principal, guarnición, postre).
 */
export interface ItemDeCombo {

	/**
	 * La comida asociada al item del combo.
	 */
	comida: Comida;

	/**
	 * El rol que cumple la comida dentro del combo.
	 *
	 * Ej: plato principal, guarnición, postre.
	 */
	rol: RolDeComidaEnCombo;

}