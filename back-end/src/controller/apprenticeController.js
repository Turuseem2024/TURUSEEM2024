// src/controllers/ApprenticeController.js

// Importación de funciones de servicio que manejan la lógica de negocio y acceso a datos
import {
  getAllApprentices,     // Obtiene todos los aprendices de la base de datos
  getApprenticeById,     // Obtiene un aprendiz específico por su ID
  createApprentice,      // Crea un nuevo aprendiz
  updateApprentice,      // Actualiza un aprendiz existente por su ID
  deleteApprentice       // Elimina un aprendiz por su ID
} from "../services/apprenticeService.js";

/**
 * Controlador para obtener todos los aprendices.
 * Responde con un arreglo de aprendices en formato JSON.
 */
export const findAllApprentices = async (req, res) => {
  try {
    const data = await getAllApprentices(); // Llama al servicio para obtener todos los aprendices
    res.status(200).json({ 
      data, 
      message: "Aprendices obtenidos correctamente" 
    });
  } catch (error) {
    // Captura errores y responde con el código de estado correspondiente
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener aprendices"
    });
  }
};

/**
 * Controlador para obtener un aprendiz específico por ID.
 * El ID se obtiene de los parámetros de la solicitud.
 */
export const findApprenticeById = async (req, res) => {
  try {
    const data = await getApprenticeById(req.params.id); // Llama al servicio para obtener un aprendiz por ID
    res.status(200).json({ 
      data, 
      message: "Aprendiz obtenido correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar aprendiz"
    });
  }
};

/**
 * Controlador para crear un nuevo aprendiz.
 * La información del aprendiz se obtiene del cuerpo de la solicitud (req.body).
 */
export const createNewApprentice = async (req, res) => {
  try {
    const data = await createApprentice(req.body); // Llama al servicio para crear un nuevo aprendiz
    res.status(201).json({ 
      data, 
      message: "Aprendiz creado exitosamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear aprendiz"
    });
  }
};

/**
 * Controlador para actualizar un aprendiz existente.
 * El ID se obtiene de los parámetros y los nuevos datos del cuerpo de la solicitud.
 */
export const updateExistingApprentice = async (req, res) => {
  try {
    const data = await updateApprentice(req.params.id, req.body); // Llama al servicio para actualizar el aprendiz
    res.status(200).json({ 
      data, 
      message: "Aprendiz actualizado correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar aprendiz"
    });
  }
};

/**
 * Controlador para eliminar un aprendiz por ID.
 * El ID del aprendiz se obtiene de los parámetros de la solicitud.
 */
export const deleteApprenticeById = async (req, res) => {
  try {
    const result = await deleteApprentice(req.params.id); // Llama al servicio para eliminar un aprendiz por ID
    res.status(200).json({ 
      data: result, 
      message: "Aprendiz eliminado correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar aprendiz"
    });
  }
};
