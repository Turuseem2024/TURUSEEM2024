// src/services/MemorandumService.js

import fs from "fs";
import path from "path";
import MemorandumModel from "../models/memorandumModel.js";
import TurnoModel from "../models/turnoRutinarioModel.js";

// Función para registrar los errores en un archivo de log
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log"); // Ruta al archivo de logs
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`; // Formato del mensaje de error
  fs.mkdirSync(path.dirname(logPath), { recursive: true }); // Asegura que el directorio de logs exista
  fs.appendFileSync(logPath, logMessage); // Agrega el mensaje al archivo de logs
};

// Valores permitidos para los ENUM de motivos y estados
const MOTIVOS_PERMITIDOS = [
  "Evacion de centro",
  "Comportamiento indebido",
  "inasistencia a turno",
  "inasistencia a centro"
];
const ESTADOS_PERMITIDOS = ["ACTIVO", "INACTIVO"];

/**
 * Obtiene todos los memorandos de la base de datos.
 * @returns {Array} Lista de memorandos
 * @throws {Object} Error con mensaje y código 500 si ocurre un fallo al obtener los memorandos.
 */
export async function getAllMemorandos() {
  try {
    const memorandos = await MemorandumModel.findAll(); // Obtiene todos los memorandos
    return memorandos;
  } catch (error) {
    logErrorToFile("getAllMemorandos", error); // Registra el error en el log
    throw { status: 500, message: `Error al obtener memorandos: ${error.message}` }; // Lanza un error con código 500
  }
}

/**
 * Obtiene un memorándum por su ID.
 * @param {number} id - El ID del memorándum a buscar.
 * @returns {Object} El memorándum correspondiente al ID.
 * @throws {Object} Error con mensaje y código 404 si el memorándum no es encontrado o ID inválido.
 */
export async function getMemorandumById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido"); // Valida que el ID sea numérico
    const memorandum = await MemorandumModel.findByPk(id); // Busca el memorándum por su ID
    if (!memorandum) throw new Error("Memorándum no encontrado"); // Si no se encuentra, lanza un error
    return memorandum;
  } catch (error) {
    logErrorToFile("getMemorandumById", error); // Registra el error en el log
    throw { status: 404, message: `Error al obtener memorándum: ${error.message}` }; // Lanza un error con código 404
  }
}

/**
 * Crea un nuevo memorándum en la base de datos.
 * @param {Object} data - Los datos del nuevo memorándum.
 * @returns {Object} El nuevo memorándum creado.
 * @throws {Object} Error con mensaje y código 400 si los datos son inválidos o falta información.
 */
export async function createMemorandum(data) {
  try {
    // Validación de campos requeridos
    if (!data || !data.Fec_Memorando) {
      throw new Error("Fecha de memorándum requerida");
    }

    if (!MOTIVOS_PERMITIDOS.includes(data.Mot_Memorando)) {
      throw new Error("Motivo inválido");
    }

    if (!ESTADOS_PERMITIDOS.includes(data.Est_Memorando)) {
      throw new Error("Estado inválido");
    }

    if (!data.Id_Turno || isNaN(Number(data.Id_Turno))) {
      throw new Error("ID de Turno inválido");
    }

    // Validar existencia del turno asociado
    const turno = await TurnoModel.findByPk(data.Id_Turno);
    if (!turno) throw new Error("Turno asociado no encontrado");

    // Crear el nuevo memorándum
    const nuevoMemorandum = await MemorandumModel.create({
      Fec_Memorando: data.Fec_Memorando,
      Mot_Memorando: data.Mot_Memorando,
      Est_Memorando: data.Est_Memorando,
      Id_Turno: data.Id_Turno
    });
    
    return nuevoMemorandum;
  } catch (error) {
    logErrorToFile("createMemorandum", error); // Registra el error en el log
    throw { status: 400, message: `Error al crear memorándum: ${error.message}` }; // Lanza un error con código 400
  }
}

/**
 * Actualiza un memorándum existente.
 * @param {number} id - El ID del memorándum a actualizar.
 * @param {Object} data - Los datos actualizados del memorándum.
 * @returns {Object} El memorándum actualizado.
 * @throws {Object} Error con mensaje y código 400 si el memorándum no es encontrado o los datos son inválidos.
 */
export async function updateMemorandum(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización"); // Valida el ID
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización"); // Valida los datos

    const memorandum = await MemorandumModel.findByPk(id); // Busca el memorándum por su ID
    if (!memorandum) throw new Error("Memorándum no encontrado"); // Si no se encuentra, lanza un error

    // Validación de los campos si se actualizan
    if (data.Mot_Memorando && !MOTIVOS_PERMITIDOS.includes(data.Mot_Memorando)) {
      throw new Error("Motivo inválido");
    }

    if (data.Est_Memorando && !ESTADOS_PERMITIDOS.includes(data.Est_Memorando)) {
      throw new Error("Estado inválido");
    }

    if (data.Id_Turno) {
      const turno = await TurnoModel.findByPk(data.Id_Turno); // Valida el turno asociado
      if (!turno) throw new Error("Turno asociado no encontrado");
    }

    // Actualiza el memorándum con los nuevos datos
    const memorandumActualizado = await memorandum.update(data);
    return memorandumActualizado;
  } catch (error) {
    logErrorToFile("updateMemorandum", error); // Registra el error en el log
    throw { status: 400, message: `Error al actualizar memorándum: ${error.message}` }; // Lanza un error con código 400
  }
}

/**
 * Elimina un memorándum por su ID.
 * @param {number} id - El ID del memorándum a eliminar.
 * @returns {Object} Mensaje de éxito.
 * @throws {Object} Error con mensaje y código 400 si el memorándum no es encontrado o el ID es inválido.
 */
export async function deleteMemorandum(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación"); // Valida el ID
    const memorandum = await MemorandumModel.findByPk(id); // Busca el memorándum por su ID
    if (!memorandum) throw new Error("Memorándum no encontrado"); // Si no se encuentra, lanza un error
    await memorandum.destroy(); // Elimina el memorándum
    return { message: "Memorándum eliminado correctamente" }; // Mensaje de éxito
  } catch (error) {
    logErrorToFile("deleteMemorandum", error); // Registra el error en el log
    throw { status: 400, message: `Error al eliminar memorándum: ${error.message}` }; // Lanza un error con código 400
  }
}
