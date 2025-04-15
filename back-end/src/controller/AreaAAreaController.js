// src/controllers/AreaAAreaController.js
import {
    getAllAreasAArea,
    getAreaAAreaById,
    createAreaAArea,
    updateAreaAArea,
    deleteAreaAArea,
  } from "../services/AreaAAreaService.js";
  
  export const findAllAreasAArea = async (req, res) => {
    try {
      const data = await getAllAreasAArea();
      res.status(200).json({ data, message: "Relaciones entre áreas obtenidas correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al obtener relaciones entre áreas"
      });
    }
  };
  
  export const findAreaAAreaById = async (req, res) => {
    try {
      const data = await getAreaAAreaById(req.params.id);
      res.status(200).json({ data, message: "Relación entre áreas obtenida correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al buscar relación entre áreas"
      });
    }
  };
  
  export const createNewAreaAArea = async (req, res) => {
    try {
      const data = await createAreaAArea(req.body);
      res.status(201).json({ data, message: "Relación entre áreas creada exitosamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al crear relación entre áreas"
      });
    }
  };
  
  export const updateExistingAreaAArea = async (req, res) => {
    try {
      const data = await updateAreaAArea(req.params.id, req.body);
      res.status(200).json({ data, message: "Relación entre áreas actualizada correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al actualizar relación entre áreas"
      });
    }
  };
  
  export const deleteAreaAAreaById = async (req, res) => {
    try {
      const result = await deleteAreaAArea(req.params.id);
      res.status(200).json({ data: result, message: "Relación entre áreas eliminada correctamente" });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ 
        data: null, 
        message: error.message || "Error interno al eliminar relación entre áreas"
      });
    }
  };