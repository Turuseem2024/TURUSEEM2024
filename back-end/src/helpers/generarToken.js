/**
 * Función para generar un token único basado en el tiempo actual y un valor aleatorio.
 * 
 * Esta función genera un token utilizando la hora actual en milisegundos (usando `Date.now()`)
 * y un valor aleatorio generado con `Math.random()`. Ambos valores se convierten a base 32 (sistema
 * de numeración en el que se usan los caracteres 0-9 y a-z) para crear un token que es único
 * y difícil de predecir.
 * 
 * El token generado es una cadena que concatena la representación en base 32 de la fecha actual
 * y un número aleatorio generado en el momento de la ejecución.
 * 
 * El valor aleatorio se extrae a partir de `Math.random()`, y se toma una subcadena de su valor
 * a partir de la posición 2, eliminando el prefijo "0." para obtener solo los números.
 * 
 * Ejemplo de un token generado:
 * "7d4c1a8b2f8c8c8c9e"
 *
 * @returns {string} Un token único generado.
 */
export const generarToken = () => {
  // Se genera un token combinando la fecha actual en milisegundos con un valor aleatorio.
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
};
