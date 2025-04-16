// src/controllers/MemorandumController.js
import {
  getAllMemorandos,
  getMemorandumById,
  createMemorandum,
  updateMemorandum,
  deleteMemorandum,
} from "../services/memorandumService.js";

export const findAllMemorandos = async (req, res) => {
  try {
    const data = await getAllMemorandos();
    res.status(200).json({ data, message: "Memorandos obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener memorandos"
    });
  }
};

export const findMemorandumById = async (req, res) => {
  try {
    const data = await getMemorandumById(req.params.id);
    res.status(200).json({ data, message: "Memorándum obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar memorándum"
    });
  }
};

export const createNewMemorandum = async (req, res) => {
  try {
    const data = await createMemorandum(req.body);
    res.status(201).json({ data, message: "Memorándum creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear memorándum"
    });
  }
};

export const updateExistingMemorandum = async (req, res) => {
  try {
    const data = await updateMemorandum(req.params.id, req.body);
    res.status(200).json({ data, message: "Memorándum actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar memorándum"
    });
  }
};

export const deleteMemorandumById = async (req, res) => {
  try {
    const result = await deleteMemorandum(req.params.id);
    res.status(200).json({ data: result, message: "Memorándum eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar memorándum"
    });
  }
};