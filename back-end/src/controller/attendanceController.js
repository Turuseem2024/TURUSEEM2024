// src/controllers/AsistenciaController.js

// Importación de los servicios que gestionan la lógica de negocio relacionada con asistencias
import {
  getAllAsistencias,
  getAsistenciaById,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
} from "../services/asistenciaService.js";

/**
 * Controlador para obtener todas las asistencias.
 * Llama al servicio correspondiente y responde con los datos o un error.
 *
 * @param {Object} req - Objeto de solicitud HTTP (no se utiliza en este caso).
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const findAllAsistencias = async (req, res) => {
  try {
    const data = await getAllAsistencias(); // Se obtiene la lista de todas las asistencias
    res.status(200).json({ data, message: "Asistencias obtenidas correctamente" });
  } catch (error) {
    const status = error.status || 500; // Se utiliza el status del error si existe, o 500 por defecto
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener asistencias"
    });
  }
};

/**
 * Controlador para obtener una asistencia por su ID.
 * Llama al servicio que busca una asistencia específica.
 *
 * @param {Object} req - Objeto de solicitud HTTP con el ID como parámetro de ruta.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const findAsistenciaById = async (req, res) => {
  try {
    const data = await getAsistenciaById(req.params.id); // Se obtiene la asistencia por ID
    res.status(200).json({ data, message: "Asistencia obtenida correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar asistencia"
    });
  }
};

/**
 * Controlador para crear una nueva asistencia.
 * Recibe los datos por el cuerpo de la solicitud y los pasa al servicio correspondiente.
 *
 * @param {Object} req - Objeto de solicitud HTTP con los datos de la asistencia en el cuerpo.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const createNewAsistencia = async (req, res) => {
  try {
    const data = await createAsistencia(req.body); // Se crea una nueva asistencia con los datos enviados
    res.status(201).json({ data, message: "Asistencia creada exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear asistencia"
    });
  }
};

/**
 * Controlador para actualizar una asistencia existente.
 * Utiliza el ID de los parámetros y los nuevos datos del cuerpo para realizar la actualización.
 *
 * @param {Object} req - Objeto de solicitud HTTP con el ID en los parámetros y datos en el cuerpo.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const updateExistingAsistencia = async (req, res) => {
  try {
    const data = await updateAsistencia(req.params.id, req.body); // Se actualiza la asistencia con ID y datos nuevos
    res.status(200).json({ data, message: "Asistencia actualizada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar asistencia"
    });
  }
};

/**
 * Controlador para eliminar una asistencia por su ID.
 * Llama al servicio encargado de eliminar la asistencia específica.
 *
 * @param {Object} req - Objeto de solicitud HTTP con el ID de la asistencia a eliminar.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const deleteAsistenciaById = async (req, res) => {
  try {
    const result = await deleteAsistencia(req.params.id); // Se elimina la asistencia por su ID
    res.status(200).json({ data: result, message: "Asistencia eliminada correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar asistencia"
    });
  }
};
