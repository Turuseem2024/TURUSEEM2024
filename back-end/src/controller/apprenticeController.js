// src/controllers/ApprenticeController.js
import {
  getAllApprentices,
  getApprenticeById,
  createApprentice,
  updateApprentice,
  deleteApprentice,
} from "../services/apprenticeService.js";

export const findAllApprentices = async (req, res) => {
  try {
    const data = await getAllApprentices();
    res.status(200).json({ 
      data, 
      message: "Aprendices obtenidos correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener aprendices"
    });
  }
};

export const findApprenticeById = async (req, res) => {
  try {
    const data = await getApprenticeById(req.params.id);
    res.status(200).json({ 
      data, 
      message: "Aprendiz obtenido correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar aprendiz"
    });
  }
};

export const createNewApprentice = async (req, res) => {
  try {
    const data = await createApprentice(req.body);
    res.status(201).json({ 
      data, 
      message: "Aprendiz creado exitosamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear aprendiz"
    });
  }
};

export const updateExistingApprentice = async (req, res) => {
  try {
    const data = await updateApprentice(req.params.id, req.body);
    res.status(200).json({ 
      data, 
      message: "Aprendiz actualizado correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar aprendiz"
    });
  }
};

export const deleteApprenticeById = async (req, res) => {
  try {
    const result = await deleteApprentice(req.params.id);
    res.status(200).json({ 
      data: result, 
      message: "Aprendiz eliminado correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar aprendiz"
    });
  }
};