// src/services/ProgramaService.js
import fs from "fs";
import path from "path";
import ProgramaModel from "../models/programaModel.js";
import AreaModel from "../models/areaModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllProgramas() {
  try {
    const programas = await ProgramaModel.findAll();
    return programas;
  } catch (error) {
    logErrorToFile("getAllProgramas", error);
    throw { status: 500, message: `Error al obtener programas: ${error.message}` };
  }
}

export async function getProgramaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const programa = await ProgramaModel.findByPk(id);
    if (!programa) throw new Error("Programa no encontrado");
    return programa;
  } catch (error) {
    logErrorToFile("getProgramaById", error);
    throw { status: 404, message: `Error al obtener programa: ${error.message}` };
  }
}

export async function createPrograma(data) {
  try {
    if (!data || typeof data.Nom_Programa !== 'string' || !data.Nom_Programa.trim()) {
      throw new Error("Nombre de programa inválido");
    }
    
    if (!['TECNICO', 'TECNOLOGO'].includes(data.Tip_Programa)) {
      throw new Error("Tipo de programa inválido");
    }
    
    if (!['ACTIVO', 'INACTIVO'].includes(data.Est_Programa)) {
      throw new Error("Estado de programa inválido");
    }
    
    if (!data.Id_Area || isNaN(Number(data.Id_Area))) {
      throw new Error("ID de Área inválido");
    }

    const area = await AreaModel.findByPk(data.Id_Area);
    if (!area) throw new Error("Área asociada no encontrada");

    const nuevoPrograma = await ProgramaModel.create(data);
    return nuevoPrograma;
  } catch (error) {
    logErrorToFile("createPrograma", error);
    throw { status: 400, message: `Error al crear programa: ${error.message}` };
  }
}

export async function updatePrograma(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const programa = await ProgramaModel.findByPk(id);
    if (!programa) throw new Error("Programa no encontrado");

    if (data.Tip_Programa && !['TECNICO', 'TECNOLOGO'].includes(data.Tip_Programa)) {
      throw new Error("Tipo de programa inválido");
    }
    
    if (data.Est_Programa && !['ACTIVO', 'INACTIVO'].includes(data.Est_Programa)) {
      throw new Error("Estado de programa inválido");
    }

    if (data.Id_Area) {
      const area = await AreaModel.findByPk(data.Id_Area);
      if (!area) throw new Error("Área asociada no encontrada");
    }

    const programaActualizado = await programa.update(data);
    return programaActualizado;
  } catch (error) {
    logErrorToFile("updatePrograma", error);
    throw { status: 400, message: `Error al actualizar programa: ${error.message}` };
  }
}

export async function deletePrograma(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const programa = await ProgramaModel.findByPk(id);
    if (!programa) throw new Error("Programa no encontrado");
    await programa.destroy();
    return { message: "Programa eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deletePrograma", error);
    throw { status: 400, message: `Error al eliminar programa: ${error.message}` };
  }
}