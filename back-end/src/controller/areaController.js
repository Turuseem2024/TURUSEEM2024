// src/controllers/AreaController.js

// Importación de funciones del servicio areaService
// Estas funciones se encargan de la lógica de negocio para las entidades "Área"
import {
  getAllAreas,     // Obtiene todas las áreas
  getAreaById,     // Obtiene una área específica por su ID
  createArea,      // Crea una nueva área
  updateArea,      // Actualiza una área existente
  deleteArea       // Elimina una área por ID
} from "../services/areaService.js";

/**
 * Controlador para obtener todas las áreas registradas.
 * Retorna un arreglo de áreas como respuesta en formato JSON.
 */
export const findAllAreas = async (req, res) => {
  try {
    const data = await getAllAreas(); // Llama al servicio para obtener todas las áreas
    res.status(200).json({ 
      data, 
      message: "Áreas obtenidas correctamente" 
    });
  } catch (error) {
    // En caso de error, se retorna un estado de error y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener áreas"
    });
  }
};

/**
 * Controlador para obtener una área específica por ID.
 * El ID se extrae de los parámetros de la URL.
 */
export const findAreaById = async (req, res) => {
  try {
    const data = await getAreaById(req.params.id); // Llama al servicio pasando el ID del área
    res.status(200).json({ 
      data, 
      message: "Área obtenida correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar área"
    });
  }
};

/**
 * Controlador para crear una nueva área.
 * La información del área se toma del cuerpo de la solicitud (req.body).
 */
export const createNewArea = async (req, res) => {
  try {
    const data = await createArea(req.body); // Llama al servicio para crear una nueva área
    res.status(201).json({ 
      data, 
      message: "Área creada exitosamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear área"
    });
  }
};

/**
 * Controlador para actualizar una área existente.
 * Se recibe el ID del área por parámetro y los nuevos datos por el cuerpo de la solicitud.
 */
export const updateExistingArea = async (req, res) => {
  try {
    const data = await updateArea(req.params.id, req.body); // Llama al servicio para actualizar el área
    res.status(200).json({ 
      data, 
      message: "Área actualizada correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar área"
    });
  }
};

/**
 * Controlador para eliminar un área según su ID.
 * El ID se extrae desde los parámetros de la solicitud.
 */
export const deleteAreaById = async (req, res) => {
  try {
    const result = await deleteArea(req.params.id); // Llama al servicio para eliminar el área
    res.status(200).json({ 
      data: result, 
      message: "Área eliminada correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar área"
    });
  }
};
