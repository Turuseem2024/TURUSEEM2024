// src/services/UnidadService.js

// Importación de módulos necesarios
import fs from "fs"; // Módulo para trabajar con el sistema de archivos
import path from "path"; // Módulo para manejar rutas de archivos
import UnitModel from "../models/unitModel.js"; // Modelo para las unidades
import AreaModel from "../models/areaModel.js"; // Modelo para las áreas

/**
 * Función para registrar errores en un archivo de log.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - Objeto de error con la información detallada del error.
 */
const logErrorToFile = (functionName, error) => {
  // Ruta del archivo de log donde se almacenan los errores
  const logPath = path.resolve("logs", "errores.log");

  // Formato del mensaje de error que se almacenará en el log
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;

  // Crear directorios si no existen
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  // Escribir el mensaje de error en el archivo de log
  fs.appendFileSync(logPath, logMessage);
};

/**
 * Función para obtener todas las unidades.
 * @returns {Promise} - Una promesa que devuelve todas las unidades.
 */
export async function getAllUnidades() {
  try {
    // Obtener todas las unidades desde la base de datos
    const unidades = await UnitModel.findAll();
    return unidades; // Retornar las unidades obtenidas
  } catch (error) {
    // Si ocurre un error, se registra en el log y se lanza un error con mensaje
    logErrorToFile("getAllUnidades", error);
    throw { status: 500, message: `Error al obtener unidades: ${error.message}` };
  }
}

/**
 * Función para obtener una unidad por su ID.
 * @param {number} id - ID de la unidad a obtener.
 * @returns {Promise} - Una promesa que devuelve la unidad correspondiente al ID.
 */
export async function getUnidadById(id) {
  try {
    // Validar si el ID es válido (número)
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");

    // Buscar la unidad por su clave primaria (ID)
    const unidad = await UnitModel.findByPk(id);

    // Si no se encuentra la unidad, se lanza un error
    if (!unidad) throw new Error("Unidad no encontrada");

    return unidad; // Retornar la unidad encontrada
  } catch (error) {
    // Registrar el error y lanzar un error con mensaje adecuado
    logErrorToFile("getUnidadById", error);
    throw { status: 404, message: `Error al obtener unidad: ${error.message}` };
  }
}

/**
 * Función para crear una nueva unidad.
 * @param {Object} data - Datos de la nueva unidad a crear.
 * @returns {Promise} - Una promesa que devuelve la unidad creada.
 */
export async function createUnidad(data) {
  try {
    // Validación de campos requeridos para la creación de la unidad
    if (!data || typeof data.Nom_Unidad !== 'string' || !data.Nom_Unidad.trim()) {
      throw new Error("Nombre de unidad inválido");
    }

    // Validar si los horarios de apertura y cierre están completos
    if (!data.Hora_Apertura || !data.Hora_Cierre) {
      throw new Error("Horarios incompletos");
    }

    // Validar si el estado de la unidad es válido
    if (!['ACTIVO', 'INACTIVO'].includes(data.Est_Unidad)) {
      throw new Error("Estado de unidad inválido");
    }

    // Validar si el ID del área es válido
    if (!data.Id_Area || isNaN(Number(data.Id_Area))) {
      throw new Error("ID de Área inválido");
    }

    // Validar que el área exista en la base de datos
    const area = await AreaModel.findByPk(data.Id_Area);
    if (!area) throw new Error("Área asociada no encontrada");

    // Crear la nueva unidad en la base de datos
    const nuevaUnidad = await UnitModel.create(data);
    return nuevaUnidad; // Retornar la unidad creada
  } catch (error) {
    // Registrar el error y lanzar un error con mensaje adecuado
    logErrorToFile("createUnidad", error);
    throw { status: 400, message: `Error al crear unidad: ${error.message}` };
  }
}

/**
 * Función para actualizar una unidad existente.
 * @param {number} id - ID de la unidad a actualizar.
 * @param {Object} data - Nuevos datos para actualizar la unidad.
 * @returns {Promise} - Una promesa que devuelve la unidad actualizada.
 */
export async function updateUnidad(id, data) {
  try {
    // Validar si el ID es válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");

    // Validar que los datos para actualización sean válidos
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    // Buscar la unidad por su ID
    const unidad = await UnitModel.findByPk(id);
    if (!unidad) throw new Error("Unidad no encontrada");

    // Validar estado de la unidad si se incluye en la actualización
    if (data.Est_Unidad && !['ACTIVO', 'INACTIVO'].includes(data.Est_Unidad)) {
      throw new Error("Estado de unidad inválido");
    }

    // Validar existencia del área si se actualiza
    if (data.Id_Area) {
      const area = await AreaModel.findByPk(data.Id_Area);
      if (!area) throw new Error("Área asociada no encontrada");
    }

    // Actualizar la unidad con los nuevos datos
    const unidadActualizada = await unidad.update(data);
    return unidadActualizada; // Retornar la unidad actualizada
  } catch (error) {
    // Registrar el error y lanzar un error con mensaje adecuado
    logErrorToFile("updateUnidad", error);
    throw { status: 400, message: `Error al actualizar unidad: ${error.message}` };
  }
}

/**
 * Función para eliminar una unidad por su ID.
 * @param {number} id - ID de la unidad a eliminar.
 * @returns {Promise} - Un objeto con un mensaje de éxito.
 */
export async function deleteUnidad(id) {
  try {
    // Validar si el ID es válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    // Buscar la unidad por su ID
    const unidad = await UnitModel.findByPk(id);
    if (!unidad) throw new Error("Unidad no encontrada");

    // Eliminar la unidad de la base de datos
    await unidad.destroy();
    return { message: "Unidad eliminada correctamente" }; // Retornar mensaje de éxito
  } catch (error) {
    // Registrar el error y lanzar un error con mensaje adecuado
    logErrorToFile("deleteUnidad", error);
    throw { status: 400, message: `Error al eliminar unidad: ${error.message}` };
  }
}
