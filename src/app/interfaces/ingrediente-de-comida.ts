import { Magnitud } from './magnitud.interface';

/**
 * Define un ingrediente para una comida específica, junto con la cantidad del mismo requerida para prepararla.
 */
export interface IngredienteDeComida {

	/**
	 * El nombre del ingrediente.
	 */
	nombre: string;

	/**
	 * La cantidad necesaria del ingrediente para preparar la comida a la que pertenece.
	 */
	cantidad: Magnitud;

}