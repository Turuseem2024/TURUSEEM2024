// src/controllers/AsistenciaController.js
import {
  getAllAsistencias,
  getAsistenciaById,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
} from "../services/asistenciaService.js";

export const findAllAsistencias = async (req, res) => {
  try {
    const data = await getAllAsistencias();
    res.status(200).json({ data, message: "Asistencias obtenidas correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener asistencias"
    });
  }
};

export const findAsistenciaById = async (req, res) => {
  try {
    const data = await getAsistenciaById(req.params.id);
    res.status(200).json({ data, message: "Asistencia obtenida correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar asistencia"
    });
  }
};

export const createNewAsistencia = async (req, res) => {
  try {
    const data = await createAsistencia(req.body);
    res.status(201).json({ data, message: "Asistencia creada exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear asistencia"
    });
  }
};

export const updateExistingAsistencia = async (req, res) => {
  try {
    const data = await updateAsistencia(req.params.id, req.body);
    res.status(200).json({ data, message: "Asistencia actualizada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar asistencia"
    });
  }
};

export const deleteAsistenciaById = async (req, res) => {
  try {
    const result = await deleteAsistencia(req.params.id);
    res.status(200).json({ data: result, message: "Asistencia eliminada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar asistencia"
    });
  }
};