import { logger } from "../middleware/logMiddleware.js";
import cityModel from "../models/cityModel.js";

export const getAllCities = async (req, res) => {
  try {
    // Intentamos obtener todas las ciudades de la base de datos
    const cities = await cityModel.findAll();

    // Verificamos si se encontraron ciudades
    if (cities.length > 0) {
      // Si se encontraron ciudades, devolvemos un código 200 y las ciudades en formato JSON
      return res.status(200).json(cities);
    } else {
      // Si no se encontraron ciudades, devolvemos un código 404 con un mensaje adecuado
      return res.status(404).json({
        message: "No se encontraron ciudades.",
      });
    }
  } catch (error) {
    // Si ocurre un error durante la consulta, lo registramos y devolvemos un código 500 con un mensaje de error
    logger.error("Error al recuperar las ciudades: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar las ciudades.",
      error: error.message,
    });
  }
};
