// src/services/ApprenticeService.js

// Importación de módulos necesarios
import fs from "fs";
import path from "path";
import ApprenticeModel from "../models/apprenticeModel.js";
import FichasModel from "../models/fichasModel.js";
import CityModel from "../models/cityModel.js";

/**
 * Función auxiliar para registrar errores en un archivo de log.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - Objeto de error a registrar.
 */
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log"); // Ruta del archivo de log
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true }); // Asegura que el directorio exista
  fs.appendFileSync(logPath, logMessage); // Agrega el error al archivo
};

/**
 * Valida los valores ENUM de ciertos campos del aprendiz.
 * Lanza un error si algún valor no es válido.
 * @param {Object} data - Datos del aprendiz a validar.
 */
const validateEnums = (data) => {
  const enums = {
    Hijos_Aprendiz: ['Si', 'No'],
    Gen_Aprendiz: ['Masculino', 'Femenino'],
    Patrocinio: ['Si', 'No'],
    Centro_Convivencia: ['Si', 'No']
  };

  for (const [field, values] of Object.entries(enums)) {
    if (data[field] && !values.includes(data[field])) {
      throw new Error(`Valor inválido para ${field}. Valores permitidos: ${values.join(', ')}`);
    }
  }
};

/**
 * Obtiene todos los aprendices incluyendo sus fichas y ciudades asociadas.
 * @returns {Promise<Array>} Lista de aprendices.
 */
export async function getAllApprentices() {
  try {
    const apprentices = await ApprenticeModel.findAll({
      include: [
        { model: FichasModel, as: 'ficha' },
        { model: CityModel, as: 'ciudad' }
      ]
    });
    return apprentices;
  } catch (error) {
    logErrorToFile("getAllApprentices", error);
    throw { status: 500, message: `Error al obtener aprendices: ${error.message}` };
  }
}

/**
 * Obtiene un aprendiz por su ID, incluyendo sus relaciones.
 * @param {number|string} id - ID del aprendiz.
 * @returns {Promise<Object>} Objeto del aprendiz.
 */
export async function getApprenticeById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    
    const apprentice = await ApprenticeModel.findByPk(id, {
      include: [
        { model: FichasModel, as: 'ficha' },
        { model: CityModel, as: 'ciudad' }
      ]
    });

    if (!apprentice) throw new Error("Aprendiz no encontrado");
    return apprentice;
  } catch (error) {
    logErrorToFile("getApprenticeById", error);
    throw { status: 404, message: `Error al obtener aprendiz: ${error.message}` };
  }
}

/**
 * Crea un nuevo aprendiz en la base de datos.
 * Realiza validaciones de campos requeridos, referencias y enums.
 * @param {Object} data - Datos del nuevo aprendiz.
 * @returns {Promise<Object>} Aprendiz creado.
 */
export async function createApprentice(data) {
  try {
    // Validación de campos obligatorios
    const requiredFields = [
      'Nom_Aprendiz', 'Ape_Aprendiz', 'Id_Ficha',
      'Fec_Nacimiento', 'Id_Municipio'
    ];

    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        throw new Error(`Campo requerido faltante: ${field}`);
      }
    }

    // Validación de existencia de ficha y ciudad asociadas
    const ficha = await FichasModel.findByPk(data.Id_Ficha);
    if (!ficha) throw new Error("Ficha asociada no encontrada");

    const ciudad = await CityModel.findByPk(data.Id_Municipio);
    if (!ciudad) throw new Error("Ciudad asociada no encontrada");

    // Validación de ENUMs
    validateEnums(data);

    // Validación del formato de fecha
    if (isNaN(new Date(data.Fec_Nacimiento).getTime())) {
      throw new Error("Formato de fecha inválido para Fec_Nacimiento");
    }

    // Creación del aprendiz
    const nuevoAprendiz = await ApprenticeModel.create(data);
    return nuevoAprendiz;
  } catch (error) {
    logErrorToFile("createApprentice", error);
    throw { status: 400, message: `Error al crear aprendiz: ${error.message}` };
  }
}

/**
 * Actualiza los datos de un aprendiz existente.
 * Verifica validez de ID, datos, y referencias.
 * @param {number|string} id - ID del aprendiz a actualizar.
 * @param {Object} data - Datos a actualizar.
 * @returns {Promise<Object>} Aprendiz actualizado.
 */
export async function updateApprentice(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const apprentice = await ApprenticeModel.findByPk(id);
    if (!apprentice) throw new Error("Aprendiz no encontrado");

    // Validación de ficha si se actualiza
    if (data.Id_Ficha) {
      const ficha = await FichasModel.findByPk(data.Id_Ficha);
      if (!ficha) throw new Error("Ficha asociada no encontrada");
    }

    // Validación de ciudad si se actualiza
    if (data.Id_Municipio) {
      const ciudad = await CityModel.findByPk(data.Id_Municipio);
      if (!ciudad) throw new Error("Ciudad asociada no encontrada");
    }

    // Validación de ENUMs si aplica
    if (Object.keys(data).some(key => key in ApprenticeModel.rawAttributes && ApprenticeModel.rawAttributes[key].type.key === 'ENUM')) {
      validateEnums(data);
    }

    // Actualización del aprendiz
    const aprendizActualizado = await apprentice.update(data);
    return aprendizActualizado;
  } catch (error) {
    logErrorToFile("updateApprentice", error);
    throw { status: 400, message: `Error al actualizar aprendiz: ${error.message}` };
  }
}

/**
 * Elimina un aprendiz por su ID.
 * @param {number|string} id - ID del aprendiz a eliminar.
 * @returns {Promise<Object>} Mensaje de confirmación.
 */
export async function deleteApprentice(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    const apprentice = await ApprenticeModel.findByPk(id);
    if (!apprentice) throw new Error("Aprendiz no encontrado");

    await apprentice.destroy();
    return { message: "Aprendiz eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteApprentice", error);
    throw { status: 400, message: `Error al eliminar aprendiz: ${error.message}` };
  }
}
