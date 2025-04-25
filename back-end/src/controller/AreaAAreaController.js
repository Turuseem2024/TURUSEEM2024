// src/controllers/AreaAAreaController.js

// Importación de funciones del servicio AreaAAreaService
// Estas funciones manejan la lógica de negocio relacionada con las relaciones entre áreas.
import {
  getAllAreasAArea,     // Obtiene todas las relaciones entre áreas
  getAreaAAreaById,     // Obtiene una relación específica entre áreas por ID
  createAreaAArea,      // Crea una nueva relación entre áreas
  updateAreaAArea,      // Actualiza una relación existente entre áreas
  deleteAreaAArea       // Elimina una relación entre áreas por ID
} from "../services/AreaAAreaService.js";

/**
 * Controlador para obtener todas las relaciones entre áreas.
 * Retorna un arreglo de relaciones en formato JSON.
 */
export const findAllAreasAArea = async (req, res) => {
  try {
    const data = await getAllAreasAArea(); // Llama al servicio para obtener todas las relaciones
    res.status(200).json({ 
      data, 
      message: "Relaciones entre áreas obtenidas correctamente" 
    });
  } catch (error) {
    // Manejo de errores: retorna código de error y mensaje personalizado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener relaciones entre áreas"
    });
  }
};

/**
 * Controlador para obtener una relación entre áreas por su ID.
 * El ID se toma desde los parámetros de la solicitud.
 */
export const findAreaAAreaById = async (req, res) => {
  try {
    const data = await getAreaAAreaById(req.params.id); // Llama al servicio con el ID de la relación
    res.status(200).json({ 
      data, 
      message: "Relación entre áreas obtenida correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar relación entre áreas"
    });
  }
};

/**
 * Controlador para crear una nueva relación entre áreas.
 * Los datos de la nueva relación se obtienen del cuerpo de la solicitud (req.body).
 */
export const createNewAreaAArea = async (req, res) => {
  try {
    const data = await createAreaAArea(req.body); // Crea una nueva relación usando los datos enviados
    res.status(201).json({ 
      data, 
      message: "Relación entre áreas creada exitosamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear relación entre áreas"
    });
  }
};

/**
 * Controlador para actualizar una relación existente entre áreas.
 * El ID se obtiene desde los parámetros y los nuevos datos del cuerpo de la solicitud.
 */
export const updateExistingAreaAArea = async (req, res) => {
  try {
    const data = await updateAreaAArea(req.params.id, req.body); // Actualiza la relación con los datos nuevos
    res.status(200).json({ 
      data, 
      message: "Relación entre áreas actualizada correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar relación entre áreas"
    });
  }
};

/**
 * Controlador para eliminar una relación entre áreas por su ID.
 * El ID se obtiene desde los parámetros de la solicitud.
 */
export const deleteAreaAAreaById = async (req, res) => {
  try {
    const result = await deleteAreaAArea(req.params.id); // Elimina la relación con el ID indicado
    res.status(200).json({ 
      data: result, 
      message: "Relación entre áreas eliminada correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar relación entre áreas"
    });
  }
};
