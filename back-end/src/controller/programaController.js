// src/controllers/ProgramaController.js

// Importación de las funciones del servicio 'programaService.js'.
// Estas funciones son responsables de interactuar con la base de datos para obtener, crear, actualizar y eliminar programas.
import {
  getAllProgramas,    // Función para obtener todos los programas
  getProgramaById,    // Función para obtener un programa por su ID
  createPrograma,     // Función para crear un nuevo programa
  updatePrograma,     // Función para actualizar un programa existente
  deletePrograma,     // Función para eliminar un programa por su ID
} from "../services/programaService.js";

/**
 * Controlador para obtener todos los programas.
 * Hace uso de la función `getAllProgramas` del servicio para obtener los datos
 * y responder al cliente con el resultado.
 * 
 * @param {Object} req - El objeto de la solicitud HTTP.
 * @param {Object} res - El objeto de la respuesta HTTP.
 */
export const findAllProgramas = async (req, res) => {
  try {
    // Obtiene todos los programas utilizando el servicio
    const data = await getAllProgramas();
    // Responde con los datos obtenidos y un mensaje de éxito
    res.status(200).json({ data, message: "Programas obtenidos correctamente" });
  } catch (error) {
    // En caso de error, responde con el estado de error y mensaje adecuado
    const status = error.status || 500; // Si no se encuentra un código de estado, asigna 500 (error interno)
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener programas"
    });
  }
};

/**
 * Controlador para obtener un programa específico por su ID.
 * Utiliza la función `getProgramaById` del servicio para obtener un solo programa.
 * 
 * @param {Object} req - El objeto de la solicitud HTTP, que contiene el ID del programa en los parámetros.
 * @param {Object} res - El objeto de la respuesta HTTP.
 */
export const findProgramaById = async (req, res) => {
  try {
    // Obtiene el programa por su ID desde los parámetros de la solicitud
    const data = await getProgramaById(req.params.id);
    // Responde con el programa encontrado y un mensaje de éxito
    res.status(200).json({ data, message: "Programa obtenido correctamente" });
  } catch (error) {
    // En caso de error, responde con el estado de error y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar programa"
    });
  }
};

/**
 * Controlador para crear un nuevo programa.
 * Usa la función `createPrograma` del servicio para crear un nuevo registro de programa.
 * 
 * @param {Object} req - El objeto de la solicitud HTTP, que debe contener los datos del nuevo programa en el cuerpo.
 * @param {Object} res - El objeto de la respuesta HTTP.
 */
export const createNewPrograma = async (req, res) => {
  try {
    // Crea un nuevo programa con los datos del cuerpo de la solicitud
    const data = await createPrograma(req.body);
    // Responde con los datos del programa creado y un mensaje de éxito
    res.status(201).json({ data, message: "Programa creado exitosamente" });
  } catch (error) {
    // En caso de error, responde con el estado de error y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear programa"
    });
  }
};

/**
 * Controlador para actualizar un programa existente.
 * Utiliza la función `updatePrograma` del servicio para actualizar un programa por su ID.
 * 
 * @param {Object} req - El objeto de la solicitud HTTP, que contiene el ID del programa en los parámetros y los datos de actualización en el cuerpo.
 * @param {Object} res - El objeto de la respuesta HTTP.
 */
export const updateExistingPrograma = async (req, res) => {
  try {
    // Actualiza el programa usando el ID de los parámetros y los datos del cuerpo de la solicitud
    const data = await updatePrograma(req.params.id, req.body);
    // Responde con los datos del programa actualizado y un mensaje de éxito
    res.status(200).json({ data, message: "Programa actualizado correctamente" });
  } catch (error) {
    // En caso de error, responde con el estado de error y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar programa"
    });
  }
};

/**
 * Controlador para eliminar un programa por su ID.
 * Utiliza la función `deletePrograma` del servicio para eliminar un programa existente.
 * 
 * @param {Object} req - El objeto de la solicitud HTTP, que contiene el ID del programa a eliminar en los parámetros.
 * @param {Object} res - El objeto de la respuesta HTTP.
 */
export const deleteProgramaById = async (req, res) => {
  try {
    // Elimina el programa utilizando el ID de los parámetros
    const result = await deletePrograma(req.params.id);
    // Responde con el resultado de la eliminación y un mensaje de éxito
    res.status(200).json({ data: result, message: "Programa eliminado correctamente" });
  } catch (error) {
    // En caso de error, responde con el estado de error y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar programa"
    });
  }
};
