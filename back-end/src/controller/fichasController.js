// src/controllers/FichasController.js
import {
  getAllFichas,
  getFichaById,
  createFicha,
  updateFicha,
  deleteFicha,
} from "../services/fichasService.js";

export const findAllFichas = async (req, res) => {
  try {
    const data = await getAllFichas();
    res.status(200).json({ data, message: "Fichas obtenidas correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener fichas"
    });
  }
};

export const findFichaById = async (req, res) => {
  try {
    const data = await getFichaById(req.params.id);
    res.status(200).json({ data, message: "Ficha obtenida correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar ficha"
    });
  }
};

export const createNewFicha = async (req, res) => {
  try {
    const data = await createFicha(req.body);
    res.status(201).json({ data, message: "Ficha creada exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear ficha"
    });
  }
};

export const updateExistingFicha = async (req, res) => {
  try {
    const data = await updateFicha(req.params.id, req.body);
    res.status(200).json({ data, message: "Ficha actualizada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar ficha"
    });
  }
};

export const deleteFichaById = async (req, res) => {
  try {
    const result = await deleteFicha(req.params.id);
    res.status(200).json({ data: result, message: "Ficha eliminada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar ficha"
    });
  }
};