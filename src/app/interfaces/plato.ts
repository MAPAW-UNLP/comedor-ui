import { TipoDePlato } from '../enumerativos/tipo-de-plato';

/**
 * Representa un plato dentro del contexto de una comida.
 *
 * Consiste de un tipo de plato (ej: postre) y un nombre (ej: helado).
 */
export interface Plato {

	/**
	 * El tipo del plato en el contexto de la comida.
	 *
	 * Ej: postre
	 */
	tipoDePlato: TipoDePlato;

	/**
	 * El nombre del plato.
	 *
	 * Ej: helado
	 */
	nombre: string;

}