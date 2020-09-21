import { Magnitud } from './magnitud.interface';

/**
 * Cada entrada de una receta, asociada a un ingrediente específico junto con una cantidad del mismo.
 */
type EntradaDeReceta = {

	/**
	 * Idenfiticador único del ingrediente en la entrada de la receta.
	 */
	idIngrediente: string;

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