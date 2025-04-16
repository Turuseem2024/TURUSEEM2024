// src/controllers/FuncionarioController.js
import {
  getAllFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
} from "../services/officialService.js";

export const findAllFuncionarios = async (req, res) => {
  try {
    const data = await getAllFuncionarios();
    res.status(200).json({ data, message: "Funcionarios obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener funcionarios"
    });
  }
};

export const findFuncionarioById = async (req, res) => {
  try {
    const data = await getFuncionarioById(req.params.id);
    res.status(200).json({ data, message: "Funcionario obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar funcionario"
    });
  }
};

export const createNewFuncionario = async (req, res) => {
  try {
    const data = await createFuncionario(req.body);
    res.status(201).json({ data, message: "Funcionario creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear funcionario"
    });
  }
};

export const updateExistingFuncionario = async (req, res) => {
  try {
    const data = await updateFuncionario(req.params.id, req.body);
    res.status(200).json({ data, message: "Funcionario actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar funcionario"
    });
  }
};

export const deleteFuncionarioById = async (req, res) => {
  try {
    const result = await deleteFuncionario(req.params.id);
    res.status(200).json({ data: result, message: "Funcionario eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar funcionario"
    });
  }
};