// src/services/ParametroService.js
import fs from "fs";
import path from "path";
import ParametroModel from "../models/ParametroModel.js";
import UserModel from "../models/userModel.js";

// Función para registrar errores en un archivo de log
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  
  // Asegura que el directorio de logs exista
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  
  // Agrega el error al archivo de log
  fs.appendFileSync(logPath, logMessage);
};

// Valores permitidos para los tipos de parámetro (ENUM)
const TIPOS_PERMITIDOS = ['TIEMPO', 'TEXTO', 'NUMERO', 'BOOLEAN', 'ENUM'];
const ESTADOS_PERMITIDOS = ['ACTIVO', 'INACTIVO'];

// Obtiene todos los parámetros de la base de datos
export async function getAllParametros() {
  try {
    const parametros = await ParametroModel.findAll();  // Se consulta todos los parámetros
    return parametros;
  } catch (error) {
    // En caso de error, se registra y se lanza un error con mensaje
    logErrorToFile("getAllParametros", error);
    throw { status: 500, message: `Error al obtener parámetros: ${error.message}` };
  }
}

// Obtiene un parámetro por su ID
export async function getParametroById(id) {
  try {
    // Verifica que el ID sea válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    
    const parametro = await ParametroModel.findByPk(id);  // Busca el parámetro por ID
    
    // Si el parámetro no existe, lanza un error
    if (!parametro) throw new Error("Parámetro no encontrado");
    
    return parametro;
  } catch (error) {
    // En caso de error, se registra y se lanza un error con mensaje
    logErrorToFile("getParametroByIdById", error);
    throw { status: 404, message: `Error al obtener parámetro: ${error.message}` };
  }
}

/**
 * Obtiene el valor de un parámetro por su nombre.
 * @param {string} nombreParametro - El nombre del parámetro a buscar.
 * @returns {Promise<string>} - El valor del parámetro.
 * @throws {Error} - Si el parámetro no existe o ocurre un error.
 */
export async function getParametro(nombreParametro) {
  try {
    // Verifica que el nombre del parámetro sea válido
    if (!nombreParametro || typeof nombreParametro !== 'string') {
      throw new Error("Nombre de parámetro inválido");
    }

    const parametro = await ParametroModel.findOne({
      where: { Nom_Parametro: nombreParametro }  // Busca el parámetro por su nombre
    });

    // Si el parámetro no existe, lanza un error
    if (!parametro) {
      throw new Error(`Parámetro con nombre '${nombreParametro}' no encontrado`);
    }

    return parametro.Val_Parametro;  // Retorna el valor del parámetro encontrado
  } catch (error) {
    // En caso de error, se registra y se lanza un error con mensaje
    logErrorToFile("getParametro", error);
    throw { status: 404, message: `Error al obtener parámetro: ${error.message}` };
  }
}

// Crea un nuevo parámetro en la base de datos
export async function createParametro(data) {
  try {
    // Validación de campos requeridos en la entrada
    if (!data || typeof data.Nom_Parametro !== 'string' || !data.Nom_Parametro.trim()) {
      throw new Error("Nombre de parámetro inválido");
    }
    
    if (typeof data.Val_Parametro !== 'string' || !data.Val_Parametro.trim()) {
      throw new Error("Valor de parámetro inválido");
    }
    
    if (!TIPOS_PERMITIDOS.includes(data.Tip_Parametro)) {
      throw new Error("Tipo de parámetro inválido");
    }
    
    if (!ESTADOS_PERMITIDOS.includes(data.Est_Parametro)) {
      throw new Error("Estado de parámetro inválido");
    }
    
    // Validación de ID de usuario
    if (!data.Id_User || isNaN(Number(data.Id_User))) {
      throw new Error("ID de Usuario inválido");
    }

    // Verifica si el usuario existe en la base de datos
    const usuario = await UserModel.findByPk(data.Id_User);
    if (!usuario) throw new Error("Usuario asociado no encontrado");

    // Crea el nuevo parámetro en la base de datos
    const nuevoParametro = await ParametroModel.create({
      ...data,
      Fecha_Creacion: new Date(),
      Fecha_Actualizacion: new Date()
    });
    
    return nuevoParametro;  // Retorna el parámetro recién creado
  } catch (error) {
    // En caso de error, se registra y se lanza un error con mensaje
    logErrorToFile("createParametro", error);
    throw { status: 400, message: `Error al crear parámetro: ${error.message}` };
  }
}

// Actualiza un parámetro existente en la base de datos
export async function updateParametro(id, data) {
  try {
    // Verifica que el ID sea válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const parametro = await ParametroModel.findByPk(id);  // Busca el parámetro por ID
    if (!parametro) throw new Error("Parámetro no encontrado");

    // Validación de tipo si se actualiza
    if (data.Tip_Parametro && !TIPOS_PERMITIDOS.includes(data.Tip_Parametro)) {
      throw new Error("Tipo de parámetro inválido");
    }

    // Validación de estado si se actualiza
    if (data.Est_Parametro && !ESTADOS_PERMITIDOS.includes(data.Est_Parametro)) {
      throw new Error("Estado de parámetro inválido");
    }

    // Verifica si el usuario asociado es válido
    if (data.Id_User) {
      const usuario = await UserModel.findByPk(data.Id_User);
      if (!usuario) throw new Error("Usuario asociado no encontrado");
    }

    // Actualiza la fecha de modificación
    const datosActualizados = {
      ...data,
      Fecha_Actualizacion: new Date()
    };

    const parametroActualizado = await parametro.update(datosActualizados);  // Actualiza el parámetro
    return parametroActualizado;  // Retorna el parámetro actualizado
  } catch (error) {
    // En caso de error, se registra y se lanza un error con mensaje
    logErrorToFile("updateParametro", error);
    throw { status: 400, message: `Error al actualizar parámetro: ${error.message}` };
  }
}

// Elimina un parámetro de la base de datos
export async function deleteParametro(id) {
  try {
    // Verifica que el ID sea válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const parametro = await ParametroModel.findByPk(id);  // Busca el parámetro por ID
    if (!parametro) throw new Error("Parámetro no encontrado");
    
    await parametro.destroy();  // Elimina el parámetro de la base de datos
    return { message: "Parámetro eliminado correctamente" };  // Retorna un mensaje de éxito
  } catch (error) {
    // En caso de error, se registra y se lanza un error con mensaje
    logErrorToFile("deleteParametro", error);
    throw { status: 400, message: `Error al eliminar parámetro: ${error.message}` };
  }
}
