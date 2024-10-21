import ApprenticeModel from "../models/apprenticeModel.js";
import FichasModel from "../models/fichasModel.js";
import cityModel from "../models/cityModel.js";
import { logger } from "../middleware/logMiddleware.js";
import csv from "csv-parser";
import fs from "fs";

export const getAllApprentices = async (req, res) => {
  try {
    const apprentices = await ApprenticeModel.findAll({
      include: [
        {
          model: FichasModel,
          as: "fichas", // Alias usado para la relación
        },
        {
          model: cityModel,
          as: "ciudad", // Alias para la relación con Ciudad
        },
      ],
    });
    if (apprentices.length > 0) {
      return res.status(200).json(apprentices);
    } else {
      return res.status(404).json({ message: "No se encontraron aprendices registrados." });
    }
  } catch (error) {
    logger.error(`Error al obtener los aprendices: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getApprentice = async (req, res) => {
  try {
    const apprentice = await ApprenticeModel.findByPk(req.params.Id_Aprendiz, {
      include: [
        {
          model: FichasModel,
          as: "fichas", // Alias usado para la relación
        },
        {
          model: cityModel,
          as: "ciudad", // Alias para la relación con Ciudad
        },
      ],
    });
    if (apprentice) {
      return res.status(200).json(apprentice);
    } else {
      return res
        .status(404)
        .json({ message: "Aprendiz no encontrado o no existe" });
    }
  } catch (error) {
    logger.error(`Error al obtener el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const createApprentice = async (req, res) => {
  try {
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
    } = req.body;

    const Foto_Aprendiz = req.file ? req.file.filename : null;

    // Validación de campos obligatorios
    if (
      !Id_Aprendiz ||
      !Nom_Aprendiz ||
      !Ape_Aprendiz ||
      !Id_Ficha ||
      !Fec_Nacimiento ||
      !Id_Ciudad ||
      !Lugar_Residencia ||
      !Edad ||
      !Hijos ||
      !Nom_Eps ||
      !Tel_Padre ||
      !Gen_Aprendiz ||
      !Cor_Aprendiz ||
      !Tel_Aprendiz ||
      !Estado ||
      !CentroConvivencia
    ) {
      return res
        .status(400)
        .json({
          message:
            "Todos los campos son obligatorios O El documento esta repetido",
        });
    }

    const newApprentice = await ApprenticeModel.create({
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
    if (newApprentice) {
      res.status(201).json({
        apprentice: newApprentice,
        message: "Aprendiz registrado correctamente",
      });
      return;
    }
  } catch (error) {
    logger.error(`Error al crear el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateApprentice = async (req, res) => {
  try {
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
    } = req.body;

    // En el backend
    const Foto_Aprendiz = req.file ? req.file.filename : null;

    const [updated] = await ApprenticeModel.update(
      {
        Id_Aprendiz,
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
        where: { Id_Aprendiz: req.params.Id_Aprendiz },
      }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Aprendiz no encontrado" });
    } else {
      return res.json({ message: "Aprendiz actualizado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al actualizar el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteApprentice = async (req, res) => {
  try {
    const result = await ApprenticeModel.destroy({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });
    if (result === 0) {
      return res.status(404).json({ message: "Aprendiz no encontrado" });
    } else {
      return res.json({ message: "Aprendiz eliminado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al eliminar el aprendiz: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

// Función importCSV
export const importCSV = async (req, res) => {
  try {
    const filePath = req.file.path;
    const results = [];

    // Leer el archivo CSV y procesar sus filas
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
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
            where: { Id_Ficha: Id_Ficha },
          });

          if (!fichaExists) {
            return res
              .status(400)
              .json({ error: `La ficha ${Id_Ficha} no existe` });
          }

          const aprendizExists = await ApprenticeModel.findOne({
            where: { Id_Aprendiz: Id_Aprendiz },
          });

          if (aprendizExists) {
            return res
              .status(400)
              .json({
                error: `El aprendiz con documento ${Id_Aprendiz} ya existe`,
              });
          }

          // Crear el aprendiz en la base de datos con los campos requeridos
          await ApprenticeModel.create({
            Id_Aprendiz: Id_Aprendiz,
            Nom_Aprendiz: Nom_Aprendiz,
            Ape_Aprendiz: Ape_Aprendiz,
            Id_Ficha: Id_Ficha,
            Fec_Nacimiento: "2000-01-01", // Manejar fecha vacía
            Id_Ciudad: Id_Ciudad,
            Lugar_Residencia: "mz j ?",
            Edad: Edad,
            // Otros campos con valores por defecto o vacíos
            Hijos: "No", // Valor por defecto
            Nom_Eps: "No",
            Tel_Padre: "0",
            Gen_Aprendiz: "Otro", // Si deseas asignar un valor por defecto para el género
            Cor_Aprendiz: "ejemplo@gmail.com",
            Tel_Aprendiz: "0",
            Tot_Memorandos: 0, // Valor vacío para memorandos
            Tot_Inasistencias: 0, // Valor vacío para inasistencias
            Patrocinio: "No", // Por defecto
            Estado: "Activo", // Asignar estado por defecto
            Nom_Empresa: "", // Si no se proporciona el nombre de la empresa
            CentroConvivencia: "No", // Valor por defecto para este campo
            Foto_Aprendiz: "default.png", // Foto nula
            // Agregar otros campos si es necesario
          });
        }

        // Eliminar el archivo CSV después de procesarlo
        fs.unlinkSync(filePath);

        res
          .status(200)
          .json({ message: "CSV cargado y procesado correctamente" });
      });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar el archivo CSV" });
  }
};


