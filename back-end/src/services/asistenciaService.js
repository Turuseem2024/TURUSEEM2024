// src/services/AsistenciaService.js

import fs from "fs";
import path from "path";
import AsistenciaModel from "../models/attendaceModel.js";

/**
 * Registra un error en un archivo de log.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - Objeto de error capturado.
 */
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log"); // Ruta del archivo de log
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true }); // Asegura que el directorio exista
  fs.appendFileSync(logPath, logMessage); // Agrega el error al archivo
};

/**
 * Obtiene todas las asistencias registradas en la base de datos.
 * @returns {Promise<Array>} - Lista de asistencias.
 */
export async function getAllAsistencias() {
  try {
    const asistencias = await AsistenciaModel.findAll();
    return asistencias;
  } catch (error) {
    logErrorToFile("getAllAsistencias", error);
    throw { status: 500, message: `Error al obtener asistencias: ${error.message}` };
  }
}

/**
 * Obtiene una asistencia específica por su ID.
 * @param {number|string} id - ID de la asistencia a buscar.
 * @returns {Promise<Object>} - Objeto de asistencia.
 */
export async function getAsistenciaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");

    const asistencia = await AsistenciaModel.findByPk(id);
    if (!asistencia) throw new Error("Asistencia no encontrada");

    return asistencia;
  } catch (error) {
    logErrorToFile("getAsistenciaById", error);
    throw { status: 404, message: `Error al obtener asistencia: ${error.message}` };
  }
}

/**
 * Crea una nueva asistencia en la base de datos.
 * @param {Object} data - Datos de la nueva asistencia.
 * @param {number|string} data.Id_Asistencia - ID único de la asistencia.
 * @param {string} data.Fec_Asistencia - Fecha de la asistencia (formato ISO recomendado).
 * @param {string} data.Tip_Asistencia - Tipo de asistencia: "incapacidad", "permiso" o "calamidad".
 * @param {string} [data.Mot_Asistencia] - Motivo de la asistencia (opcional).
 * @returns {Promise<Object>} - Objeto de la asistencia creada.
 */
export async function createAsistencia(data) {
  try {
    // Validación del ID (obligatorio, no autoincremental)
    if (!data || !data.Id_Asistencia) {
      throw new Error("Id de asistencia requerida");
    }

    // Validación de la fecha (obligatoria)
    if (!data.Fec_Asistencia) {
      throw new Error("Fecha de asistencia requerida");
    }

    // Validación del tipo (solo se permiten ciertos valores)
    if (!['incapacidad', 'permiso', 'calamidad'].includes(data.Tip_Asistencia)) {
      throw new Error("Tipo de asistencia inválido");
    }

    // Validación del motivo si está presente
    if (data.Mot_Asistencia && (typeof data.Mot_Asistencia !== 'string' || !data.Mot_Asistencia.trim())) {
      throw new Error("Motivo de asistencia inválido");
    }

    // Creación del registro
    const nuevaAsistencia = await AsistenciaModel.create({
      Id_Asistencia: data.Id_Asistencia,
      Fec_Asistencia: data.Fec_Asistencia,
      Tip_Asistencia: data.Tip_Asistencia,
      Mot_Asistencia: data.Mot_Asistencia?.trim() || null
    });

    return nuevaAsistencia;
  } catch (error) {
    logErrorToFile("createAsistencia", error);
    throw { status: 400, message: `Error al crear asistencia: ${error.message}` };
  }
}

/**
 * Actualiza una asistencia existente.
 * @param {number|string} id - ID de la asistencia a actualizar.
 * @param {Object} data - Nuevos datos de la asistencia.
 * @param {string} [data.Fec_Asistencia] - Nueva fecha de asistencia.
 * @param {string} [data.Tip_Asistencia] - Nuevo tipo de asistencia.
 * @param {string} [data.Mot_Asistencia] - Nuevo motivo de asistencia.
 * @returns {Promise<Object>} - Objeto de la asistencia actualizada.
 */
export async function updateAsistencia(id, data) {
  try {
    // Validación del ID
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");

    // Validación del objeto de datos
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    // Búsqueda de la asistencia
    const asistencia = await AsistenciaModel.findByPk(id);
    if (!asistencia) throw new Error("Asistencia no encontrada");

    // Validación del nuevo tipo si se proporciona
    if (data.Tip_Asistencia && !['incapacidad', 'permiso', 'calamidad'].includes(data.Tip_Asistencia)) {
      throw new Error("Tipo de asistencia inválido");
    }

    // Validación del nuevo motivo si se proporciona
    if (data.Mot_Asistencia && (typeof data.Mot_Asistencia !== 'string' || !data.Mot_Asistencia.trim())) {
      throw new Error("Motivo de asistencia inválido");
    }

    // Actualización del registro
    const asistenciaActualizada = await asistencia.update({
      Fec_Asistencia: data.Fec_Asistencia || asistencia.Fec_Asistencia,
      Tip_Asistencia: data.Tip_Asistencia || asistencia.Tip_Asistencia,
      Mot_Asistencia: data.Mot_Asistencia?.trim() || asistencia.Mot_Asistencia
    });

    return asistenciaActualizada;
  } catch (error) {
    logErrorToFile("updateAsistencia", error);
    throw { status: 400, message: `Error al actualizar asistencia: ${error.message}` };
  }
}

/**
 * Elimina una asistencia de la base de datos.
 * @param {number|string} id - ID de la asistencia a eliminar.
 * @returns {Promise<Object>} - Mensaje de éxito si se elimina correctamente.
 */
export async function deleteAsistencia(id) {
  try {
    // Validación del ID
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    // Búsqueda de la asistencia
    const asistencia = await AsistenciaModel.findByPk(id);
    if (!asistencia) throw new Error("Asistencia no encontrada");

    // Eliminación del registro
    await asistencia.destroy();
    return { message: "Asistencia eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteAsistencia", error);
    throw { status: 400, message: `Error al eliminar asistencia: ${error.message}` };
  }
}
