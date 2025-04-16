// src/services/MemorandumService.js
import fs from "fs";
import path from "path";
import MemorandumModel from "../models/memorandumModel.js";
import TurnoModel from "../models/turnoRutinarioModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

// Valores permitidos para los ENUM
const MOTIVOS_PERMITIDOS = [
  "Evacion de centro",
  "Comportamiento indebido",
  "inasistencia a turno",
  "inasistencia a centro"
];
const ESTADOS_PERMITIDOS = ["ACTIVO", "INACTIVO"];

export async function getAllMemorandos() {
  try {
    const memorandos = await MemorandumModel.findAll();
    return memorandos;
  } catch (error) {
    logErrorToFile("getAllMemorandos", error);
    throw { status: 500, message: `Error al obtener memorandos: ${error.message}` };
  }
}

export async function getMemorandumById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const memorandum = await MemorandumModel.findByPk(id);
    if (!memorandum) throw new Error("Memorándum no encontrado");
    return memorandum;
  } catch (error) {
    logErrorToFile("getMemorandumById", error);
    throw { status: 404, message: `Error al obtener memorándum: ${error.message}` };
  }
}

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

    // Validar existencia del turno
    const turno = await TurnoModel.findByPk(data.Id_Turno);
    if (!turno) throw new Error("Turno asociado no encontrado");

    const nuevoMemorandum = await MemorandumModel.create({
      Fec_Memorando: data.Fec_Memorando,
      Mot_Memorando: data.Mot_Memorando,
      Est_Memorando: data.Est_Memorando,
      Id_Turno: data.Id_Turno
    });
    
    return nuevoMemorandum;
  } catch (error) {
    logErrorToFile("createMemorandum", error);
    throw { status: 400, message: `Error al crear memorándum: ${error.message}` };
  }
}

export async function updateMemorandum(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const memorandum = await MemorandumModel.findByPk(id);
    if (!memorandum) throw new Error("Memorándum no encontrado");

    // Validar motivo si se actualiza
    if (data.Mot_Memorando && !MOTIVOS_PERMITIDOS.includes(data.Mot_Memorando)) {
      throw new Error("Motivo inválido");
    }

    // Validar estado si se actualiza
    if (data.Est_Memorando && !ESTADOS_PERMITIDOS.includes(data.Est_Memorando)) {
      throw new Error("Estado inválido");
    }

    // Validar turno si se actualiza
    if (data.Id_Turno) {
      const turno = await TurnoModel.findByPk(data.Id_Turno);
      if (!turno) throw new Error("Turno asociado no encontrado");
    }

    const memorandumActualizado = await memorandum.update(data);
    return memorandumActualizado;
  } catch (error) {
    logErrorToFile("updateMemorandum", error);
    throw { status: 400, message: `Error al actualizar memorándum: ${error.message}` };
  }
}

export async function deleteMemorandum(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const memorandum = await MemorandumModel.findByPk(id);
    if (!memorandum) throw new Error("Memorándum no encontrado");
    await memorandum.destroy();
    return { message: "Memorándum eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteMemorandum", error);
    throw { status: 400, message: `Error al eliminar memorándum: ${error.message}` };
  }
}