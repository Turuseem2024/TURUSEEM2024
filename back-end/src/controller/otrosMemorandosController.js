import { logger } from "../middleware/logMiddleware.js";
import fs from "fs";
import pdf from "html-pdf";
import db from "../database/db.js";
import OtrosMemorandumModel from "../models/Otros_MemorandosModel.js";
import { emailMemorandos } from "../helpers/emailMemorandos.js";

export const getAllOtrosMemorandum = async (req, res) => {
  try {
    const query = `
SELECT 
    om.Id_OtroMemorando,
    om.Fec_OtroMemorando,
    om.Mot_OtroMemorando,
    om.Referencia_Id,
    om.ENVIADO,
    -- Obtener el aprendiz de la inasistencia, turno rutinario o referencia directa
    COALESCE(a.Id_Aprendiz, aprendizTurno.Id_Aprendiz, aprendizDirecto.Id_Aprendiz) AS Id_Aprendiz,
    COALESCE(a.Nom_Aprendiz, aprendizTurno.Nom_Aprendiz, aprendizDirecto.Nom_Aprendiz) AS Nom_Aprendiz,
    COALESCE(a.Ape_Aprendiz, aprendizTurno.Ape_Aprendiz, aprendizDirecto.Ape_Aprendiz) AS Ape_Aprendiz,
    inas.Id_Inasistencia,
    tr.Id_TurnoRutinario,
    tr.Fec_InicioTurno,
    tr.Fec_FinTurno,
    tr.Hor_InicioTurno,
    tr.Hor_FinTurno,
    tr.Obs_TurnoRutinario,
    programasTurno.Nom_ProgramaFormacion,
    -- Ficha y programa de formación del turno rutinario o referencia directa
    COALESCE(fichasTurno.Id_Ficha, fichasDirectas.Id_Ficha) AS Ficha_Turno,
    COALESCE(programasTurno.Id_ProgramaFormacion, programasDirectos.Id_ProgramaFormacion) AS Programa_Turno
FROM 
    otros_memorandos om
-- Si Referencia_Id es Id_Inasistencia
LEFT JOIN 
    inasistencias inas ON om.Referencia_Id = inas.Id_Inasistencia
LEFT JOIN 
    turnosrutinarios tr ON inas.Turno_Id = tr.Id_TurnoRutinario
LEFT JOIN 
    aprendices a ON inas.Turno_Id = a.Id_Aprendiz -- Aprendiz relacionado con la inasistencia
-- Si Referencia_Id es Id_Aprendiz relacionado con el turno rutinario
LEFT JOIN 
    aprendices AS aprendizTurno ON tr.Id_Aprendiz = aprendizTurno.Id_Aprendiz
LEFT JOIN 
    fichas AS fichasTurno ON aprendizTurno.Id_Ficha = fichasTurno.Id_Ficha
LEFT JOIN 
    programasformacion AS programasTurno ON fichasTurno.Id_ProgramaFormacion = programasTurno.Id_ProgramaFormacion
-- Si Referencia_Id es Id_Aprendiz directo
LEFT JOIN 
    aprendices AS aprendizDirecto ON om.Referencia_Id = aprendizDirecto.Id_Aprendiz -- Aprendiz relacionado directamente
LEFT JOIN 
    fichas AS fichasDirectas ON aprendizDirecto.Id_Ficha = fichasDirectas.Id_Ficha
LEFT JOIN 
    programasformacion AS programasDirectos ON fichasDirectas.Id_ProgramaFormacion = programasDirectos.Id_ProgramaFormacion
-- Obtener la ficha y programa de formación del aprendiz de inasistencia o turno rutinario
LEFT JOIN 
    fichas f ON a.Id_Ficha = f.Id_Ficha
LEFT JOIN 
    programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
WHERE 
    om.Referencia_Id IS NOT NULL;

`;
    const [memorandums] = await db.query(query);
    if (memorandums.length > 0) {
      res.status(200).json(memorandums);
      return;
    } else {
      res.status(404).json({
        message: "No se encontraron memorandos registrados.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandums: ", error);
    res.status(500).json({
      message: "Error al recuperar los memorandos.",
    });
  }
};

export const getOtroMemorandum = async (req, res) => {
  try {
    const query = `
        SELECT om.Id_OtroMemorando,
          om.Fec_OtroMemorando,
          om.Mot_OtroMemorando,
          om.Referencia_Id,
          a.Id_Aprendiz,
          a.Nom_Aprendiz,
          a.Ape_Aprendiz,
          a.Id_Ficha,
          f.Id_ProgramaFormacion,
          p.Nom_ProgramaFormacion,
          tr.Id_TurnoRutinario,
          inas.Id_Inasistencia
        FROM otros_memorandos om
        LEFT JOIN inasistencias inas ON om.Referencia_Id = inas.Id_Inasistencia
        LEFT JOIN turnosrutinarios tr ON inas.Turno_Id = tr.Id_TurnoRutinario
        LEFT JOIN aprendices a ON tr.Id_Aprendiz = a.Id_Aprendiz
        LEFT JOIN fichas f ON a.Id_Ficha = f.Id_Ficha
        LEFT JOIN programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
        WHERE om.Id_OtroMemorando = :Id_OtroMemorando;
    `;

    const [memorandum] = await db.query(query, {
      replacements: { Id_OtroMemorando: req.params.Id_OtroMemorando },
    });

    if (memorandum.length > 0) {
      res.status(200).json(memorandum[0]); // Retorna el primer elemento si se encontró
      return;
    } else {
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandum: ", error);
    res.status(500).json({
      message: "Error al recuperar el memorando.",
    });
  }
};

export const getTotalOtrosMemorandums = async () => {
  try {
    return await OtrosMemorandumModel.count();
  } catch (error) {
    console.error("Error del total de memorandos", error);
    logger.error("Error obteniendo el total de memorandos: ", error);
    throw new Error("Error al obtener el total de memorandos.");
  }
};
export const getTotalOtrosMemorandumsForAprendiz = async (Id_Aprendiz) => {
  try {
    return await OtrosMemorandumModel.count({
      where: { Referencia_Id: Id_Aprendiz },
    });
  } catch (error) {
    logger.error("Error obteniendo el total de memorandos: ", error);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

export const createOtroMemorandum = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const { Fec_OtroMemorando, Mot_OtroMemorando, Id_Aprendiz } = req.body;
    const newMemorandum = await OtrosMemorandumModel.create(
      {
        Fec_OtroMemorando,
        Mot_OtroMemorando,
        Referencia_Id: Id_Aprendiz,
      },
      {
        transaction,
      }
    );
    await transaction.commit();
    if (newMemorandum) {
      res.status(201).json({
        newMemorandum,
        message: "Memorando creado exitosamente!",
      });
      return;
    }
  } catch (error) {
    await transaction.rollback();
    logger.error("Error creating memorandum: ", error);
    res.status(400).json({
      message: "Error al registrar el memorando.",
      error,
    });
  }
};

export const viewOtherMemorandumPdf = async (req, res) => {
  const transacción = await db.transaction();
  const { Id_OtroMemorando } = req.params;

  try {
    const query = `
SELECT 
    om.Id_OtroMemorando,
    om.Fec_OtroMemorando,
    om.Mot_OtroMemorando,
    om.Referencia_Id,
    COALESCE(a.Id_Aprendiz, aprendizTurno.Id_Aprendiz, aprendizDirecto.Id_Aprendiz) AS Id_Aprendiz, -- Maneja el Id_Aprendiz del turno, inasistencia o referencia directa
    COALESCE(a.Nom_Aprendiz, aprendizTurno.Nom_Aprendiz, aprendizDirecto.Nom_Aprendiz) AS Nom_Aprendiz,
    COALESCE(a.Ape_Aprendiz, aprendizTurno.Ape_Aprendiz, aprendizDirecto.Ape_Aprendiz) AS Ape_Aprendiz,
    COALESCE(a.Id_Ficha, aprendizTurno.Id_Ficha, aprendizDirecto.Id_Ficha) AS Id_Ficha,
    COALESCE(f.Id_ProgramaFormacion, fichasTurno.Id_ProgramaFormacion, fichasDirectas.Id_ProgramaFormacion) AS Id_ProgramaFormacion,
    COALESCE(p.Nom_ProgramaFormacion, programasTurno.Nom_ProgramaFormacion, programasDirectos.Nom_ProgramaFormacion) AS Nom_ProgramaFormacion,
    tr.Id_TurnoRutinario,
    inas.Id_Inasistencia
FROM 
    otros_memorandos om
-- Si Referencia_Id es Id_Inasistencia
LEFT JOIN 
    inasistencias inas ON om.Referencia_Id = inas.Id_Inasistencia
LEFT JOIN 
    turnosrutinarios tr ON inas.Turno_Id = tr.Id_TurnoRutinario
LEFT JOIN 
    aprendices a ON inas.Turno_Id = a.Id_Aprendiz -- Aprendiz relacionado con inasistencia
-- Si Referencia_Id es Id_Aprendiz relacionado con el turno rutinario
LEFT JOIN 
    aprendices AS aprendizTurno ON tr.Id_Aprendiz = aprendizTurno.Id_Aprendiz
LEFT JOIN 
    fichas AS fichasTurno ON aprendizTurno.Id_Ficha = fichasTurno.Id_Ficha
LEFT JOIN 
    programasformacion AS programasTurno ON fichasTurno.Id_ProgramaFormacion = programasTurno.Id_ProgramaFormacion
-- Si Referencia_Id es Id_Aprendiz directo
LEFT JOIN 
    aprendices AS aprendizDirecto ON om.Referencia_Id = aprendizDirecto.Id_Aprendiz -- Aprendiz relacionado directamente en Referencia_Id
LEFT JOIN 
    fichas AS fichasDirectas ON aprendizDirecto.Id_Ficha = fichasDirectas.Id_Ficha
LEFT JOIN 
    programasformacion AS programasDirectos ON fichasDirectas.Id_ProgramaFormacion = programasDirectos.Id_ProgramaFormacion
-- Relación con el programa de formación del aprendiz de inasistencia
LEFT JOIN 
    fichas f ON a.Id_Ficha = f.Id_Ficha
LEFT JOIN 
    programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
WHERE 
    om.Id_OtroMemorando = :Id_OtroMemorando;



    `;

    const [memorandumPdf] = await db.query(query, {
      replacements: { Id_OtroMemorando: Id_OtroMemorando },
      transaction: transacción,
    });

    

    if (!memorandumPdf || memorandumPdf.length === 0) {
      throw new Error("Memorando no encontrado");
    }

    const totalMemorandumForApprentice =
      await getTotalOtrosMemorandumsForAprendiz(memorandumPdf[0].Referencia_Id);

    const totalMemorandums = await getTotalOtrosMemorandums();

    const pdfBase64 = await generateOtroMemorandumPdf(
      memorandumPdf,
      totalMemorandums,
      totalMemorandumForApprentice
    );

    await transacción.commit();

    res.status(201).json({
      message: "PDF generado correctamente!",
      data: memorandumPdf[0],
      pdfBase64: pdfBase64,
    });
  } catch (error) {
    logger.error(error);
    await transacción.rollback();
    res
      .status(404)
      .json({ message: "Ocurrió un error, memorando no encontrado" });
  }
};

export const sendMemorandumPdf = async (req, res) => {
  const transacción = await db.transaction();
  const { Id_OtroMemorando } = req.params;

  try {
    // Obtener la información del memorando
    const query = `
 SELECT 
    om.Id_OtroMemorando,
    om.Fec_OtroMemorando,
    om.Mot_OtroMemorando,
    om.Referencia_Id,
    COALESCE(a.Id_Aprendiz, aprendizTurno.Id_Aprendiz, aprendizDirecto.Id_Aprendiz) AS Id_Aprendiz, -- Maneja el Id_Aprendiz del turno, inasistencia o referencia directa
    COALESCE(a.Nom_Aprendiz, aprendizTurno.Nom_Aprendiz, aprendizDirecto.Nom_Aprendiz) AS Nom_Aprendiz,
    COALESCE(a.Ape_Aprendiz, aprendizTurno.Ape_Aprendiz, aprendizDirecto.Ape_Aprendiz) AS Ape_Aprendiz,
	COALESCE(a.Cor_Aprendiz, aprendizTurno.Cor_Aprendiz, aprendizDirecto.Cor_Aprendiz) AS Cor_Aprendiz,
    COALESCE(a.Id_Ficha, aprendizTurno.Id_Ficha, aprendizDirecto.Id_Ficha) AS Id_Ficha,
    COALESCE(f.Id_ProgramaFormacion, fichasTurno.Id_ProgramaFormacion, fichasDirectas.Id_ProgramaFormacion) AS Id_ProgramaFormacion,
    COALESCE(p.Nom_ProgramaFormacion, programasTurno.Nom_ProgramaFormacion, programasDirectos.Nom_ProgramaFormacion) AS Nom_ProgramaFormacion,
    tr.Id_TurnoRutinario,
    inas.Id_Inasistencia
FROM 
    otros_memorandos om
-- Si Referencia_Id es Id_Inasistencia
LEFT JOIN 
    inasistencias inas ON om.Referencia_Id = inas.Id_Inasistencia
LEFT JOIN 
    turnosrutinarios tr ON inas.Turno_Id = tr.Id_TurnoRutinario
LEFT JOIN 
    aprendices a ON inas.Turno_Id = a.Id_Aprendiz -- Aprendiz relacionado con inasistencia
-- Si Referencia_Id es Id_Aprendiz relacionado con el turno rutinario
LEFT JOIN 
    aprendices AS aprendizTurno ON tr.Id_Aprendiz = aprendizTurno.Id_Aprendiz
LEFT JOIN 
    fichas AS fichasTurno ON aprendizTurno.Id_Ficha = fichasTurno.Id_Ficha
LEFT JOIN 
    programasformacion AS programasTurno ON fichasTurno.Id_ProgramaFormacion = programasTurno.Id_ProgramaFormacion
-- Si Referencia_Id es Id_Aprendiz directo
LEFT JOIN 
    aprendices AS aprendizDirecto ON om.Referencia_Id = aprendizDirecto.Id_Aprendiz -- Aprendiz relacionado directamente en Referencia_Id
LEFT JOIN 
    fichas AS fichasDirectas ON aprendizDirecto.Id_Ficha = fichasDirectas.Id_Ficha
LEFT JOIN 
    programasformacion AS programasDirectos ON fichasDirectas.Id_ProgramaFormacion = programasDirectos.Id_ProgramaFormacion
-- Relación con el programa de formación del aprendiz de inasistencia
LEFT JOIN 
    fichas f ON a.Id_Ficha = f.Id_Ficha
LEFT JOIN 
    programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
WHERE 
    om.Id_OtroMemorando = :Id_OtroMemorando;
    `;

    const [memorandumPdf] = await db.query(query, {
      replacements: { Id_OtroMemorando },
      transaction: transacción,
    });
    if (!memorandumPdf) {
      throw new Error("Memorando no encontrado");
    }

    // Obtener el total de memorandos
    const totalMemorandumForApprentice =
      await getTotalOtrosMemorandumsForAprendiz(memorandumPdf[0].Referencia_Id);
    const totalMemorandums = await getTotalOtrosMemorandums();
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const año = hoy.getFullYear();
    let trimestreActual;
    if (mes >= 1 && mes <= 3) {
      trimestreActual = "I";
    } else if (mes >= 4 && mes <= 6) {
      trimestreActual = "II";
    } else if (mes >= 7 && mes <= 9) {
      trimestreActual = "III";
    } else if (mes >= 10 && mes <= 12) {
      trimestreActual = "IV";
    }

    // Generar el PDF en base64
    const pdfBase64 = await generateOtroMemorandumPdf(
      memorandumPdf,
      totalMemorandums,
      totalMemorandumForApprentice,
      trimestreActual,
      año
    );

    // Enviar el memorando por email y recibir la confirmación
    const emailSent = await emailMemorandos({
      Cor_Aprendiz: memorandumPdf[0].Cor_Aprendiz,
      Nom_Aprendiz: memorandumPdf[0].Nom_Aprendiz,
      Tot_Memorandos: totalMemorandumForApprentice,
      Nom_TalentoHumano: "Monica Talento Humano",
      Nom_ProgramaFormacion: memorandumPdf[0].Nom_ProgramaFormacion,
      trimestreActual: trimestreActual,
      añoActual: año,
      pdfBase64: pdfBase64
    });

    // Si el correo se envió correctamente, actualizar el campo ENVIADO
    if (emailSent) {
      await db.query(
        `UPDATE otros_memorandos SET ENVIADO = true WHERE Id_OtroMemorando = :Id_OtroMemorando`,
        { replacements: { Id_OtroMemorando }, transaction: transacción }
      );
    } else {
      throw new Error("No se pudo enviar el email");
    }

    // Confirmar la transacción
    await transacción.commit();

    // Responder con éxito
    res.status(201).json({
      message: "Memorando enviado correctamente!",
      data: memorandumPdf,
      pdfBase64: pdfBase64,
    });
  } catch (error) {
    // Si ocurre un error, hacer rollback de la transacción
    await transacción.rollback();
    logger.error(error);
    // Enviar el error en la respuesta
    res.status(404).json({
      message: "Ocurrió un error, memorando no encontrado o fallo en el envío",
      error: error.message,
    });
  }
};

export const updateOtroMemorandum = async (req, res) => {
  try {
    const [updated] = await OtrosMemorandumModel.update(req.body, {
      where: { Id_OtroMemorando: req.params.Id_OtroMemorando },
    });
    if (updated) {
      res.json({
        message: "Memorando actualizado correctamente!",
      });
      return;
    } else {
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error updating memorandum: ", error);
    res.status(400).json({
      message: "Error al actualizar el memorando.",
      error: error.message,
    });
  }
};

export const deleteOtroMemorandum = async (req, res) => {
  try {
    const deleted = await OtrosMemorandumModel.destroy({
      where: { Id_OtroMemorando: req.params.Id_OtroMemorando },
    });
    if (deleted) {
      res.json({
        message: "Memorando borrado correctamente!",
      });
      return;
    } else {
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error deleting memorandum: ", error.message);
    res.status(400).json({
      message: "Error al borrar el memorando.",
      error: error.message,
    });
  }
};

export const generateOtroMemorandumPdf = (
  memorandum,
  totalMemorandums,
  totalMemorandumForApprentice
) => {
  return new Promise((resolve, reject) => {
    const {
      Fec_OtroMemorando,
      Nom_Aprendiz,
      Ape_Aprendiz,
      Nom_ProgramaFormacion,
      Id_Ficha,
      Mot_OtroMemorando,
    } = memorandum[0];
    const raiz = process.cwd();

    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const año = hoy.getFullYear();
    let trimestreActual;
    if (mes >= 1 && mes <= 3) {
      trimestreActual = "I";
    } else if (mes >= 4 && mes <= 6) {
      trimestreActual = "II";
    } else if (mes >= 7 && mes <= 9) {
      trimestreActual = "III";
    } else if (mes >= 10 && mes <= 12) {
      trimestreActual = "IV";
    }

    const plantillaHtml = fs.readFileSync(
      `${raiz}/public/plantillas/plantilla-memorando.html`,
      "utf-8"
    );

    const htmlContent = plantillaHtml
      .replace("{{FechaActual}}", Fec_OtroMemorando)
      .replace("{{NumeroMemorando}}", totalMemorandums)
      .replace("{{NombreAprendiz}}", Nom_Aprendiz)
      .replace("{{ApellidoAprendiz}}", Ape_Aprendiz)
      .replace("{{ProgramaFormacion}}", Nom_ProgramaFormacion)
      .replace("{{FichaNo}}", Id_Ficha)
      .replace("{{UnidadAsignada}}", "Sena Empresa")
      .replace("{{FechaActual}}", Fec_OtroMemorando)
      .replace("{{Mot_OtroMemorando}}", Mot_OtroMemorando)
      .replace("{{totalMemorandumForApprentice}}", totalMemorandumForApprentice) //totalMemorandumForApprentice
      .replace("{{trimestre}}", trimestreActual)
      .replace("{{AnoActual}}", año)
      .replace("{{NombreLider}}", "Daniel Cardenas Lozano")

    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      timeout: 30000,
      base: "http://localhost:8000",
    };

    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
      }
      const base64 = buffer.toString("base64");
      resolve(base64);
    });
  });
};