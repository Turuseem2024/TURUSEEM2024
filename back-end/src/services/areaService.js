// src/services/AreaService.js

// Importa el módulo 'fs' para manejo de archivos y 'path' para manipulación de rutas
import fs from "fs";
import path from "path";

// Importa el modelo de datos AreaModel, que representa la entidad 'Área' en la base de datos
import AreaModel from "../models/areaModel.js";

/**
 * Función auxiliar para registrar errores en un archivo de logs.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - Objeto de error capturado.
 */
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log"); // Ruta del archivo de log
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  
  // Crea el directorio de logs si no existe
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  
  // Agrega el mensaje de error al archivo
  fs.appendFileSync(logPath, logMessage);
};

/**
 * Obtiene todas las áreas almacenadas en la base de datos.
 * @returns {Promise<Array>} - Lista de áreas.
 * @throws {Object} - Error con estado y mensaje en caso de fallo.
 */
export async function getAllAreas() {
  try {
    const areas = await AreaModel.findAll(); // Consulta todas las áreas
    return areas;
  } catch (error) {
    logErrorToFile("getAllAreas", error); // Registra el error
    throw { status: 500, message: `Error al obtener áreas: ${error.message}` };
  }
}

/**
 * Obtiene una única área según su ID.
 * @param {number|string} id - ID del área.
 * @returns {Promise<Object>} - Objeto área.
 * @throws {Object} - Error con estado y mensaje en caso de fallo.
 */
export async function getAreaById(id) {
  try {
    // Validación del ID
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");

    const area = await AreaModel.findByPk(id); // Busca el área por clave primaria
    if (!area) throw new Error("Área no encontrada");

    return area;
  } catch (error) {
    logErrorToFile("getAreaById", error); // Registra el error
    throw { status: 404, message: `Error al obtener área: ${error.message}` };
  }
}

/**
 * Crea una nueva área en la base de datos.
 * @param {Object} data - Datos de la nueva área.
 * @param {string} data.Nom_Area - Nombre del área.
 * @returns {Promise<Object>} - Objeto del área creada.
 * @throws {Object} - Error con estado y mensaje en caso de fallo.
 */
export async function createArea(data) {
  try {
    // Validación de datos
    if (!data || typeof data.Nom_Area !== 'string' || !data.Nom_Area.trim()) {
      throw new Error("Datos incompletos o inválidos para crear área");
    }

    const nuevaArea = await AreaModel.create(data); // Crea el nuevo registro
    return nuevaArea;
  } catch (error) {
    logErrorToFile("createArea", error); // Registra el error
    throw { status: 400, message: `Error al crear área: ${error.message}` };
  }
}

/**
 * Actualiza los datos de un área existente.
 * @param {number|string} id - ID del área a actualizar.
 * @param {Object} data - Nuevos datos del área.
 * @returns {Promise<Object>} - Objeto del área actualizada.
 * @throws {Object} - Error con estado y mensaje en caso de fallo.
 */
export async function updateArea(id, data) {
  try {
    // Validaciones de entrada
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const area = await AreaModel.findByPk(id); // Busca el área por ID
    if (!area) throw new Error("Área no encontrada");

    const areaActualizada = await area.update(data); // Actualiza los datos del área
    return areaActualizada;
  } catch (error) {
    logErrorToFile("updateArea", error); // Registra el error
    throw { status: 400, message: `Error al actualizar área: ${error.message}` };
  }
}

/**
 * Elimina un área existente de la base de datos.
 * @param {number|string} id - ID del área a eliminar.
 * @returns {Promise<Object>} - Mensaje de confirmación.
 * @throws {Object} - Error con estado y mensaje en caso de fallo.
 */
export async function deleteArea(id) {
  try {
    // Validación del ID
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    const area = await AreaModel.findByPk(id); // Busca el área por ID
    if (!area) throw new Error("Área no encontrada");

    await area.destroy(); // Elimina el registro
    return { message: "Área eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteArea", error); // Registra el error
    throw { status: 400, message: `Error al eliminar área: ${error.message}` };
  }
}
