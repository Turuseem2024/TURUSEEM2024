// src/services/AreaAAreaService.js
import fs from "fs";
import path from "path";
import AreaAAreaModel from "../models/AreaAAreaModel.js";
import AreaModel from "../models/areaModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

// Valores permitidos para el ENUM Area_Asignada
const AREAS_PERMITIDAS = [
  "AGRICOLA",
  "AGROINDUSTRIA",
  "GESTION AMBIENTAL",
  "GESTION ADMINISTRATIVA",
  "MECANIZACION",
  "PECUARIA"
];

export async function getAllAreasAArea() {
  try {
    const relaciones = await AreaAAreaModel.findAll();
    return relaciones;
  } catch (error) {
    logErrorToFile("getAllAreasAArea", error);
    throw { status: 500, message: `Error al obtener relaciones entre áreas: ${error.message}` };
  }
}

export async function getAreaAAreaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const relacion = await AreaAAreaModel.findByPk(id);
    if (!relacion) throw new Error("Relación entre áreas no encontrada");
    return relacion;
  } catch (error) {
    logErrorToFile("getAreaAAreaById", error);
    throw { status: 404, message: `Error al obtener relación entre áreas: ${error.message}` };
  }
}

export async function createAreaAArea(data) {
  try {
    // Validación de campos requeridos
    if (!data || !AREAS_PERMITIDAS.includes(data.Area_Asignada)) {
      throw new Error("Área asignada inválida o no proporcionada");
    }
    
    if (!data.Id_Area || isNaN(Number(data.Id_Area))) {
      throw new Error("ID de Área inválido");
    }

    // Validar existencia del área principal
    const area = await AreaModel.findByPk(data.Id_Area);
    if (!area) throw new Error("Área principal no encontrada");

    const nuevaRelacion = await AreaAAreaModel.create(data);
    return nuevaRelacion;
  } catch (error) {
    logErrorToFile("createAreaAArea", error);
    throw { status: 400, message: `Error al crear relación entre áreas: ${error.message}` };
  }
}

export async function updateAreaAArea(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const relacion = await AreaAAreaModel.findByPk(id);
    if (!relacion) throw new Error("Relación entre áreas no encontrada");

    // Validar área asignada si se actualiza
    if (data.Area_Asignada && !AREAS_PERMITIDAS.includes(data.Area_Asignada)) {
      throw new Error("Área asignada inválida");
    }

    // Validar área principal si se actualiza
    if (data.Id_Area) {
      const area = await AreaModel.findByPk(data.Id_Area);
      if (!area) throw new Error("Área principal no encontrada");
    }

    const relacionActualizada = await relacion.update(data);
    return relacionActualizada;
  } catch (error) {
    logErrorToFile("updateAreaAArea", error);
    throw { status: 400, message: `Error al actualizar relación entre áreas: ${error.message}` };
  }
}

export async function deleteAreaAArea(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const relacion = await AreaAAreaModel.findByPk(id);
    if (!relacion) throw new Error("Relación entre áreas no encontrada");
    await relacion.destroy();
    return { message: "Relación entre áreas eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteAreaAArea", error);
    throw { status: 400, message: `Error al eliminar relación entre áreas: ${error.message}` };
  }
}