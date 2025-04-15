// src/services/UnidadService.js
import fs from "fs";
import path from "path";
import UnitModel from "../models/unitModel.js";
import AreaModel from "../models/areaModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllUnidades() {
  try {
    const unidades = await UnitModel.findAll();
    return unidades;
  } catch (error) {
    logErrorToFile("getAllUnidades", error);
    throw { status: 500, message: `Error al obtener unidades: ${error.message}` };
  }
}

export async function getUnidadById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const unidad = await UnitModel.findByPk(id);
    if (!unidad) throw new Error("Unidad no encontrada");
    return unidad;
  } catch (error) {
    logErrorToFile("getUnidadById", error);
    throw { status: 404, message: `Error al obtener unidad: ${error.message}` };
  }
}

export async function createUnidad(data) {
  try {
    // Validación de campos requeridos
    if (!data || typeof data.Nom_Unidad !== 'string' || !data.Nom_Unidad.trim()) {
      throw new Error("Nombre de unidad inválido");
    }
    
    if (!data.Hora_Apertura || !data.Hora_Cierre) {
      throw new Error("Horarios incompletos");
    }
    
    if (!['ACTIVO', 'INACTIVO'].includes(data.Est_Unidad)) {
      throw new Error("Estado de unidad inválido");
    }
    
    if (!data.Id_Area || isNaN(Number(data.Id_Area))) {
      throw new Error("ID de Área inválido");
    }

    // Validar existencia del área
    const area = await AreaModel.findByPk(data.Id_Area);
    if (!area) throw new Error("Área asociada no encontrada");

    const nuevaUnidad = await UnitModel.create(data);
    return nuevaUnidad;
  } catch (error) {
    logErrorToFile("createUnidad", error);
    throw { status: 400, message: `Error al crear unidad: ${error.message}` };
  }
}

export async function updateUnidad(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const unidad = await UnitModel.findByPk(id);
    if (!unidad) throw new Error("Unidad no encontrada");

    // Validar estado si viene en la actualización
    if (data.Est_Unidad && !['ACTIVO', 'INACTIVO'].includes(data.Est_Unidad)) {
      throw new Error("Estado de unidad inválido");
    }

    // Validar área si se actualiza
    if (data.Id_Area) {
      const area = await AreaModel.findByPk(data.Id_Area);
      if (!area) throw new Error("Área asociada no encontrada");
    }

    const unidadActualizada = await unidad.update(data);
    return unidadActualizada;
  } catch (error) {
    logErrorToFile("updateUnidad", error);
    throw { status: 400, message: `Error al actualizar unidad: ${error.message}` };
  }
}

export async function deleteUnidad(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const unidad = await UnitModel.findByPk(id);
    if (!unidad) throw new Error("Unidad no encontrada");
    await unidad.destroy();
    return { message: "Unidad eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteUnidad", error);
    throw { status: 400, message: `Error al eliminar unidad: ${error.message}` };
  }
}