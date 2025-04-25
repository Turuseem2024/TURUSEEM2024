// src/services/DepartamentoService.js

// Importación de módulos necesarios
import fs from "fs";
import path from "path";
import DepartamentoModel from "../models/DepartamentoModel.js";

/**
 * Función auxiliar para registrar errores en un archivo de log.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - Objeto de error capturado.
 */
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log"); // Ruta al archivo de logs
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`; // Mensaje formateado
  fs.mkdirSync(path.dirname(logPath), { recursive: true }); // Crea el directorio si no existe
  fs.appendFileSync(logPath, logMessage); // Escribe el mensaje en el archivo
};

/**
 * Obtiene todos los registros de departamentos desde la base de datos.
 * @returns {Promise<Array>} - Lista de departamentos.
 * @throws {Object} - Error con status 500 si falla la consulta.
 */
export async function getAllDepartamentos() {
  try {
    const departamentos = await DepartamentoModel.findAll(); // Consulta todos los departamentos
    return departamentos;
  } catch (error) {
    logErrorToFile("getAllDepartamentos", error); // Loguea el error
    throw { status: 500, message: `Error al obtener departamentos: ${error.message}` };
  }
}

/**
 * Obtiene un departamento por su ID.
 * @param {number|string} id - ID del departamento.
 * @returns {Promise<Object>} - Objeto del departamento encontrado.
 * @throws {Object} - Error con status 404 si el ID es inválido o el departamento no existe.
 */
export async function getDepartamentoById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido"); // Validación del ID
    const departamento = await DepartamentoModel.findByPk(id); // Busca el departamento por su PK
    if (!departamento) throw new Error("Departamento no encontrado");
    return departamento;
  } catch (error) {
    logErrorToFile("getDepartamentoById", error); // Loguea el error
    throw { status: 404, message: `Error al obtener departamento: ${error.message}` };
  }
}

/**
 * Crea un nuevo departamento con los datos proporcionados.
 * @param {Object} data - Datos del nuevo departamento. Debe contener Nom_Departamento.
 * @returns {Promise<Object>} - Departamento recién creado.
 * @throws {Object} - Error con status 400 si los datos son inválidos.
 */
export async function createDepartamento(data) {
  try {
    // Validación de los datos requeridos
    if (!data || typeof data.Nom_Departamento !== 'string' || !data.Nom_Departamento.trim()) {
      throw new Error("Datos incompletos o inválidos para crear departamento");
    }
    const nuevoDepartamento = await DepartamentoModel.create(data); // Crea el nuevo registro
    return nuevoDepartamento;
  } catch (error) {
    logErrorToFile("createDepartamento", error); // Loguea el error
    throw { status: 400, message: `Error al crear departamento: ${error.message}` };
  }
}

/**
 * Actualiza un departamento existente por su ID con los datos proporcionados.
 * @param {number|string} id - ID del departamento a actualizar.
 * @param {Object} data - Datos a actualizar.
 * @returns {Promise<Object>} - Departamento actualizado.
 * @throws {Object} - Error con status 400 si el ID o los datos son inválidos o el departamento no existe.
 */
export async function updateDepartamento(id, data) {
  try {
    // Validaciones de entrada
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const departamento = await DepartamentoModel.findByPk(id); // Verifica si el departamento existe
    if (!departamento) throw new Error("Departamento no encontrado");

    const departamentoActualizado = await departamento.update(data); // Actualiza el departamento
    return departamentoActualizado;
  } catch (error) {
    logErrorToFile("updateDepartamento", error); // Loguea el error
    throw { status: 400, message: `Error al actualizar departamento: ${error.message}` };
  }
}

/**
 * Elimina un departamento existente por su ID.
 * @param {number|string} id - ID del departamento a eliminar.
 * @returns {Promise<Object>} - Mensaje de éxito.
 * @throws {Object} - Error con status 400 si el ID es inválido o el departamento no existe.
 */
export async function deleteDepartamento(id) {
  try {
    // Validación del ID
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const departamento = await DepartamentoModel.findByPk(id); // Verifica existencia
    if (!departamento) throw new Error("Departamento no encontrado");

    await departamento.destroy(); // Elimina el registro
    return { message: "Departamento eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteDepartamento", error); // Loguea el error
    throw { status: 400, message: `Error al eliminar departamento: ${error.message}` };
  }
}
