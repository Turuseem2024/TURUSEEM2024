// src/controllers/FichasController.js

// Importación de las funciones del servicio fichasService
// Estas funciones se encargan de gestionar la lógica relacionada con las fichas
import {
  getAllFichas,     // Obtiene todas las fichas
  getFichaById,     // Obtiene una ficha específica por su ID
  createFicha,      // Crea una nueva ficha
  updateFicha,      // Actualiza una ficha existente
  deleteFicha       // Elimina una ficha por ID
} from "../services/fichasService.js";

/**
 * Controlador para obtener todas las fichas.
 * Retorna un arreglo de fichas como respuesta en formato JSON.
 */
export const findAllFichas = async (req, res) => {
  try {
    const data = await getAllFichas(); // Llama al servicio para obtener todas las fichas
    res.status(200).json({ 
      data, 
      message: "Fichas obtenidas correctamente" 
    });
  } catch (error) {
    // Manejo de errores: responde con código de error y mensaje informativo
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener fichas"
    });
  }
};

/**
 * Controlador para obtener una ficha específica por su ID.
 * El ID se extrae de los parámetros de la solicitud.
 */
export const findFichaById = async (req, res) => {
  try {
    const data = await getFichaById(req.params.id); // Llama al servicio con el ID proporcionado
    res.status(200).json({ 
      data, 
      message: "Ficha obtenida correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar ficha"
    });
  }
};

/**
 * Controlador para crear una nueva ficha.
 * La información de la ficha se toma del cuerpo de la solicitud (req.body).
 */
export const createNewFicha = async (req, res) => {
  try {
    const data = await createFicha(req.body); // Llama al servicio para crear la ficha
    res.status(201).json({ 
      data, 
      message: "Ficha creada exitosamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear ficha"
    });
  }
};

/**
 * Controlador para actualizar una ficha existente.
 * Se utiliza el ID de la ficha desde los parámetros y los nuevos datos desde el cuerpo de la solicitud.
 */
export const updateExistingFicha = async (req, res) => {
  try {
    const data = await updateFicha(req.params.id, req.body); // Actualiza la ficha con los nuevos datos
    res.status(200).json({ 
      data, 
      message: "Ficha actualizada correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar ficha"
    });
  }
};

/**
 * Controlador para eliminar una ficha por su ID.
 * El ID de la ficha se obtiene de los parámetros de la solicitud.
 */
export const deleteFichaById = async (req, res) => {
  try {
    const result = await deleteFicha(req.params.id); // Llama al servicio para eliminar la ficha
    res.status(200).json({ 
      data: result, 
      message: "Ficha eliminada correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar ficha"
    });
  }
};
