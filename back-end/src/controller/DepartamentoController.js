// src/controllers/DepartamentoController.js

// Importación de funciones del servicio de departamentos
import {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from "../services/DepartamentoService.js";

/**
 * Controlador para obtener todos los departamentos.
 * Método HTTP: GET
 * Ruta: /departamentos
 */
export const findAllDepartamentos = async (req, res) => {
  try {
    // Obtiene todos los departamentos desde el servicio
    const data = await getAllDepartamentos();

    // Responde con los datos obtenidos y un mensaje de éxito
    res.status(200).json({ data, message: "Departamentos obtenidos correctamente" });
  } catch (error) {
    // Manejo de errores con código de estado y mensaje personalizado
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener departamentos"
    });
  }
};

/**
 * Controlador para obtener un departamento por su ID.
 * Método HTTP: GET
 * Ruta: /departamentos/:id
 */
export const findDepartamentoById = async (req, res) => {
  try {
    // Obtiene un departamento específico usando el ID desde los parámetros de la URL
    const data = await getDepartamentoById(req.params.id);

    // Responde con los datos del departamento y un mensaje de éxito
    res.status(200).json({ data, message: "Departamento obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar departamento"
    });
  }
};

/**
 * Controlador para crear un nuevo departamento.
 * Método HTTP: POST
 * Ruta: /departamentos
 */
export const createNewDepartamento = async (req, res) => {
  try {
    // Crea un nuevo departamento con los datos recibidos en el cuerpo de la solicitud
    const data = await createDepartamento(req.body);

    // Responde con el nuevo departamento creado y un mensaje de éxito
    res.status(201).json({ data, message: "Departamento creado exitosamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear departamento"
    });
  }
};

/**
 * Controlador para actualizar un departamento existente por su ID.
 * Método HTTP: PUT / PATCH
 * Ruta: /departamentos/:id
 */
export const updateExistingDepartamento = async (req, res) => {
  try {
    // Actualiza un departamento específico usando el ID y los nuevos datos del cuerpo de la solicitud
    const data = await updateDepartamento(req.params.id, req.body);

    // Responde con los datos actualizados y un mensaje de éxito
    res.status(200).json({ data, message: "Departamento actualizado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar departamento"
    });
  }
};

/**
 * Controlador para eliminar un departamento por su ID.
 * Método HTTP: DELETE
 * Ruta: /departamentos/:id
 */
export const deleteDepartamentoById = async (req, res) => {
  try {
    // Elimina el departamento usando el ID proporcionado en los parámetros
    const result = await deleteDepartamento(req.params.id);

    // Responde con el resultado de la eliminación y un mensaje de éxito
    res.status(200).json({ data: result, message: "Departamento eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar departamento"
    });
  }
};
