// src/controllers/ProgramaController.js
import {
  getAllProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  deletePrograma,
} from "../services/programaService.js";

export const findAllProgramas = async (req, res) => {
  try {
    const data = await getAllProgramas();
    res.status(200).json({ data, message: "Programas obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener programas"
    });
  }
};

export const findProgramaById = async (req, res) => {
  try {
    const data = await getProgramaById(req.params.id);
    res.status(200).json({ data, message: "Programa obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar programa"
    });
  }
};

export const createNewPrograma = async (req, res) => {
  try {
    const data = await createPrograma(req.body);
    res.status(201).json({ data, message: "Programa creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear programa"
    });
  }
};

export const updateExistingPrograma = async (req, res) => {
  try {
    const data = await updatePrograma(req.params.id, req.body);
    res.status(200).json({ data, message: "Programa actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar programa"
    });
  }
};

export const deleteProgramaById = async (req, res) => {
  try {
    const result = await deletePrograma(req.params.id);
    res.status(200).json({ data: result, message: "Programa eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar programa"
    });
  }
};