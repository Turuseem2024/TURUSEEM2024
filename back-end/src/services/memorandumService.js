import MemorandumModel from "../models/memorandumModel.js";
import AsistenciaModel from "../models/attendaceModel.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";
import db from "../database/db.js";
import fs from "fs";
import pdf from "html-pdf";

// Función auxiliar que define los *includes* comunes para los queries.
const memorandumsIncludes = [
  {
    model: AsistenciaModel,
    as: "inasistencia",
    include: [
      {
        model: TurnoRutinarioModel,
        as: "turnorutinario",
        include: [
          { model: ApprenticeModel, as: "aprendiz" },
          { model: UnitModel, as: "unidad" },
        ],
      },
    ],
  },
];

export const getAllMemorandumsService = async () => {
  return await MemorandumModel.findAll({
    include: memorandumsIncludes,
  });
};

export const getMemorandumService = async (id) => {
  return await MemorandumModel.findOne({
    where: { Id_Memorando: id },
    include: memorandumsIncludes,
  });
};

export const getTotalMemorandumsService = async () => {
  try {
    return await MemorandumModel.count();
  } catch (error) {
    throw new Error("Error al obtener el total de memorandos.");
  }
};

export const createMemorandumService = async (data) => {
  const transaction = await db.transaction();
  try {
    const newMemorandum = await MemorandumModel.create(data, { transaction });
    const fullMemorandum = await MemorandumModel.findOne({
      where: { Id_Memorando: newMemorandum.Id_Memorando },
      include: memorandumsIncludes,
      transaction,
    });

    // Si se desea generar un PDF justo después de crear el memorando,
    // se puede llamar a generateMemorandumPdfService en este punto (comentado por defecto).
    // const totalMemorandums = await getTotalMemorandumsService();
    // const pdfResult = await generateMemorandumPdfService(fullMemorandum, totalMemorandums);
    
    await transaction.commit();
    return { newMemorandum, fullMemorandum };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updateMemorandumService = async (id, data) => {
  return await MemorandumModel.update(data, {
    where: { Id_Memorando: id },
  });
};

export const deleteMemorandumService = async (id) => {
  return await MemorandumModel.destroy({
    where: { Id_Memorando: id },
  });
};

export const generateMemorandumPdfService = (memorandum, totalMemorandums) => {
  try {
    // Extraemos las asociaciones necesarias
    const { inasistencia } = memorandum;
    const { turnorutinario } = inasistencia;
    const { aprendiz, unidad } = turnorutinario;

    // Ruta de la plantilla HTML
    const raiz = process.cwd() + "\\src";
    const plantillaHtml = fs.readFileSync(
      `${raiz}/public/plantillas/plantilla-memorando.html`,
      "utf-8"
    );

    // Generamos la fecha actual
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const año = hoy.getFullYear();
    const fechaActual = `${dia}/${mes}/${año}`;

    // Reemplazamos los marcadores con la información real
    const htmlContent = plantillaHtml
      .replace("{{FechaActual}}", fechaActual)
      .replace("{{NumeroMemorando}}", totalMemorandums)
      .replace("{{NombreAprendiz}}", aprendiz.Nom_Aprendiz)
      .replace("{{ProgramaFormacion}}", aprendiz.ProgramaFormacion)
      .replace("{{FichaNo}}", aprendiz.FichaNo)
      .replace("{{UnidadAsignada}}", unidad.NombreUnidad);

    // Retornamos una promesa que resuelve con el PDF en base64
    return new Promise((resolve, reject) => {
      pdf.create(htmlContent).toBuffer((err, buffer) => {
        if (err) return reject(err);
        const base64 = buffer.toString("base64");
        resolve({ Reporte: base64 });
      });
    });
  } catch (error) {
    throw error;
  }
};
