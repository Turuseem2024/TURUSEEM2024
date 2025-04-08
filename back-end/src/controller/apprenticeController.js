import { logger } from "../middleware/logMiddleware.js";
import {
  getAllApprenticesService,
  getApprenticeService,
  createApprenticeService,
  updateApprenticeService,
  deleteApprenticeService,
  importCSVService,
} from "../services/apprenticeService.js";

// Controlador para obtener todos los aprendices
export const getAllApprentices = async (req, res) => {
  try {
    const apprentices = await getAllApprenticesService();
    if (apprentices.length > 0) {
      return res.status(200).json(apprentices);
    }
    return res
      .status(404)
      .json({ message: "No se encontraron aprendices registrados." });
  } catch (error) {
    logger.error(`Error al obtener los aprendices: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Controlador para obtener un aprendiz específico por ID
export const getApprentice = async (req, res) => {
  try {
    const apprentice = await getApprenticeService(req.params.Id_Aprendiz);
    if (apprentice) {
      return res.status(200).json(apprentice);
    }
    return res
      .status(404)
      .json({ message: "Aprendiz no encontrado o no existe" });
  } catch (error) {
    logger.error(`Error al obtener el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Controlador para crear un nuevo aprendiz
export const createApprentice = async (req, res) => {
  try {
    const newApprentice = await createApprenticeService(req.body, req.file);
    if (newApprentice) {
      return res.status(201).json({
        apprentice: newApprentice,
        message: "Aprendiz registrado correctamente",
      });
    }
  } catch (error) {
    logger.error(`Error al crear el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Controlador para actualizar un aprendiz existente
export const updateApprentice = async (req, res) => {
  try {
    const [updated] = await updateApprenticeService(
      req.params.Id_Aprendiz,
      req.body,
      req.file
    );
    if (updated === 0) {
      return res.status(404).json({ message: "Aprendiz no encontrado" });
    }
    return res.json({ message: "Aprendiz actualizado correctamente" });
  } catch (error) {
    logger.error(`Error al actualizar el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Controlador para eliminar un aprendiz existente
export const deleteApprentice = async (req, res) => {
  try {
    const result = await deleteApprenticeService(req.params.Id_Aprendiz);
    if (result === 0) {
      return res.status(404).json({ message: "Aprendiz no encontrado" });
    }
    return res.json({ message: "Aprendiz eliminado correctamente" });
  } catch (error) {
    logger.error(`Error al eliminar el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Controlador para importar aprendices desde un archivo CSV
export const importCSV = async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await importCSVService(filePath);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`Error al procesar el CSV: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error al procesar el archivo CSV", error: error.message });
  }
};
