// src/controllers/AreaController.js
import {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} from "../services/areaService.js";

export const findAllAreas = async (req, res) => {
  try {
    const data = await getAllAreas();
    res.status(200).json({ data, message: "Áreas obtenidas correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener áreas"
    });
  }
};

export const findAreaById = async (req, res) => {
  try {
    const data = await getAreaById(req.params.id);
    res.status(200).json({ data, message: "Área obtenida correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar área"
    });
  }
};

export const createNewArea = async (req, res) => {
  try {
    const data = await createArea(req.body);
    res.status(201).json({ data, message: "Área creada exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear área"
    });
  }
};

export const updateExistingArea = async (req, res) => {
  try {
    const data = await updateArea(req.params.id, req.body);
    res.status(200).json({ data, message: "Área actualizada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar área"
    });
  }
};

export const deleteAreaById = async (req, res) => {
  try {
    const result = await deleteArea(req.params.id);
    res.status(200).json({ data: result, message: "Área eliminada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar área"
    });
  }
};