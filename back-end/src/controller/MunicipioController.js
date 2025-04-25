// src/controllers/MunicipioController.js

// Importamos los servicios que contienen la lógica de negocio relacionada con "municipios"
import {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
} from "../services/MunicipioService.js";

/**
 * Controlador para obtener todos los municipios.
 * 
 * Responde con un array de municipios si la operación es exitosa.
 * Si ocurre un error, responde con el código de estado correspondiente y un mensaje descriptivo.
 * 
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 */
export const findAllMunicipios = async (req, res) => {
  try {
    const data = await getAllMunicipios();
    res.status(200).json({ data, message: "Municipios obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener municipios"
    });
  }
};

/**
 * Controlador para obtener un municipio específico por su ID.
 * 
 * El ID se obtiene desde los parámetros de la URL. 
 * Devuelve el municipio encontrado o un error si no existe o ocurre un problema.
 * 
 * @param {Object} req - Objeto de solicitud de Express con `params.id` como identificador del municipio.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const findMunicipioById = async (req, res) => {
  try {
    const data = await getMunicipioById(req.params.id);
    res.status(200).json({ data, message: "Municipio obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar municipio"
    });
  }
};

/**
 * Controlador para crear un nuevo municipio.
 * 
 * La información del municipio se recibe desde el cuerpo de la solicitud (`req.body`).
 * Devuelve el municipio creado con un estado 201 si es exitoso.
 * 
 * @param {Object} req - Objeto de solicitud de Express con los datos del nuevo municipio en `body`.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const createNewMunicipio = async (req, res) => {
  try {
    const data = await createMunicipio(req.body);
    res.status(201).json({ data, message: "Municipio creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear municipio"
    });
  }
};

/**
 * Controlador para actualizar un municipio existente.
 * 
 * Requiere un ID (desde `req.params.id`) y los nuevos datos (desde `req.body`).
 * Devuelve el municipio actualizado si es exitoso.
 * 
 * @param {Object} req - Objeto de solicitud de Express con ID y datos actualizados del municipio.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const updateExistingMunicipio = async (req, res) => {
  try {
    const data = await updateMunicipio(req.params.id, req.body);
    res.status(200).json({ data, message: "Municipio actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar municipio"
    });
  }
};

/**
 * Controlador para eliminar un municipio por su ID.
 * 
 * El ID se obtiene desde los parámetros de la URL.
 * Devuelve el resultado de la eliminación si es exitosa.
 * 
 * @param {Object} req - Objeto de solicitud de Express con el ID del municipio a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const deleteMunicipioById = async (req, res) => {
  try {
    const result = await deleteMunicipio(req.params.id);
    res.status(200).json({ data: result, message: "Municipio eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar municipio"
    });
  }
};
