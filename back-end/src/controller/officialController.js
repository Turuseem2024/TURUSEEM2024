// src/controllers/FuncionarioController.js

// Importación de las funciones de servicio relacionadas con los funcionarios
import {
  getAllFuncionarios, // Función para obtener todos los funcionarios
  getFuncionarioById, // Función para obtener un funcionario por su ID
  createFuncionario, // Función para crear un nuevo funcionario
  updateFuncionario, // Función para actualizar un funcionario existente
  deleteFuncionario, // Función para eliminar un funcionario por su ID
} from "../services/officialService.js";

/**
 * Controlador para obtener todos los funcionarios.
 * Esta función maneja la petición GET para obtener la lista completa de funcionarios.
 * 
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {Object} - Respuesta JSON con los datos de los funcionarios o un mensaje de error.
 */
export const findAllFuncionarios = async (req, res) => {
  try {
    // Llamada al servicio para obtener todos los funcionarios
    const data = await getAllFuncionarios();
    // Responde con los datos de los funcionarios obtenidos y un mensaje de éxito
    res.status(200).json({ data, message: "Funcionarios obtenidos correctamente" });
  } catch (error) {
    // Manejo de errores, estableciendo un estado y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener funcionarios"
    });
  }
};

/**
 * Controlador para obtener un funcionario específico por su ID.
 * Esta función maneja la petición GET para obtener un funcionario por su ID.
 * 
 * @param {Object} req - Objeto de solicitud (request) que contiene el ID del funcionario.
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {Object} - Respuesta JSON con los datos del funcionario o un mensaje de error.
 */
export const findFuncionarioById = async (req, res) => {
  try {
    // Llamada al servicio para obtener el funcionario por su ID
    const data = await getFuncionarioById(req.params.id);
    // Responde con los datos del funcionario obtenido y un mensaje de éxito
    res.status(200).json({ data, message: "Funcionario obtenido correctamente" });
  } catch (error) {
    // Manejo de errores, estableciendo un estado y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar funcionario"
    });
  }
};

/**
 * Controlador para crear un nuevo funcionario.
 * Esta función maneja la petición POST para crear un nuevo funcionario.
 * 
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos del nuevo funcionario.
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {Object} - Respuesta JSON con los datos del funcionario creado o un mensaje de error.
 */
export const createNewFuncionario = async (req, res) => {
  try {
    // Llamada al servicio para crear un nuevo funcionario
    const data = await createFuncionario(req.body);
    // Responde con los datos del nuevo funcionario creado y un mensaje de éxito
    res.status(201).json({ data, message: "Funcionario creado exitosamente" });
  } catch (error) {
    // Manejo de errores, estableciendo un estado y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear funcionario"
    });
  }
};

/**
 * Controlador para actualizar un funcionario existente.
 * Esta función maneja la petición PUT para actualizar un funcionario por su ID.
 * 
 * @param {Object} req - Objeto de solicitud (request) que contiene el ID del funcionario y los datos a actualizar.
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {Object} - Respuesta JSON con los datos del funcionario actualizado o un mensaje de error.
 */
export const updateExistingFuncionario = async (req, res) => {
  try {
    // Llamada al servicio para actualizar el funcionario por su ID con los nuevos datos
    const data = await updateFuncionario(req.params.id, req.body);
    // Responde con los datos del funcionario actualizado y un mensaje de éxito
    res.status(200).json({ data, message: "Funcionario actualizado correctamente" });
  } catch (error) {
    // Manejo de errores, estableciendo un estado y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar funcionario"
    });
  }
};

/**
 * Controlador para eliminar un funcionario por su ID.
 * Esta función maneja la petición DELETE para eliminar un funcionario por su ID.
 * 
 * @param {Object} req - Objeto de solicitud (request) que contiene el ID del funcionario a eliminar.
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {Object} - Respuesta JSON con los resultados de la eliminación o un mensaje de error.
 */
export const deleteFuncionarioById = async (req, res) => {
  try {
    // Llamada al servicio para eliminar el funcionario por su ID
    const result = await deleteFuncionario(req.params.id);
    // Responde con el resultado de la eliminación y un mensaje de éxito
    res.status(200).json({ data: result, message: "Funcionario eliminado correctamente" });
  } catch (error) {
    // Manejo de errores, estableciendo un estado y mensaje adecuado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar funcionario"
    });
  }
};
