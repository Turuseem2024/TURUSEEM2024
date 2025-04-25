// src/services/MunicipioService.js

import fs from "fs"; // Módulo para manipular el sistema de archivos
import path from "path"; // Módulo para trabajar con rutas de archivos y directorios
import MunicipioModel from "../models/MunicipioModel.js"; // Modelo para interactuar con la tabla de municipios
import DepartamentoModel from "../models/DepartamentoModel.js"; // Modelo para interactuar con la tabla de departamentos

/**
 * Función para registrar errores en un archivo de log.
 * 
 * @param {string} functionName - El nombre de la función donde ocurrió el error.
 * @param {Error} error - El objeto de error que se ha generado.
 */
const logErrorToFile = (functionName, error) => {
  // Define la ruta para el archivo de log
  const logPath = path.resolve("logs", "errores.log");
  
  // Crea el mensaje de log con la fecha y el error
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  
  // Crea el directorio si no existe
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  
  // Agrega el mensaje de log al archivo
  fs.appendFileSync(logPath, logMessage);
};

/**
 * Obtiene todos los municipios desde la base de datos.
 * 
 * @returns {Promise<Array>} Lista de todos los municipios.
 * @throws {Error} Si ocurre un error al obtener los municipios.
 */
export async function getAllMunicipios() {
  try {
    // Recupera todos los municipios usando el modelo MunicipioModel
    const municipios = await MunicipioModel.findAll();
    return municipios;
  } catch (error) {
    // Si ocurre un error, se loguea y se lanza una excepción personalizada
    logErrorToFile("getAllMunicipios", error);
    throw { status: 500, message: `Error al obtener municipios: ${error.message}` };
  }
}

/**
 * Obtiene un municipio por su ID desde la base de datos.
 * 
 * @param {number} id - El ID del municipio a obtener.
 * @returns {Promise<Object>} El municipio encontrado.
 * @throws {Error} Si el ID es inválido o no se encuentra el municipio.
 */
export async function getMunicipioById(id) {
  try {
    // Valida el ID recibido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");

    // Recupera el municipio por su ID
    const municipio = await MunicipioModel.findByPk(id);
    if (!municipio) throw new Error("Municipio no encontrado");
    
    return municipio;
  } catch (error) {
    // Si ocurre un error, se loguea y se lanza una excepción personalizada
    logErrorToFile("getMunicipioById", error);
    throw { status: 404, message: `Error al obtener municipio: ${error.message}` };
  }
}

/**
 * Crea un nuevo municipio en la base de datos.
 * 
 * @param {Object} data - Los datos del municipio a crear.
 * @returns {Promise<Object>} El municipio creado.
 * @throws {Error} Si los datos del municipio no son válidos o el departamento no existe.
 */
export async function createMunicipio(data) {
  try {
    // Valida que el nombre del municipio sea válido
    if (!data || typeof data.Nom_Municipio !== 'string' || !data.Nom_Municipio.trim()) {
      throw new Error("Nombre de municipio inválido");
    }
    
    // Valida que el ID del departamento sea válido
    if (!data.Id_Departamento || isNaN(Number(data.Id_Departamento))) {
      throw new Error("ID de Departamento inválido");
    }

    // Verifica que el departamento exista en la base de datos
    const departamento = await DepartamentoModel.findByPk(data.Id_Departamento);
    if (!departamento) throw new Error("Departamento asociado no encontrado");

    // Crea el nuevo municipio en la base de datos
    const nuevoMunicipio = await MunicipioModel.create(data);
    return nuevoMunicipio;
  } catch (error) {
    // Si ocurre un error, se loguea y se lanza una excepción personalizada
    logErrorToFile("createMunicipio", error);
    throw { status: 400, message: `Error al crear municipio: ${error.message}` };
  }
}

/**
 * Actualiza los datos de un municipio en la base de datos.
 * 
 * @param {number} id - El ID del municipio a actualizar.
 * @param {Object} data - Los datos actualizados del municipio.
 * @returns {Promise<Object>} El municipio actualizado.
 * @throws {Error} Si el ID es inválido, los datos no son válidos o el municipio no se encuentra.
 */
export async function updateMunicipio(id, data) {
  try {
    // Valida el ID del municipio
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    
    // Valida que los datos sean válidos
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    // Recupera el municipio a actualizar
    const municipio = await MunicipioModel.findByPk(id);
    if (!municipio) throw new Error("Municipio no encontrado");

    // Verifica si el departamento es válido y existe
    if (data.Id_Departamento) {
      const departamento = await DepartamentoModel.findByPk(data.Id_Departamento);
      if (!departamento) throw new Error("Departamento asociado no encontrado");
    }

    // Actualiza el municipio en la base de datos
    const municipioActualizado = await municipio.update(data);
    return municipioActualizado;
  } catch (error) {
    // Si ocurre un error, se loguea y se lanza una excepción personalizada
    logErrorToFile("updateMunicipio", error);
    throw { status: 400, message: `Error al actualizar municipio: ${error.message}` };
  }
}

/**
 * Elimina un municipio de la base de datos.
 * 
 * @param {number} id - El ID del municipio a eliminar.
 * @returns {Promise<Object>} Un mensaje de confirmación de la eliminación.
 * @throws {Error} Si el ID es inválido o el municipio no existe.
 */
export async function deleteMunicipio(id) {
  try {
    // Valida el ID del municipio
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");

    // Recupera el municipio a eliminar
    const municipio = await MunicipioModel.findByPk(id);
    if (!municipio) throw new Error("Municipio no encontrado");

    // Elimina el municipio de la base de datos
    await municipio.destroy();
    return { message: "Municipio eliminado correctamente" };
  } catch (error) {
    // Si ocurre un error, se loguea y se lanza una excepción personalizada
    logErrorToFile("deleteMunicipio", error);
    throw { status: 400, message: `Error al eliminar municipio: ${error.message}` };
  }
}
