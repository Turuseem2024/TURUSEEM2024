// src/services/AreaAAreaService.js

import fs from "fs";
import path from "path";
import AreaAAreaModel from "../models/AreaAAreaModel.js";
import AreaModel from "../models/areaModel.js";

/**
 * Función auxiliar para registrar errores en un archivo de log.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - Objeto de error a registrar.
 */
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true }); // Asegura que el directorio exista
  fs.appendFileSync(logPath, logMessage); // Añade el mensaje de error al archivo
};

// Valores válidos permitidos para el campo ENUM `Area_Asignada`
const AREAS_PERMITIDAS = [
  "AGRICOLA",
  "AGROINDUSTRIA",
  "GESTION AMBIENTAL",
  "GESTION ADMINISTRATIVA",
  "MECANIZACION",
  "PECUARIA"
];

/**
 * Obtiene todas las relaciones entre áreas desde la base de datos.
 * @returns {Promise<Array>} - Lista de relaciones entre áreas.
 */
export async function getAllAreasAArea() {
  try {
    const relaciones = await AreaAAreaModel.findAll();
    return relaciones;
  } catch (error) {
    logErrorToFile("getAllAreasAArea", error);
    throw { status: 500, message: `Error al obtener relaciones entre áreas: ${error.message}` };
  }
}

/**
 * Obtiene una relación específica entre áreas por su ID.
 * @param {number|string} id - ID de la relación.
 * @returns {Promise<Object>} - Objeto de relación encontrada.
 */
export async function getAreaAAreaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const relacion = await AreaAAreaModel.findByPk(id);
    if (!relacion) throw new Error("Relación entre áreas no encontrada");
    return relacion;
  } catch (error) {
    logErrorToFile("getAreaAAreaById", error);
    throw { status: 404, message: `Error al obtener relación entre áreas: ${error.message}` };
  }
}

/**
 * Crea una nueva relación entre áreas en la base de datos.
 * @param {Object} data - Datos para la nueva relación.
 * @param {string} data.Area_Asignada - Área asignada (debe ser válida).
 * @param {number} data.Id_Area - ID del área principal (debe existir).
 * @returns {Promise<Object>} - Relación creada.
 */
export async function createAreaAArea(data) {
  try {
    // Validaciones de entrada
    if (!data || !AREAS_PERMITIDAS.includes(data.Area_Asignada)) {
      throw new Error("Área asignada inválida o no proporcionada");
    }
    
    if (!data.Id_Area || isNaN(Number(data.Id_Area))) {
      throw new Error("ID de Área inválido");
    }

    // Verifica existencia del área principal
    const area = await AreaModel.findByPk(data.Id_Area);
    if (!area) throw new Error("Área principal no encontrada");

    // Crea y retorna la nueva relación
    const nuevaRelacion = await AreaAAreaModel.create(data);
    return nuevaRelacion;
  } catch (error) {
    logErrorToFile("createAreaAArea", error);
    throw { status: 400, message: `Error al crear relación entre áreas: ${error.message}` };
  }
}

/**
 * Actualiza una relación existente entre áreas.
 * @param {number|string} id - ID de la relación a actualizar.
 * @param {Object} data - Campos a actualizar.
 * @returns {Promise<Object>} - Relación actualizada.
 */
export async function updateAreaAArea(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const relacion = await AreaAAreaModel.findByPk(id);
    if (!relacion) throw new Error("Relación entre áreas no encontrada");

    // Valida el campo Area_Asignada si está presente
    if (data.Area_Asignada && !AREAS_PERMITIDAS.includes(data.Area_Asignada)) {
      throw new Error("Área asignada inválida");
    }

    // Valida el campo Id_Area si está presente
    if (data.Id_Area) {
      const area = await AreaModel.findByPk(data.Id_Area);
      if (!area) throw new Error("Área principal no encontrada");
    }

    // Realiza y retorna la actualización
    const relacionActualizada = await relacion.update(data);
    return relacionActualizada;
  } catch (error) {
    logErrorToFile("updateAreaAArea", error);
    throw { status: 400, message: `Error al actualizar relación entre áreas: ${error.message}` };
  }
}

/**
 * Elimina una relación entre áreas por su ID.
 * @param {number|string} id - ID de la relación a eliminar.
 * @returns {Promise<Object>} - Mensaje de confirmación.
 */
export async function deleteAreaAArea(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    const relacion = await AreaAAreaModel.findByPk(id);
    if (!relacion) throw new Error("Relación entre áreas no encontrada");

    await relacion.destroy();

    return { message: "Relación entre áreas eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteAreaAArea", error);
    throw { status: 400, message: `Error al eliminar relación entre áreas: ${error.message}` };
  }
}
