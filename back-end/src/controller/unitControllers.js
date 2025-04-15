// src/controllers/UnidadController.js
import {
  getAllUnidades,
  getUnidadById,
  createUnidad,
  updateUnidad,
  deleteUnidad,
} from "../services/unitService.js";

export const findAllUnidades = async (req, res) => {
  try {
    const data = await getAllUnidades();
    res.status(200).json({ data, message: "Unidades obtenidas correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener unidades"
    });
  }
};

export const findUnidadById = async (req, res) => {
  try {
    const data = await getUnidadById(req.params.id);
    res.status(200).json({ data, message: "Unidad obtenida correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar unidad"
    });
  }
};

export const createNewUnidad = async (req, res) => {
  try {
    const data = await createUnidad(req.body);
    res.status(201).json({ data, message: "Unidad creada exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear unidad"
    });
  }
};

export const updateExistingUnidad = async (req, res) => {
  try {
    const data = await updateUnidad(req.params.id, req.body);
    res.status(200).json({ data, message: "Unidad actualizada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar unidad"
    });
  }
};

export const deleteUnidadById = async (req, res) => {
  try {
    const result = await deleteUnidad(req.params.id);
    res.status(200).json({ data: result, message: "Unidad eliminada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar unidad"
    });
  }
};