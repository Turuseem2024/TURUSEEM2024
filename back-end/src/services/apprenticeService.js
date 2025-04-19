// src/services/ApprenticeService.js
import fs from "fs";
import path from "path";
import ApprenticeModel from "../models/apprenticeModel.js";
import FichasModel from "../models/fichasModel.js";
import CityModel from "../models/cityModel.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

// Validación de ENUMs
const validateEnums = (data) => {
  const enums = {
    Hijos_Aprendiz: ['Si', 'No'],
    Gen_Aprendiz: ['Masculino', 'Femenino'],
    Patrocinio: ['Si', 'No'],
    Centro_Convivencia: ['Si', 'No']
  };

  for (const [field, values] of Object.entries(enums)) {
    if (data[field] && !values.includes(data[field])) {
      throw new Error(`Valor inválido para ${field}. Valores permitidos: ${values.join(', ')}`);
    }
  }
};

export async function getAllApprentices() {
  try {
    const apprentices = await ApprenticeModel.findAll({
      include: [
        { model: FichasModel, as: 'ficha' },
        { model: CityModel, as: 'ciudad' }
      ]
    });
    return apprentices;
  } catch (error) {
    logErrorToFile("getAllApprentices", error);
    throw { status: 500, message: `Error al obtener aprendices: ${error.message}` };
  }
}

export async function getApprenticeById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const apprentice = await ApprenticeModel.findByPk(id, {
      include: [
        { model: FichasModel, as: 'ficha' },
        { model: CityModel, as: 'ciudad' }
      ]
    });
    if (!apprentice) throw new Error("Aprendiz no encontrado");
    return apprentice;
  } catch (error) {
    logErrorToFile("getApprenticeById", error);
    throw { status: 404, message: `Error al obtener aprendiz: ${error.message}` };
  }
}

export async function createApprentice(data) {
  try {
    // Validación de campos obligatorios
    const requiredFields = [
      'Nom_Aprendiz', 'Ape_Aprendiz', 'Id_Ficha',
      'Fec_Nacimiento', 'Id_Municipio'
    ];
    
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        throw new Error(`Campo requerido faltante: ${field}`);
      }
    }

    // Validación de referencias
    const ficha = await FichasModel.findByPk(data.Id_Ficha);
    if (!ficha) throw new Error("Ficha asociada no encontrada");

    const ciudad = await CityModel.findByPk(data.Id_Municipio);
    if (!ciudad) throw new Error("Ciudad asociada no encontrada");

    // Validación de ENUMs
    validateEnums(data);

    // Validación de formato de fecha
    if (isNaN(new Date(data.Fec_Nacimiento).getTime())) {
      throw new Error("Formato de fecha inválido para Fec_Nacimiento");
    }

    const nuevoAprendiz = await ApprenticeModel.create(data);
    return nuevoAprendiz;
  } catch (error) {
    logErrorToFile("createApprentice", error);
    throw { status: 400, message: `Error al crear aprendiz: ${error.message}` };
  }
}

export async function updateApprentice(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const apprentice = await ApprenticeModel.findByPk(id);
    if (!apprentice) throw new Error("Aprendiz no encontrado");

    // Validación de referencias si se actualizan
    if (data.Id_Ficha) {
      const ficha = await FichasModel.findByPk(data.Id_Ficha);
      if (!ficha) throw new Error("Ficha asociada no encontrada");
    }

    if (data.Id_Municipio) {
      const ciudad = await CityModel.findByPk(data.Id_Municipio);
      if (!ciudad) throw new Error("Ciudad asociada no encontrada");
    }

    // Validación de ENUMs
    if (Object.keys(data).some(key => key in ApprenticeModel.rawAttributes && ApprenticeModel.rawAttributes[key].type.key === 'ENUM')) {
      validateEnums(data);
    }

    const aprendizActualizado = await apprentice.update(data);
    return aprendizActualizado;
  } catch (error) {
    logErrorToFile("updateApprentice", error);
    throw { status: 400, message: `Error al actualizar aprendiz: ${error.message}` };
  }
}

export async function deleteApprentice(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const apprentice = await ApprenticeModel.findByPk(id);
    if (!apprentice) throw new Error("Aprendiz no encontrado");
    await apprentice.destroy();
    return { message: "Aprendiz eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteApprentice", error);
    throw { status: 400, message: `Error al eliminar aprendiz: ${error.message}` };
  }
}