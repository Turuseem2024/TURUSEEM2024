// src/controllers/MunicipioController.js
import {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
} from "../services/MunicipioService.js";

export const findAllMunicipios = async (req, res) => {
  try {
    const data = await getAllMunicipios();
    res.status(200).json({ data, message: "Municipios obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener municipios"
    });
  }
};

export const findMunicipioById = async (req, res) => {
  try {
    const data = await getMunicipioById(req.params.id);
    res.status(200).json({ data, message: "Municipio obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar municipio"
    });
  }
};

export const createNewMunicipio = async (req, res) => {
  try {
    const data = await createMunicipio(req.body);
    res.status(201).json({ data, message: "Municipio creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear municipio"
    });
  }
};

export const updateExistingMunicipio = async (req, res) => {
  try {
    const data = await updateMunicipio(req.params.id, req.body);
    res.status(200).json({ data, message: "Municipio actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar municipio"
    });
  }
};

export const deleteMunicipioById = async (req, res) => {
  try {
    const result = await deleteMunicipio(req.params.id);
    res.status(200).json({ data: result, message: "Municipio eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar municipio"
    });
  }
};