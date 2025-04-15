// src/services/DepartamentoService.js
import fs from "fs";
import path from "path";
import DepartamentoModel from "../models/DepartamentoModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllDepartamentos() {
  try {
    const departamentos = await DepartamentoModel.findAll();
    return departamentos;
  } catch (error) {
    logErrorToFile("getAllDepartamentos", error);
    throw { status: 500, message: `Error al obtener departamentos: ${error.message}` };
  }
}

export async function getDepartamentoById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const departamento = await DepartamentoModel.findByPk(id);
    if (!departamento) throw new Error("Departamento no encontrado");
    return departamento;
  } catch (error) {
    logErrorToFile("getDepartamentoById", error);
    throw { status: 404, message: `Error al obtener departamento: ${error.message}` };
  }
}

export async function createDepartamento(data) {
  try {
    if (!data || typeof data.Nom_Departamento !== 'string' || !data.Nom_Departamento.trim()) {
      throw new Error("Datos incompletos o inválidos para crear departamento");
    }
    const nuevoDepartamento = await DepartamentoModel.create(data);
    return nuevoDepartamento;
  } catch (error) {
    logErrorToFile("createDepartamento", error);
    throw { status: 400, message: `Error al crear departamento: ${error.message}` };
  }
}

export async function updateDepartamento(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const departamento = await DepartamentoModel.findByPk(id);
    if (!departamento) throw new Error("Departamento no encontrado");

    const departamentoActualizado = await departamento.update(data);
    return departamentoActualizado;
  } catch (error) {
    logErrorToFile("updateDepartamento", error);
    throw { status: 400, message: `Error al actualizar departamento: ${error.message}` };
  }
}

export async function deleteDepartamento(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const departamento = await DepartamentoModel.findByPk(id);
    if (!departamento) throw new Error("Departamento no encontrado");
    await departamento.destroy();
    return { message: "Departamento eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteDepartamento", error);
    throw { status: 400, message: `Error al eliminar departamento: ${error.message}` };
  }
}
