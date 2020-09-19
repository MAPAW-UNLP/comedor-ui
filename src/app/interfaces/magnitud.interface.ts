import { UnidadDeMedida } from '../enumerativos/unidad-de-medida';

/**
 * Una medida de una propiedad física de un objeto, compuesta de un número y una unidad de medida.
 */
export interface Magnitud {

	/**
	 * El valor numérico de la magnitud, expresado en el número de unidades de medida obtenidos en la medición.
	 */
	cantidad: number;

	/**
	 * La unidad de medida utilizada en la medición de la magnitud.
	 */
	unidadDeMedida: UnidadDeMedida;

}