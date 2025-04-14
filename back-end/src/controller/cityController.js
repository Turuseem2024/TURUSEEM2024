import { logger } from "../middleware/logMiddleware.js";
import cityModel from "../models/cityModel.js";

export const getAllCities = async (req, res) => {
  try {
    const cities = await cityModel.findAll();

    if (cities && cities.length > 0) {
      return res.status(200).json(cities);
    } else {
      return res.status(404).json({
        message: "No se encontraron ciudades.",
      });
    }
  } catch (error) {
    logger.error(`Error al obtener las ciudades: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener las ciudades.",
    });
  }
};
