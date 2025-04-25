// src/controllers/ParametroController.js

// Importación de las funciones del servicio de parámetros
import {
  getAllParametros,       // Función para obtener todos los parámetros
  getParametroById,       // Función para obtener un parámetro por su ID
  createParametro,        // Función para crear un nuevo parámetro
  updateParametro,        // Función para actualizar un parámetro existente
  deleteParametro,        // Función para eliminar un parámetro
  getParametro            // Función para obtener un parámetro por su nombre
} from "../services/ParametroService.js";

/**
 * Controlador que maneja la solicitud de obtener todos los parámetros.
 * 
 * @param {Object} req - La solicitud HTTP recibida.
 * @param {Object} res - La respuesta HTTP que será enviada.
 * @returns {Object} Respuesta con los parámetros obtenidos o mensaje de error.
 */
export const findAllParametros = async (req, res) => {
  try {
    // Llamada al servicio para obtener todos los parámetros
    const data = await getAllParametros();
    
    // Respuesta exitosa con los parámetros obtenidos
    res.status(200).json({ data, message: "Parámetros obtenidos correctamente" });
  } catch (error) {
    // Captura de cualquier error y manejo de la respuesta de error
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener parámetros"
    });
  }
};

/**
 * Controlador que maneja la solicitud de obtener un parámetro por su ID.
 * 
 * @param {Object} req - La solicitud HTTP recibida.
 * @param {Object} res - La respuesta HTTP que será enviada.
 * @returns {Object} Respuesta con el parámetro obtenido o mensaje de error.
 */
export const findParametroById = async (req, res) => {
  try {
    // Llamada al servicio para obtener el parámetro por su ID
    const data = await getParametroById(req.params.id);
    
    // Respuesta exitosa con el parámetro obtenido
    res.status(200).json({ data, message: "Parámetro obtenido correctamente" });
  } catch (error) {
    // Captura de cualquier error y manejo de la respuesta de error
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar parámetro"
    });
  }
};

/**
 * Controlador que maneja la solicitud de obtener un parámetro por su nombre.
 * 
 * @param {Object} req - La solicitud HTTP recibida.
 * @param {Object} res - La respuesta HTTP que será enviada.
 * @returns {Object} Respuesta con el parámetro obtenido o mensaje de error.
 */
export const findParametroByName = async (req, res) => {
  try {
    // Desestructuración del parámetro nombre desde los parámetros de la URL
    const { nombre } = req.params;
    
    // Llamada al servicio para obtener el parámetro por nombre
    const data = await getParametro(nombre);
    
    // Respuesta exitosa con el parámetro obtenido
    res.status(200).json({ data, message: "Parámetro obtenido correctamente" });
  } catch (error) {
    // Captura de cualquier error y manejo de la respuesta de error
    const status = error.status || 500;
    res.status(status).json({
      data: null,
      message: error.message || "Error interno al buscar parámetro por nombre"
    });
  }
};

/**
 * Controlador que maneja la solicitud de crear un nuevo parámetro.
 * 
 * @param {Object} req - La solicitud HTTP recibida, contiene los datos del nuevo parámetro en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP que será enviada.
 * @returns {Object} Respuesta confirmando la creación del parámetro o mensaje de error.
 */
export const createNewParametro = async (req, res) => {
  try {
    // Llamada al servicio para crear el nuevo parámetro con los datos recibidos en el cuerpo de la solicitud
    const data = await createParametro(req.body);
    
    // Respuesta exitosa confirmando la creación del parámetro
    res.status(201).json({ data, message: "Parámetro creado exitosamente" });
  } catch (error) {
    // Captura de cualquier error y manejo de la respuesta de error
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear parámetro"
    });
  }
};

/**
 * Controlador que maneja la solicitud de actualizar un parámetro existente por su ID.
 * 
 * @param {Object} req - La solicitud HTTP recibida, contiene el ID del parámetro a actualizar en los parámetros de la URL y los nuevos datos en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP que será enviada.
 * @returns {Object} Respuesta confirmando la actualización del parámetro o mensaje de error.
 */
export const updateExistingParametro = async (req, res) => {
  try {
    // Llamada al servicio para actualizar el parámetro con el ID recibido en los parámetros de la URL y los nuevos datos en el cuerpo de la solicitud
    const data = await updateParametro(req.params.id, req.body);
    
    // Respuesta exitosa confirmando la actualización del parámetro
    res.status(200).json({ data, message: "Parámetro actualizado correctamente" });
  } catch (error) {
    // Captura de cualquier error y manejo de la respuesta de error
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar parámetro"
    });
  }
};

/**
 * Controlador que maneja la solicitud de eliminar un parámetro por su ID.
 * 
 * @param {Object} req - La solicitud HTTP recibida, contiene el ID del parámetro a eliminar en los parámetros de la URL.
 * @param {Object} res - La respuesta HTTP que será enviada.
 * @returns {Object} Respuesta confirmando la eliminación del parámetro o mensaje de error.
 */
export const deleteParametroById = async (req, res) => {
  try {
    // Llamada al servicio para eliminar el parámetro con el ID recibido en los parámetros de la URL
    const result = await deleteParametro(req.params.id);
    
    // Respuesta exitosa confirmando la eliminación del parámetro
    res.status(200).json({ data: result, message: "Parámetro eliminado correctamente" });
  } catch (error) {
    // Captura de cualquier error y manejo de la respuesta de error
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar parámetro"
    });
  }
};
