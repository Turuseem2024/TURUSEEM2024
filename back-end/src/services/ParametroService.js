// src/services/ParametroService.js
import fs from "fs";
import path from "path";
import ParametroModel from "../models/ParametroModel.js";
import UserModel from "../models/userModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

// Valores permitidos para los ENUM
const TIPOS_PERMITIDOS = ['TIEMPO', 'TEXTO', 'NUMERO', 'BOOLEAN', 'ENUM'];
const ESTADOS_PERMITIDOS = ['ACTIVO', 'INACTIVO'];

export async function getAllParametros() {
  try {
    const parametros = await ParametroModel.findAll();
    return parametros;
  } catch (error) {
    logErrorToFile("getAllParametros", error);
    throw { status: 500, message: `Error al obtener parámetros: ${error.message}` };
  }
}

export async function getParametroByIdById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const parametro = await ParametroModel.findByPk(id);
    if (!parametro) throw new Error("Parámetro no encontrado");
    return parametro;
  } catch (error) {
    logErrorToFile("getParametroByIdById", error);
    throw { status: 404, message: `Error al obtener parámetro: ${error.message}` };
  }
}

export async function createParametro(data) {
  try {
    // Validación de campos requeridos
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
    
    if (!data.Id_User || isNaN(Number(data.Id_User))) {
      throw new Error("ID de Usuario inválido");
    }

    // Validar existencia del usuario
    const usuario = await UserModel.findByPk(data.Id_User);
    if (!usuario) throw new Error("Usuario asociado no encontrado");

    const nuevoParametro = await ParametroModel.create({
      ...data,
      Fecha_Creacion: new Date(),
      Fecha_Actualizacion: new Date()
    });
    
    return nuevoParametro;
  } catch (error) {
    logErrorToFile("createParametro", error);
    throw { status: 400, message: `Error al crear parámetro: ${error.message}` };
  }
}

export async function updateParametro(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const parametro = await ParametroModel.findByPk(id);
    if (!parametro) throw new Error("Parámetro no encontrado");

    // Validar tipo si se actualiza
    if (data.Tip_Parametro && !TIPOS_PERMITIDOS.includes(data.Tip_Parametro)) {
      throw new Error("Tipo de parámetro inválido");
    }

    // Validar estado si se actualiza
    if (data.Est_Parametro && !ESTADOS_PERMITIDOS.includes(data.Est_Parametro)) {
      throw new Error("Estado de parámetro inválido");
    }

    // Validar usuario si se actualiza
    if (data.Id_User) {
      const usuario = await UserModel.findByPk(data.Id_User);
      if (!usuario) throw new Error("Usuario asociado no encontrado");
    }

    // Actualizar fecha de modificación
    const datosActualizados = {
      ...data,
      Fecha_Actualizacion: new Date()
    };

    const parametroActualizado = await parametro.update(datosActualizados);
    return parametroActualizado;
  } catch (error) {
    logErrorToFile("updateParametro", error);
    throw { status: 400, message: `Error al actualizar parámetro: ${error.message}` };
  }
}

export async function deleteParametro(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const parametro = await ParametroModel.findByPk(id);
    if (!parametro) throw new Error("Parámetro no encontrado");
    await parametro.destroy();
    return { message: "Parámetro eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteParametro", error);
    throw { status: 400, message: `Error al eliminar parámetro: ${error.message}` };
  }
}