// src/controllers/DepartamentoController.js
import {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from "../services/DepartamentoService.js";

export const findAllDepartamentos = async (req, res) => {
  try {
    const data = await getAllDepartamentos();
    res.status(200).json({ data, message: "Departamentos obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener departamentos"
    });
  }
};

export const findDepartamentoById = async (req, res) => {
  try {
    const data = await getDepartamentoById(req.params.id);
    res.status(200).json({ data, message: "Departamento obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar departamento"
    });
  }
};

export const createNewDepartamento = async (req, res) => {
  try {
    const data = await createDepartamento(req.body);
    res.status(201).json({ data, message: "Departamento creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear departamento"
    });
  }
};

export const updateExistingDepartamento = async (req, res) => {
  try {
    const data = await updateDepartamento(req.params.id, req.body);
    res.status(200).json({ data, message: "Departamento actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar departamento"
    });
  }
};

export const deleteDepartamentoById = async (req, res) => {
  try {
    const result = await deleteDepartamento(req.params.id);
    res.status(200).json({ data: result, message: "Departamento eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar departamento"
    });
  }
};