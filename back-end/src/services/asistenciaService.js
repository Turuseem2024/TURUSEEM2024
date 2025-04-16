// src/services/AsistenciaService.js
import fs from "fs";
import path from "path";
import AsistenciaModel from "../models/attendaceModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllAsistencias() {
  try {
    const asistencias = await AsistenciaModel.findAll();
    return asistencias;
  } catch (error) {
    logErrorToFile("getAllAsistencias", error);
    throw { status: 500, message: `Error al obtener asistencias: ${error.message}` };
  }
}

export async function getAsistenciaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const asistencia = await AsistenciaModel.findByPk(id);
    if (!asistencia) throw new Error("Asistencia no encontrada");
    return asistencia;
  } catch (error) {
    logErrorToFile("getAsistenciaById", error);
    throw { status: 404, message: `Error al obtener asistencia: ${error.message}` };
  }
}

export async function createAsistencia(data) {
  try {
    // Validar que se proporcione el Id_Asistencia ya que no es auto incremental
    if (!data || !data.Id_Asistencia) {
      throw new Error("Id de asistencia requerida");
    }
    
    // Validar fecha obligatoria
    if (!data.Fec_Asistencia) {
      throw new Error("Fecha de asistencia requerida");
    }
    
    // Validar que el tipo esté entre los permitidos
    if (!['incapacidad', 'permiso', 'calamidad'].includes(data.Tip_Asistencia)) {
      throw new Error("Tipo de asistencia inválido");
    }
    
    // Validar el motivo si se proporciona
    if (data.Mot_Asistencia && (typeof data.Mot_Asistencia !== 'string' || !data.Mot_Asistencia.trim())) {
      throw new Error("Motivo de asistencia inválido");
    }
    
    // Creación del registro en la base de datos
    const nuevaAsistencia = await AsistenciaModel.create({
      Id_Asistencia: data.Id_Asistencia,
      Fec_Asistencia: data.Fec_Asistencia,
      Tip_Asistencia: data.Tip_Asistencia,
      Mot_Asistencia: data.Mot_Asistencia?.trim() || null
    });
    
    return nuevaAsistencia;
  } catch (error) {
    logErrorToFile("createAsistencia", error);
    throw { status: 400, message: `Error al crear asistencia: ${error.message}` };
  }
}

export async function updateAsistencia(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const asistencia = await AsistenciaModel.findByPk(id);
    if (!asistencia) throw new Error("Asistencia no encontrada");

    if (data.Tip_Asistencia && !['incapacidad', 'permiso', 'calamidad'].includes(data.Tip_Asistencia)) {
      throw new Error("Tipo de asistencia inválido");
    }

    if (data.Mot_Asistencia && (typeof data.Mot_Asistencia !== 'string' || !data.Mot_Asistencia.trim())) {
      throw new Error("Motivo de asistencia inválido");
    }

    const asistenciaActualizada = await asistencia.update({
      Fec_Asistencia: data.Fec_Asistencia || asistencia.Fec_Asistencia,
      Tip_Asistencia: data.Tip_Asistencia || asistencia.Tip_Asistencia,
      Mot_Asistencia: data.Mot_Asistencia?.trim() || asistencia.Mot_Asistencia
    });
    
    return asistenciaActualizada;
  } catch (error) {
    logErrorToFile("updateAsistencia", error);
    throw { status: 400, message: `Error al actualizar asistencia: ${error.message}` };
  }
}

export async function deleteAsistencia(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const asistencia = await AsistenciaModel.findByPk(id);
    if (!asistencia) throw new Error("Asistencia no encontrada");
    await asistencia.destroy();
    return { message: "Asistencia eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteAsistencia", error);
    throw { status: 400, message: `Error al eliminar asistencia: ${error.message}` };
  }
}