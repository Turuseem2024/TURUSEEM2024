import ApprenticeModel from "../models/apprenticeModel.js";
import FichasModel from "../models/fichasModel.js";
import cityModel from "../models/cityModel.js";
import csv from "csv-parser";
import fs from "fs";

// Servicio para obtener todos los aprendices, incluyendo relaciones con fichas y ciudad
export const getAllApprenticesService = async () => {
  return await ApprenticeModel.findAll({
    include: [
      {
        model: FichasModel,
        as: "fichas", // Alias definido para la relación
      },
      {
        model: cityModel,
        as: "ciudad", // Alias para la relación con Ciudad
      },
    ],
  });
};

// Servicio para obtener un aprendiz específico por PK, incluyendo relaciones
export const getApprenticeService = async (Id_Aprendiz) => {
  return await ApprenticeModel.findByPk(Id_Aprendiz, {
    include: [
      {
        model: FichasModel,
        as: "fichas",
      },
      {
        model: cityModel,
        as: "ciudad",
      },
    ],
  });
};

// Servicio para crear un nuevo aprendiz
export const createApprenticeService = async (data, file) => {
  const {
    Id_Aprendiz,
    Nom_Aprendiz,
    Ape_Aprendiz,
    Id_Ficha,
    Fec_Nacimiento,
    Id_Ciudad,
    Lugar_Residencia,
    Edad,
    Hijos,
    Nom_Eps,
    Tel_Padre,
    Gen_Aprendiz,
    Cor_Aprendiz,
    Tel_Aprendiz,
    Patrocinio,
    Estado,
    Nom_Empresa,
    CentroConvivencia,
  } = data;

  const Foto_Aprendiz = file ? file.filename : null;

  // Crea y retorna el nuevo aprendiz
  return await ApprenticeModel.create({
    Id_Aprendiz,
    Nom_Aprendiz,
    Ape_Aprendiz,
    Id_Ficha,
    Fec_Nacimiento,
    Id_Ciudad,
    Lugar_Residencia,
    Edad,
    Hijos,
    Nom_Eps,
    Tel_Padre,
    Gen_Aprendiz,
    Cor_Aprendiz,
    Tel_Aprendiz,
    Tot_Memorandos: 0,
    Tot_Inasistencias: 0,
    Patrocinio,
    Estado,
    Nom_Empresa,
    CentroConvivencia,
    Foto_Aprendiz,
  });
};

// Servicio para actualizar un aprendiz existente
export const updateApprenticeService = async (Id_Aprendiz, data, file) => {
  const {
    Nom_Aprendiz,
    Ape_Aprendiz,
    Id_Ficha,
    Fec_Nacimiento,
    Id_Ciudad,
    Lugar_Residencia,
    Edad,
    Hijos,
    Nom_Eps,
    Tel_Padre,
    Gen_Aprendiz,
    Cor_Aprendiz,
    Tel_Aprendiz,
    Patrocinio,
    Estado,
    Nom_Empresa,
    CentroConvivencia,
  } = data;

  // Si se ha enviado un archivo se actualiza la foto
  const Foto_Aprendiz = file ? file.filename : null;

  return await ApprenticeModel.update(
    {
      Nom_Aprendiz,
      Ape_Aprendiz,
      Id_Ficha,
      Fec_Nacimiento: new Date(Fec_Nacimiento).toISOString().split("T")[0],
      Id_Ciudad,
      Lugar_Residencia,
      Edad,
      Hijos,
      Nom_Eps,
      Tel_Padre,
      Gen_Aprendiz,
      Cor_Aprendiz,
      Tel_Aprendiz,
      Patrocinio,
      Estado,
      Nom_Empresa,
      CentroConvivencia,
      Foto_Aprendiz,
    },
    {
      where: { Id_Aprendiz },
    }
  );
};

// Servicio para eliminar un aprendiz
export const deleteApprenticeService = async (Id_Aprendiz) => {
  return await ApprenticeModel.destroy({
    where: { Id_Aprendiz },
  });
};

// Servicio para importar aprendices desde un archivo CSV
export const importCSVService = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            const {
              Id_Aprendiz,
              Nom_Aprendiz,
              Ape_Aprendiz,
              Id_Ficha,
              Id_Ciudad,
              Edad,
            } = row;

            // Validar si la ficha existe
            const fichaExists = await FichasModel.findOne({
              where: { Id_Ficha },
            });
            if (!fichaExists) {
              throw new Error(`La ficha ${Id_Ficha} no existe`);
            }

            // Verificar si el aprendiz ya existe
            const apprenticeExists = await ApprenticeModel.findOne({
              where: { Id_Aprendiz },
            });
            if (apprenticeExists) {
              throw new Error(
                `El aprendiz con documento ${Id_Aprendiz} ya existe`
              );
            }

            // Crear el aprendiz con valores por defecto donde corresponda
            await ApprenticeModel.create({
              Id_Aprendiz,
              Nom_Aprendiz,
              Ape_Aprendiz,
              Id_Ficha,
              Fec_Nacimiento: "2000-01-01", // Fecha por defecto en caso de ausencia
              Id_Ciudad,
              Lugar_Residencia: "mz j ?", // Valor por defecto
              Edad,
              Hijos: "No",
              Nom_Eps: "No",
              Tel_Padre: "0",
              Gen_Aprendiz: "Otro",
              Cor_Aprendiz: "ejemplo@gmail.com",
              Tel_Aprendiz: "0",
              Tot_Memorandos: 0,
              Tot_Inasistencias: 0,
              Patrocinio: "No",
              Estado: "Activo",
              Nom_Empresa: "",
              CentroConvivencia: "No",
              Foto_Aprendiz: "default.png",
            });
          }
          // Se elimina el archivo CSV una vez procesado
          fs.unlinkSync(filePath);
          resolve({ message: "CSV cargado y procesado correctamente" });
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
