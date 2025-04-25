// src/controllers/MemorandumController.js

// Importación de los servicios encargados de la lógica de negocio para memorandos
import {
  getAllMemorandos,
  getMemorandumById,
  createMemorandum,
  updateMemorandum,
  deleteMemorandum,
} from "../services/memorandumService.js";

/**
 * Controlador para obtener todos los memorandos.
 * Llama al servicio que retorna todos los registros y responde con los datos o un mensaje de error.
 *
 * @param {Object} req - Objeto de solicitud HTTP (no se utiliza en este controlador).
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const findAllMemorandos = async (req, res) => {
  try {
    const data = await getAllMemorandos(); // Obtiene todos los memorandos desde el servicio
    res.status(200).json({ data, message: "Memorandos obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500; // Código de estado personalizado o 500 por defecto
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener memorandos"
    });
  }
};

/**
 * Controlador para obtener un memorándum por su ID.
 * Llama al servicio que busca y devuelve el memorándum correspondiente.
 *
 * @param {Object} req - Objeto de solicitud HTTP con el ID del memorándum como parámetro de ruta.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const findMemorandumById = async (req, res) => {
  try {
    const data = await getMemorandumById(req.params.id); // Busca el memorándum por ID
    res.status(200).json({ data, message: "Memorándum obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar memorándum"
    });
  }
};

/**
 * Controlador para crear un nuevo memorándum.
 * Recibe los datos del cuerpo de la solicitud y los envía al servicio correspondiente.
 *
 * @param {Object} req - Objeto de solicitud HTTP con los datos del memorándum en el cuerpo.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const createNewMemorandum = async (req, res) => {
  try {
    const data = await createMemorandum(req.body); // Crea un nuevo memorándum con los datos recibidos
    res.status(201).json({ data, message: "Memorándum creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear memorándum"
    });
  }
};

/**
 * Controlador para actualizar un memorándum existente.
 * Usa el ID y los nuevos datos enviados en la solicitud para actualizar el registro.
 *
 * @param {Object} req - Objeto de solicitud HTTP con el ID en los parámetros y los nuevos datos en el cuerpo.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const updateExistingMemorandum = async (req, res) => {
  try {
    const data = await updateMemorandum(req.params.id, req.body); // Actualiza el memorándum con el ID y nuevos datos
    res.status(200).json({ data, message: "Memorándum actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar memorándum"
    });
  }
};

/**
 * Controlador para eliminar un memorándum por su ID.
 * Llama al servicio encargado de realizar la eliminación.
 *
 * @param {Object} req - Objeto de solicitud HTTP con el ID del memorándum a eliminar.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const deleteMemorandumById = async (req, res) => {
  try {
    const result = await deleteMemorandum(req.params.id); // Elimina el memorándum identificado por el ID
    res.status(200).json({ data: result, message: "Memorándum eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar memorándum"
    });
  }
};
