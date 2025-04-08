import { logger } from "../middleware/logMiddleware.js";
import {
  getAllAreasService,
  getUnidadesByAreaService,
  getAprendicesByAreaService,
} from "../services/areaService.js";

// Controlador para obtener todas las áreas
export const getAllAreas = async (req, res) => {
  try {
    const areas = await getAllAreasService();

    if (areas.length > 0) {
      return res.status(200).json(areas);
    } else {
      return res.status(404).json({
        message: "No se encontraron áreas.",
      });
    }
  } catch (error) {
    logger.error("Error fetching areas: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar las áreas.",
      error: error.message,
    });
  }
};

// Controlador para obtener las unidades de un área
export const getUnidadesByArea = async (req, res) => {
  const { Id_Area } = req.params;

  try {
    const unidades = await getUnidadesByAreaService(Id_Area);

    if (!unidades.length) {
      return res.status(404).json({ message: 'No se encontraron unidades para esta área.' });
    }
    return res.status(200).json(unidades);
  } catch (error) {
    logger.error("Error fetching units by area: ", error.message);
    return res.status(500).json({ message: 'Error al obtener las unidades', error: error.message });
  }
};

// Controlador para obtener aprendices asociados a un área
export const getAprendicesByArea = async (req, res) => {
  const { Id_Area } = req.params;

  try {
    const aprendices = await getAprendicesByAreaService(Id_Area);

    if (!aprendices || !aprendices.length) {
      return res.status(404).json({ message: 'No se encontraron aprendices para esta área.' });
    }
    return res.status(200).json(aprendices);
  } catch (error) {
    logger.error("Error fetching apprentices by area: ", error.message);
    return res.status(500).json({ message: 'Error al obtener los aprendices', error: error.message });
  }
};
