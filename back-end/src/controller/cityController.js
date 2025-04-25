// Importamos el logger desde el middleware personalizado para registrar mensajes de error u otros eventos
import { logger } from "../middleware/logMiddleware.js";

// Importamos el modelo de ciudades que interactúa con la base de datos
import cityModel from "../models/cityModel.js";

/**
 * Controlador para obtener todas las ciudades desde la base de datos.
 * 
 * Este controlador maneja la petición GET para recuperar todas las ciudades almacenadas.
 * Utiliza el método `findAll()` del modelo `cityModel` para consultar la base de datos.
 * 
 * Respuestas posibles:
 * - 200 OK: Si se encuentran ciudades, devuelve un array de objetos ciudad.
 * - 404 Not Found: Si no se encuentra ninguna ciudad en la base de datos.
 * - 500 Internal Server Error: Si ocurre un error al consultar la base de datos.
 * 
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Object} Respuesta HTTP con el estado correspondiente y los datos o mensajes.
 */
export const getAllCities = async (req, res) => {
  try {
    // Se intenta recuperar todas las ciudades de la base de datos
    const cities = await cityModel.findAll();

    // Si se encuentran ciudades, se retorna con un estado 200 (OK)
    if (cities && cities.length > 0) {
      return res.status(200).json(cities);
    } else {
      // Si no se encuentra ninguna ciudad, se retorna un estado 404 (Not Found)
      return res.status(404).json({
        message: "No se encontraron ciudades.",
      });
    }
  } catch (error) {
    // En caso de error, se registra el mismo en el logger y se retorna un estado 500 (Internal Server Error)
    logger.error(`Error al obtener las ciudades: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener las ciudades.",
    });
  }
};
