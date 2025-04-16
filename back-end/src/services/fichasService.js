// src/services/FichasService.js
import fs from "fs";
import path from "path";
import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllFichas() {
  try {
    const fichas = await FichasModel.findAll();
    return fichas;
  } catch (error) {
    logErrorToFile("getAllFichas", error);
    throw { status: 500, message: `Error al obtener fichas: ${error.message}` };
  }
}

export async function getFichaById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const ficha = await FichasModel.findByPk(id);
    if (!ficha) throw new Error("Ficha no encontrada");
    return ficha;
  } catch (error) {
    logErrorToFile("getFichaById", error);
    throw { status: 404, message: `Error al obtener ficha: ${error.message}` };
  }
}

export async function createFicha(data) {
  try {
    // Validación de campos requeridos
    if (!data || !data.Id_Ficha || isNaN(Number(data.Id_Ficha))) {
      throw new Error("ID de ficha inválido");
    }
    
    if (!data.Fec_Inicio_Etapa_lectiva || !data.Fec_Fin_Etapa_lectiva) {
      throw new Error("Fechas de etapa lectiva requeridas");
    }
    
    if (new Date(data.Fec_Inicio_Etapa_lectiva) >= new Date(data.Fec_Fin_Etapa_lectiva)) {
      throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
    }
    
    if (!data.Can_Aprendices || isNaN(Number(data.Can_Aprendices)) || data.Can_Aprendices < 1) {
      throw new Error("Cantidad de aprendices inválida");
    }
    
    if (!['ACTIVO', 'INACTIVO'].includes(data.Est_Fichas)) {
      throw new Error("Estado de ficha inválido");
    }
    
    if (!data.Id_Programa || isNaN(Number(data.Id_Programa))) {
      throw new Error("ID de Programa inválido");
    }

    // Validar existencia del programa
    const programa = await ProgramaModel.findByPk(data.Id_Programa);
    if (!programa) throw new Error("Programa asociado no encontrado");

    const nuevaFicha = await FichasModel.create(data);
    return nuevaFicha;
  } catch (error) {
    logErrorToFile("createFicha", error);
    throw { status: 400, message: `Error al crear ficha: ${error.message}` };
  }
}

export async function updateFicha(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const ficha = await FichasModel.findByPk(id);
    if (!ficha) throw new Error("Ficha no encontrada");

    // Validar fechas si se actualizan
    if (data.Fec_Inicio_Etapa_lectiva || data.Fec_Fin_Etapa_lectiva) {
      const inicio = data.Fec_Inicio_Etapa_lectiva || ficha.Fec_Inicio_Etapa_lectiva;
      const fin = data.Fec_Fin_Etapa_lectiva || ficha.Fec_Fin_Etapa_lectiva;
      if (new Date(inicio) >= new Date(fin)) {
        throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
      }
    }

    // Validar estado
    if (data.Est_Fichas && !['ACTIVO', 'INACTIVO'].includes(data.Est_Fichas)) {
      throw new Error("Estado de ficha inválido");
    }

    // Validar programa si se actualiza
    if (data.Id_Programa) {
      const programa = await ProgramaModel.findByPk(data.Id_Programa);
      if (!programa) throw new Error("Programa asociado no encontrado");
    }

    const fichaActualizada = await ficha.update(data);
    return fichaActualizada;
  } catch (error) {
    logErrorToFile("updateFicha", error);
    throw { status: 400, message: `Error al actualizar ficha: ${error.message}` };
  }
}

export async function deleteFicha(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const ficha = await FichasModel.findByPk(id);
    if (!ficha) throw new Error("Ficha no encontrada");
    await ficha.destroy();
    return { message: "Ficha eliminada correctamente" };
  } catch (error) {
    logErrorToFile("deleteFicha", error);
    throw { status: 400, message: `Error al eliminar ficha: ${error.message}` };
  }
}