// src/services/FichasService.js

// Importación de módulos necesarios
import fs from "fs";
import path from "path";
import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";

/**
 * Función para registrar errores en un archivo de logs.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - Objeto de error a registrar.
 */
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log"); // Ruta del archivo de log
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true }); // Crear carpeta si no existe
  fs.appendFileSync(logPath, logMessage); // Agregar mensaje de error al archivo
};

/**
 * Obtiene todas las fichas desde la base de datos.
 * @returns {Promise<Array>} - Lista de fichas.
 */
export async function getAllFichas() {
  try {
    const fichas = await FichasModel.findAll(); // Consulta todas las fichas
    return fichas;
  } catch (error) {
    logErrorToFile("getAllFichas", error); // Log en caso de error
    throw { status: 500, message: `Error al obtener fichas: ${error.message}` };
  }
}

/**
 * Obtiene una ficha por su ID.
 * @param {number} id - ID de la ficha.
 * @returns {Promise<Object>} - Objeto ficha encontrada.
 */
export async function getFichaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido"); // Validación de ID
    const ficha = await FichasModel.findByPk(id); // Consulta por clave primaria
    if (!ficha) throw new Error("Ficha no encontrada"); // Ficha no existe
    return ficha;
  } catch (error) {
    logErrorToFile("getFichaById", error); // Log de error
    throw { status: 404, message: `Error al obtener ficha: ${error.message}` };
  }
}

/**
 * Crea una nueva ficha en la base de datos.
 * @param {Object} data - Datos de la ficha a crear.
 * @returns {Promise<Object>} - Objeto ficha creada.
 */
export async function createFicha(data) {
  try {
    // Validación de campos requeridos
    if (!data || !data.Id_Ficha || isNaN(Number(data.Id_Ficha))) {
      throw new Error("ID de ficha inválido");
    }

    if (!data.Fec_Inicio_Etapa_lectiva || !data.Fec_Fin_Etapa_lectiva) {
      throw new Error("Fechas de etapa lectiva requeridas");
    }

    if (new Date(data.Fec_Inicio_Etapa_lectiva) >= new Date(data.Fec_Fin_Etapa_lectiva)) {
      throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
    }

    if (!data.Can_Aprendices || isNaN(Number(data.Can_Aprendices)) || data.Can_Aprendices < 1) {
      throw new Error("Cantidad de aprendices inválida");
    }

    if (!['ACTIVO', 'INACTIVO'].includes(data.Est_Fichas)) {
      throw new Error("Estado de ficha inválido");
    }

    if (!data.Id_Programa || isNaN(Number(data.Id_Programa))) {
      throw new Error("ID de Programa inválido");
    }

    // Verificación de existencia del programa asociado
    const programa = await ProgramaModel.findByPk(data.Id_Programa);
    if (!programa) throw new Error("Programa asociado no encontrado");

    // Creación de la ficha
    const nuevaFicha = await FichasModel.create(data);
    return nuevaFicha;
  } catch (error) {
    logErrorToFile("createFicha", error); // Log del error
    throw { status: 400, message: `Error al crear ficha: ${error.message}` };
  }
}

/**
 * Actualiza una ficha existente por su ID.
 * @param {number} id - ID de la ficha a actualizar.
 * @param {Object} data - Datos a actualizar.
 * @returns {Promise<Object>} - Ficha actualizada.
 */
export async function updateFicha(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const ficha = await FichasModel.findByPk(id); // Buscar ficha existente
    if (!ficha) throw new Error("Ficha no encontrada");

    // Validar fechas si están presentes en la actualización
    if (data.Fec_Inicio_Etapa_lectiva || data.Fec_Fin_Etapa_lectiva) {
      const inicio = data.Fec_Inicio_Etapa_lectiva || ficha.Fec_Inicio_Etapa_lectiva;
      const fin = data.Fec_Fin_Etapa_lectiva || ficha.Fec_Fin_Etapa_lectiva;
      if (new Date(inicio) >= new Date(fin)) {
        throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
      }
    }

    // Validación de estado si se proporciona
    if (data.Est_Fichas && !['ACTIVO', 'INACTIVO'].includes(data.Est_Fichas)) {
      throw new Error("Estado de ficha inválido");
    }

    // Validar programa si se actualiza
    if (data.Id_Programa) {
      const programa = await ProgramaModel.findByPk(data.Id_Programa);
      if (!programa) throw new Error("Programa asociado no encontrado");
    }

    // Actualización de la ficha
    const fichaActualizada = await ficha.update(data);
    return fichaActualizada;
  } catch (error) {
    logErrorToFile("updateFicha", error); // Log de error
    throw { status: 400, message: `Error al actualizar ficha: ${error.message}` };
  }
}

/**
 * Elimina una ficha de la base de datos por su ID.
 * @param {number} id - ID de la ficha a eliminar.
 * @returns {Promise<Object>} - Mensaje de confirmación.
 */
export async function deleteFicha(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    const ficha = await FichasModel.findByPk(id); // Buscar ficha
    if (!ficha) throw new Error("Ficha no encontrada");

    await ficha.destroy(); // Eliminar ficha
    return { message: "Ficha eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteFicha", error); // Log del error
    throw { status: 400, message: `Error al eliminar ficha: ${error.message}` };
  }
}
