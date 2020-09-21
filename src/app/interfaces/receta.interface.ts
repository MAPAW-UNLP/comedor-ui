import { Ingrediente } from '../modelos/ingrediente.model';
import { Magnitud } from './magnitud.interface';

/**
 * Cada entrada de una receta, asociada a un ingrediente específico junto con una cantidad del mismo.
 */
type EntradaDeReceta = {

	/**
	 * El ingrediente asociado a la entrada de la receta.
	 */
	ingrediente: Ingrediente;

	/**
	 * Cantidad del ingrediente dentro de la receta, expresada como una magnitud.
	 */
	cantidad: Magnitud;

};

/**
 * Representa la lista de cada ingrediente necesarios para preparar una comida particular, junto con la cantidad
 * necesaria de cada uno.
 */
export interface Receta extends Array<EntradaDeReceta> { }