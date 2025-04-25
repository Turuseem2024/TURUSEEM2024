// Se importan las funciones necesarias para la gestión de clases CSS desde las librerías externas.
// 'clsx' se usa para combinar de manera eficiente clases condicionales y 'tailwind-merge' 
// se utiliza para resolver conflictos de clases en Tailwind CSS (por ejemplo, clases que podrían sobrescribirse entre sí).

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Función que combina clases CSS de forma eficiente y resuelve conflictos entre ellas.
 * 
 * La función `cn` recibe una cantidad arbitraria de entradas (clases) y realiza dos tareas:
 * 1. Utiliza `clsx` para combinar las clases, permitiendo manejar clases condicionales o listas.
 * 2. Usa `twMerge` para resolver posibles conflictos entre clases de Tailwind CSS, 
 *    asegurándose de que las clases redundantes o contradictorias se fusionen correctamente.
 * 
 * Ejemplo de uso:
 * ```ts
 * const classNames = cn("text-red-500", condition && "bg-blue-500", "font-bold");
 * ```
 * En este ejemplo, si `condition` es verdadero, se agrega la clase `bg-blue-500`, 
 * y si no lo es, solo se incluyen las clases `text-red-500` y `font-bold`. 
 * `twMerge` garantizaría que no haya clases redundantes de Tailwind.
 * 
 * @param inputs - Una lista de valores de clase que pueden ser cadenas, objetos o arrays, y serán combinadas por `clsx`.
 * @returns Una cadena de clases CSS procesadas.
 */
export function cn(...inputs: ClassValue[]) {
  // Primero se combinan las clases de entrada utilizando 'clsx', lo que permite manejar de manera
  // eficiente la creación de clases condicionales o múltiples clases a partir de arrays u objetos.
  // Luego, `twMerge` se asegura de que no haya conflictos en las clases de Tailwind CSS, 
  // resolviendo cualquier clase redundante o contradictoria.
  return twMerge(clsx(inputs))
}
