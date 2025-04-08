import { logger } from "../middleware/logMiddleware.js";
import {
  getAllFichasService,
  getFichaService,
  createFichaService,
  updateFichaService,
  deleteFichaService,
} from "../services/fichasService.js";

// Controlador para obtener todas las fichas
export const getAllFichas = async (req, res) => {
  try {
    const fichas = await getAllFichasService();
    
    if (fichas.length > 0) {
      return res.status(200).json(fichas);
    }
    
    return res.status(404).json({
      message: "No se encontraron fichas registradas.",
    });
  } catch (error) {
    logger.error(`Error al obtener las fichas: ${error.message}`);
    return res.status(500).json({ message: "Error al recuperar las fichas." });
  }
};

// Controlador para obtener una ficha específica por ID
export const getFicha = async (req, res) => {
  try {
    const ficha = await getFichaService(req.params.Id_Ficha);
    
    if (ficha) {
      return res.status(200).json(ficha);
    }
    
    return res.status(404).json({ message: "Ficha no encontrada" });
  } catch (error) {
    logger.error(`Error al obtener la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error al recuperar la ficha." });
  }
};

// Controlador para crear una nueva ficha
export const createFicha = async (req, res) => {
  try {
    const newFicha = await createFichaService(req.body);
    
    if (newFicha) {
      return res.status(201).json(newFicha);
    }
    
    return res.status(500).json({ message: "Error al crear la ficha." });
  } catch (error) {
    logger.error(`Error al crear la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Controlador para actualizar una ficha existente
export const updateFicha = async (req, res) => {
  try {
    const [updated] = await updateFichaService(req.params.Id_Ficha, req.body);
    
    if (updated === 0) {
      return res.status(404).json({ message: "Ficha no encontrada" });
    }
    
    return res.json({ message: "Ficha actualizada correctamente" });
  } catch (error) {
    logger.error(`Error al actualizar la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error al actualizar la ficha." });
  }
};

// Controlador para eliminar una ficha existente
export const deleteFicha = async (req, res) => {
  try {
    const result = await deleteFichaService(req.params.Id_Ficha);
    
    if (result === 0) {
      return res.status(404).json({ message: "Ficha no encontrada" });
    }
    
    return res.json({ message: "Ficha eliminada correctamente" });
  } catch (error) {
    logger.error(`Error al eliminar la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error al eliminar la ficha." });
  }
};
