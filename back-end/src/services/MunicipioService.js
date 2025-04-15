// src/services/MunicipioService.js
import fs from "fs";
import path from "path";
import MunicipioModel from "../models/MunicipioModel.js";
import DepartamentoModel from "../models/DepartamentoModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllMunicipios() {
  try {
    const municipios = await MunicipioModel.findAll();
    return municipios;
  } catch (error) {
    logErrorToFile("getAllMunicipios", error);
    throw { status: 500, message: `Error al obtener municipios: ${error.message}` };
  }
}

export async function getMunicipioById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const municipio = await MunicipioModel.findByPk(id);
    if (!municipio) throw new Error("Municipio no encontrado");
    return municipio;
  } catch (error) {
    logErrorToFile("getMunicipioById", error);
    throw { status: 404, message: `Error al obtener municipio: ${error.message}` };
  }
}

export async function createMunicipio(data) {
  try {
    if (!data || typeof data.Nom_Municipio !== 'string' || !data.Nom_Municipio.trim()) {
      throw new Error("Nombre de municipio inválido");
    }
    
    if (!data.Id_Departamento || isNaN(Number(data.Id_Departamento))) {
      throw new Error("ID de Departamento inválido");
    }

    const departamento = await DepartamentoModel.findByPk(data.Id_Departamento);
    if (!departamento) throw new Error("Departamento asociado no encontrado");

    const nuevoMunicipio = await MunicipioModel.create(data);
    return nuevoMunicipio;
  } catch (error) {
    logErrorToFile("createMunicipio", error);
    throw { status: 400, message: `Error al crear municipio: ${error.message}` };
  }
}

export async function updateMunicipio(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const municipio = await MunicipioModel.findByPk(id);
    if (!municipio) throw new Error("Municipio no encontrado");

    if (data.Id_Departamento) {
      const departamento = await DepartamentoModel.findByPk(data.Id_Departamento);
      if (!departamento) throw new Error("Departamento asociado no encontrado");
    }

    const municipioActualizado = await municipio.update(data);
    return municipioActualizado;
  } catch (error) {
    logErrorToFile("updateMunicipio", error);
    throw { status: 400, message: `Error al actualizar municipio: ${error.message}` };
  }
}

export async function deleteMunicipio(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const municipio = await MunicipioModel.findByPk(id);
    if (!municipio) throw new Error("Municipio no encontrado");
    await municipio.destroy();
    return { message: "Municipio eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteMunicipio", error);
    throw { status: 400, message: `Error al eliminar municipio: ${error.message}` };
  }
}