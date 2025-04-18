// src/controllers/ParametroController.js
import {
    getAllParametros,
    getParametroById,
    createParametro,
    updateParametro,
    deleteParametro
  } from "../services/ParametroService.js";
  
  export const findAllParametros = async (req, res) => {
    try {
      const data = await getAllParametros();
      res.status(200).json({ data, message: "Parámetros obtenidos correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al obtener parámetros"
      });
    }
  };
  
  export const findParametroById = async (req, res) => {
    try {
      const data = await getParametroById(req.params.id);
      res.status(200).json({ data, message: "Parámetro obtenido correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al buscar parámetro"
      });
    }
  };
  
  export const createNewParametro = async (req, res) => {
    try {
      const data = await createParametro(req.body);
      res.status(201).json({ data, message: "Parámetro creado exitosamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al crear parámetro"
      });
    }
  };
  
  export const updateExistingParametro = async (req, res) => {
    try {
      const data = await updateParametro(req.params.id, req.body);
      res.status(200).json({ data, message: "Parámetro actualizado correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al actualizar parámetro"
      });
    }
  };
  
  export const deleteParametroById = async (req, res) => {
    try {
      const result = await deleteParametro(req.params.id);
      res.status(200).json({ data: result, message: "Parámetro eliminado correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al eliminar parámetro"
      });
    }
  };