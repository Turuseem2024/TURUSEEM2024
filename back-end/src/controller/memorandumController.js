import { logger } from "../middleware/logMiddleware.js";
import MemorandumModel from "../models/memorandumModel.js";
import AbsenceModel from "../models/absenceModel.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";
import fs from "fs";
import pdf from "html-pdf";
import db from "../database/db.js";

// Controlador para obtener todos los memorandos
export const getAllMemorandum = async (req, res) => {
  try {
    const memorandums = await MemorandumModel.findAll({
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia",
          include: [
            {
              model: TurnoRutinarioModel,
              as: "turnorutinario",
              include: [
                {
                  model: ApprenticeModel,
                  as: "aprendiz",
                },
                {
                  model: UnitModel,
                  as: "unidad",
                },
              ],
            },
          ],
        },
      ],
    });

    if (memorandums.length > 0) {
      return res.status(200).json(memorandums);
    } else {
      return res.status(404).json({
        message: "No se encontraron memorandos.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandums: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar los memorandos.",
    });
  }
};

// Controlador para obtener un memorando específico por ID
export const getMemorandum = async (req, res) => {
  try {
    const memorandum = await MemorandumModel.findOne({
      where: { Id_Memorando: req.params.Id_Memorando },
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia",
          include: [
            {
              model: TurnoRutinarioModel,
              as: "turnorutinario",
              include: [
                {
                  model: ApprenticeModel,
                  as: "aprendiz",
                },
                {
                  model: UnitModel,
                  as: "unidad",
                },
              ],
            },
          ],
        },
      ],
    });

    if (memorandum) {
      return res.status(200).json(memorandum);
    } else {
      return res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandum: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar el memorando.",
    });
  }
};

// Controlador para obtener el total de memorandos
export const getTotalMemorandums = async () => {
  try {
    return await MemorandumModel.count();
  } catch (error) {
    logger.error("Error obteniendo el total de memorandos: ", error.message);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

// Controlador para crear un nuevo memorando
export const createMemorandum = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const newMemorandum = await MemorandumModel.create(req.body, {
      transaction,
    });

    const fullMemorandum = await MemorandumModel.findOne({
      where: { Id_Memorando: newMemorandum.Id_Memorando },
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia",
          include: [
            {
              model: TurnoRutinarioModel,
              as: "turnorutinario",
              include: [
                {
                  model: ApprenticeModel,
                  as: "aprendiz",
                },
                {
                  model: UnitModel,
                  as: "unidad",
                },
              ],
            },
          ],
        },
      ],
      transaction,
    });

    // Si se desea generar un PDF después de crear el memorando, se debe descomentar el código
    // const totalMemorandums = await getTotalMemorandums();
    // await generateMemorandumPdf(fullMemorandum, totalMemorandums);

    await transaction.commit();

    return res.status(201).json({
      message: "Memorando registrado correctamente!",
      data: newMemorandum,
    });
  } catch (error) {
    await transaction.rollback();
    logger.error("Error creating memorandum: ", error.message);
    return res.status(400).json({
      message: "Error al registrar el memorando.",
      error: error.message,
    });
  }
};

// Controlador para actualizar un memorando existente
export const updateMemorandum = async (req, res) => {
  try {
    const [updated] = await MemorandumModel.update(req.body, {
      where: { Id_Memorando: req.params.Id_Memorando },
    });

    if (updated) {
      return res.json({
        message: "Memorando actualizado correctamente!",
      });
    } else {
      return res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error updating memorandum: ", error.message);
    return res.status(400).json({
      message: "Error al actualizar el memorando.",
      error: error.message,
    });
  }
};

// Controlador para eliminar un memorando existente
export const deleteMemorandum = async (req, res) => {
  try {
    const deleted = await MemorandumModel.destroy({
      where: { Id_Memorando: req.params.Id_Memorando },
    });

    if (deleted) {
      return res.json({
        message: "Memorando borrado correctamente!",
      });
    } else {
      return res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error deleting memorandum: ", error.message);
    return res.status(400).json({
      message: "Error al borrar el memorando.",
      error: error.message,
    });
  }
};

// Controlador para generar un PDF de memorando
export const generateMemorandumPdf = (memorandum, totalMemorandums, res) => {
  try {
    // Accedemos a los datos del memorandum y sus asociaciones
    const { inasistencia } = memorandum;
    const { turnorutinario } = inasistencia;
    const { aprendiz, unidad } = turnorutinario;

    // Ruta para acceder a la plantilla HTML
    const raiz = process.cwd() + "\\src";

    // Leemos la plantilla HTML
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

    // Reemplazamos los marcadores en la plantilla con datos reales
    const htmlContent = plantillaHtml
      .replace("{{FechaActual}}", fechaActual)
      .replace("{{NumeroMemorando}}", totalMemorandums)
      .replace("{{NombreAprendiz}}", aprendiz.Nom_Aprendiz)
      .replace("{{ProgramaFormacion}}", aprendiz.ProgramaFormacion)
      .replace("{{FichaNo}}", aprendiz.FichaNo)
      .replace("{{UnidadAsignada}}", unidad.NombreUnidad);

    // Creamos el PDF a partir del contenido HTML
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        // Manejamos el error al generar el PDF
        logger.error("Error generating PDF: ", err.message);
        return res.status(500).json({ error: err.message });
      }

      // Convertimos el PDF a base64 para su respuesta
      const base64 = buffer.toString("base64");
      return res.status(200).json({ Reporte: base64 });
    });
  } catch (error) {
    // Capturamos cualquier otro error durante el proceso
    logger.error("Error generating PDF: ", error.message);
    return res.status(500).json({ message: "Error al generar el PDF." });
  }
};

