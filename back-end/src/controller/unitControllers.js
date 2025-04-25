// src/controllers/UnidadController.js

// Importación de las funciones del servicio 'unitService.js' para el manejo de las unidades
import {
  getAllUnidades,
  getUnidadById,
  createUnidad,
  updateUnidad,
  deleteUnidad,
} from "../services/unitService.js";

/**
 * Controlador para obtener todas las unidades.
 * @param {Object} req - El objeto de la solicitud (request) que contiene parámetros y datos.
 * @param {Object} res - El objeto de la respuesta (response) utilizado para enviar los datos al cliente.
 * @returns {Object} - Devuelve un JSON con las unidades obtenidas y un mensaje de éxito o error.
 */
export const findAllUnidades = async (req, res) => {
  try {
    // Llamada al servicio para obtener todas las unidades
    const data = await getAllUnidades();
    
    // Respuesta con el código de estado 200 y las unidades obtenidas
    res.status(200).json({ data, message: "Unidades obtenidas correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre un problema al obtener las unidades
    const status = error.status || 500; // Se obtiene el código de estado del error, o 500 si no existe
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener unidades" // Mensaje de error o mensaje por defecto
    });
  }
};

/**
 * Controlador para obtener una unidad específica por su ID.
 * @param {Object} req - El objeto de la solicitud que contiene el ID de la unidad como parámetro.
 * @param {Object} res - El objeto de la respuesta para devolver los resultados al cliente.
 * @returns {Object} - Devuelve un JSON con la unidad obtenida y un mensaje de éxito o error.
 */
export const findUnidadById = async (req, res) => {
  try {
    // Llamada al servicio para obtener la unidad por su ID
    const data = await getUnidadById(req.params.id);
    
    // Respuesta con el código de estado 200 y la unidad obtenida
    res.status(200).json({ data, message: "Unidad obtenida correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre un problema al buscar la unidad
    const status = error.status || 500; // Se obtiene el código de estado del error, o 500 si no existe
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar unidad" // Mensaje de error o mensaje por defecto
    });
  }
};

/**
 * Controlador para crear una nueva unidad.
 * @param {Object} req - El objeto de la solicitud que contiene los datos de la unidad a crear.
 * @param {Object} res - El objeto de la respuesta para devolver el resultado al cliente.
 * @returns {Object} - Devuelve un JSON con la unidad creada y un mensaje de éxito o error.
 */
export const createNewUnidad = async (req, res) => {
  try {
    // Llamada al servicio para crear una nueva unidad con los datos del cuerpo de la solicitud
    const data = await createUnidad(req.body);
    
    // Respuesta con el código de estado 201 indicando que se ha creado la unidad
    res.status(201).json({ data, message: "Unidad creada exitosamente" });
  } catch (error) {
    // Manejo de errores si ocurre un problema al crear la unidad
    const status = error.status || 500; // Se obtiene el código de estado del error, o 500 si no existe
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear unidad" // Mensaje de error o mensaje por defecto
    });
  }
};

/**
 * Controlador para actualizar una unidad existente.
 * @param {Object} req - El objeto de la solicitud que contiene el ID de la unidad y los nuevos datos.
 * @param {Object} res - El objeto de la respuesta para devolver el resultado al cliente.
 * @returns {Object} - Devuelve un JSON con la unidad actualizada y un mensaje de éxito o error.
 */
export const updateExistingUnidad = async (req, res) => {
  try {
    // Llamada al servicio para actualizar la unidad con el ID proporcionado y los nuevos datos del cuerpo
    const data = await updateUnidad(req.params.id, req.body);
    
    // Respuesta con el código de estado 200 y la unidad actualizada
    res.status(200).json({ data, message: "Unidad actualizada correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre un problema al actualizar la unidad
    const status = error.status || 500; // Se obtiene el código de estado del error, o 500 si no existe
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar unidad" // Mensaje de error o mensaje por defecto
    });
  }
};

/**
 * Controlador para eliminar una unidad por su ID.
 * @param {Object} req - El objeto de la solicitud que contiene el ID de la unidad a eliminar.
 * @param {Object} res - El objeto de la respuesta para devolver el resultado al cliente.
 * @returns {Object} - Devuelve un JSON con el resultado de la eliminación y un mensaje de éxito o error.
 */
export const deleteUnidadById = async (req, res) => {
  try {
    // Llamada al servicio para eliminar la unidad por su ID
    const result = await deleteUnidad(req.params.id);
    
    // Respuesta con el código de estado 200 y el resultado de la eliminación
    res.status(200).json({ data: result, message: "Unidad eliminada correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre un problema al eliminar la unidad
    const status = error.status || 500; // Se obtiene el código de estado del error, o 500 si no existe
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar unidad" // Mensaje de error o mensaje por defecto
    });
  }
};
