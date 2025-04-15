// src/services/AreaService.js
import fs from "fs";
import path from "path";
import AreaModel from "../models/areaModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllAreas() {
  try {
    const areas = await AreaModel.findAll();
    return areas;
  } catch (error) {
    logErrorToFile("getAllAreas", error);
    throw { status: 500, message: `Error al obtener áreas: ${error.message}` };
  }
}

export async function getAreaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const area = await AreaModel.findByPk(id);
    if (!area) throw new Error("Área no encontrada");
    return area;
  } catch (error) {
    logErrorToFile("getAreaById", error);
    throw { status: 404, message: `Error al obtener área: ${error.message}` };
  }
}

export async function createArea(data) {
  try {
    if (!data || typeof data.Nom_Area !== 'string' || !data.Nom_Area.trim()) {
      throw new Error("Datos incompletos o inválidos para crear área");
    }
    const nuevaArea = await AreaModel.create(data);
    return nuevaArea;
  } catch (error) {
    logErrorToFile("createArea", error);
    throw { status: 400, message: `Error al crear área: ${error.message}` };
  }
}

export async function updateArea(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const area = await AreaModel.findByPk(id);
    if (!area) throw new Error("Área no encontrada");

    const areaActualizada = await area.update(data);
    return areaActualizada;
  } catch (error) {
    logErrorToFile("updateArea", error);
    throw { status: 400, message: `Error al actualizar área: ${error.message}` };
  }
}

export async function deleteArea(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const area = await AreaModel.findByPk(id);
    if (!area) throw new Error("Área no encontrada");
    await area.destroy();
    return { message: "Área eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteArea", error);
    throw { status: 400, message: `Error al eliminar área: ${error.message}` };
  }
}