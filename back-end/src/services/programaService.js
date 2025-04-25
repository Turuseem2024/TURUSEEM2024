// src/services/ProgramaService.js

// Importación de módulos necesarios
import fs from "fs"; // Módulo para trabajar con el sistema de archivos
import path from "path"; // Módulo para trabajar con rutas de archivos y directorios
import ProgramaModel from "../models/programaModel.js"; // Modelo de Programa
import AreaModel from "../models/areaModel.js"; // Modelo de Área

/**
 * Función que registra errores en un archivo de log.
 * @param {string} functionName - El nombre de la función que genera el error.
 * @param {Error} error - El objeto error que contiene detalles sobre el error.
 */
const logErrorToFile = (functionName, error) => {
  // Ruta donde se guardarán los logs de errores
  const logPath = path.resolve("logs", "errores.log");

  // Mensaje de log con la fecha y hora actual, el nombre de la función y el error
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;

  // Crear el directorio de logs si no existe
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  // Escribir el mensaje de error en el archivo de logs
  fs.appendFileSync(logPath, logMessage);
};

/**
 * Obtiene todos los programas de la base de datos.
 * @returns {Promise<Array>} - Una lista de todos los programas.
 * @throws {Object} - Si ocurre un error, lanza un objeto con el mensaje de error y el código de estado 500.
 */
export async function getAllProgramas() {
  try {
    // Buscar todos los programas en la base de datos
    const programas = await ProgramaModel.findAll();
    return programas;
  } catch (error) {
    // En caso de error, registrar el error en el archivo de logs y lanzar una excepción
    logErrorToFile("getAllProgramas", error);
    throw { status: 500, message: `Error al obtener programas: ${error.message}` };
  }
}

/**
 * Obtiene un programa por su ID.
 * @param {number} id - El ID del programa que se desea obtener.
 * @returns {Promise<Object>} - El programa encontrado.
 * @throws {Object} - Si no se encuentra el programa o si el ID es inválido, lanza un error con código 404.
 */
export async function getProgramaById(id) {
  try {
    // Verificar si el ID es válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");

    // Buscar el programa por ID
    const programa = await ProgramaModel.findByPk(id);

    // Si no se encuentra el programa, lanzar un error
    if (!programa) throw new Error("Programa no encontrado");

    return programa;
  } catch (error) {
    // En caso de error, registrar el error en el archivo de logs y lanzar una excepción
    logErrorToFile("getProgramaById", error);
    throw { status: 404, message: `Error al obtener programa: ${error.message}` };
  }
}

/**
 * Crea un nuevo programa en la base de datos.
 * @param {Object} data - Los datos del nuevo programa a crear.
 * @returns {Promise<Object>} - El programa creado.
 * @throws {Object} - Si los datos son inválidos o hay un error, lanza un error con código 400.
 */
export async function createPrograma(data) {
  try {
    // Validar los datos de entrada
    if (!data || typeof data.Nom_Programa !== 'string' || !data.Nom_Programa.trim()) {
      throw new Error("Nombre de programa inválido");
    }
    
    if (!['TECNICO', 'TECNOLOGO'].includes(data.Tip_Programa)) {
      throw new Error("Tipo de programa inválido");
    }
    
    if (!['ACTIVO', 'INACTIVO'].includes(data.Est_Programa)) {
      throw new Error("Estado de programa inválido");
    }
    
    if (!data.Id_Area || isNaN(Number(data.Id_Area))) {
      throw new Error("ID de Área inválido");
    }

    // Verificar que el área asociada al programa exista
    const area = await AreaModel.findByPk(data.Id_Area);
    if (!area) throw new Error("Área asociada no encontrada");

    // Crear el nuevo programa en la base de datos
    const nuevoPrograma = await ProgramaModel.create(data);
    return nuevoPrograma;
  } catch (error) {
    // En caso de error, registrar el error en el archivo de logs y lanzar una excepción
    logErrorToFile("createPrograma", error);
    throw { status: 400, message: `Error al crear programa: ${error.message}` };
  }
}

/**
 * Actualiza los datos de un programa existente.
 * @param {number} id - El ID del programa a actualizar.
 * @param {Object} data - Los nuevos datos para actualizar el programa.
 * @returns {Promise<Object>} - El programa actualizado.
 * @throws {Object} - Si el ID es inválido o el programa no se encuentra, lanza un error con código 400.
 */
export async function updatePrograma(id, data) {
  try {
    // Verificar si el ID es válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");

    // Verificar que los datos de actualización sean válidos
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    // Buscar el programa por ID
    const programa = await ProgramaModel.findByPk(id);
    if (!programa) throw new Error("Programa no encontrado");

    // Validar el tipo de programa si es proporcionado
    if (data.Tip_Programa && !['TECNICO', 'TECNOLOGO'].includes(data.Tip_Programa)) {
      throw new Error("Tipo de programa inválido");
    }
    
    // Validar el estado de programa si es proporcionado
    if (data.Est_Programa && !['ACTIVO', 'INACTIVO'].includes(data.Est_Programa)) {
      throw new Error("Estado de programa inválido");
    }

    // Verificar si el ID de área es válido
    if (data.Id_Area) {
      const area = await AreaModel.findByPk(data.Id_Area);
      if (!area) throw new Error("Área asociada no encontrada");
    }

    // Actualizar el programa en la base de datos
    const programaActualizado = await programa.update(data);
    return programaActualizado;
  } catch (error) {
    // En caso de error, registrar el error en el archivo de logs y lanzar una excepción
    logErrorToFile("updatePrograma", error);
    throw { status: 400, message: `Error al actualizar programa: ${error.message}` };
  }
}

/**
 * Elimina un programa por su ID.
 * @param {number} id - El ID del programa que se desea eliminar.
 * @returns {Promise<Object>} - Un objeto con un mensaje de confirmación de eliminación.
 * @throws {Object} - Si el ID es inválido o el programa no se encuentra, lanza un error con código 400.
 */
export async function deletePrograma(id) {
  try {
    // Verificar si el ID es válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    // Buscar el programa por ID
    const programa = await ProgramaModel.findByPk(id);
    if (!programa) throw new Error("Programa no encontrado");

    // Eliminar el programa de la base de datos
    await programa.destroy();

    // Retornar un mensaje de confirmación
    return { message: "Programa eliminado correctamente" };
  } catch (error) {
    // En caso de error, registrar el error en el archivo de logs y lanzar una excepción
    logErrorToFile("deletePrograma", error);
    throw { status: 400, message: `Error al eliminar programa: ${error.message}` };
  }
}
