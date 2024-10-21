import AbsenceModel from "../models/absenceModel.js";
import { logger } from "../middleware/logMiddleware.js";
import db from "../database/db.js";

// Obtener todas las inasistencias
export const getAllAbsences = async (req, res) => {
  try {
    // Realizar el LEFT JOIN entre inasistencias, turnosrutinarios y aprendices
    const inasistencias = await db.query(
      `
      SELECT 
        inasistencias.*, 
        turnosrutinarios.Fec_InicioTurno, 
        turnosrutinarios.Fec_FinTurno, 
        turnosrutinarios.Hor_InicioTurno, 
        turnosrutinarios.Hor_FinTurno, 
        turnosrutinarios.Obs_TurnoRutinario,
  
      CASE
        WHEN inasistencias.Turno_Id = turnosrutinarios.Id_TurnoRutinario THEN turnosrutinarios.Id_Aprendiz
        ELSE inasistencias.Turno_Id
      END AS Id_Aprendiz,
      CASE
        WHEN inasistencias.Turno_Id = turnosrutinarios.Id_TurnoRutinario THEN CONCAT(aprendizTurno.Nom_Aprendiz, ' ', aprendizTurno.Ape_Aprendiz)
        ELSE CONCAT(aprendices.Nom_Aprendiz, ' ', aprendices.Ape_Aprendiz)
      END AS NombreCompleto,
      CASE
        WHEN inasistencias.Turno_Id = turnosrutinarios.Id_TurnoRutinario THEN programasTurno.Nom_ProgramaFormacion
        ELSE programasAprendices.Nom_ProgramaFormacion
      END AS ProgramaFormacion
      FROM 
        inasistencias
      LEFT JOIN turnosrutinarios 
        ON inasistencias.Turno_Id = turnosrutinarios.Id_TurnoRutinario
      LEFT JOIN aprendices AS aprendizTurno 
        ON turnosrutinarios.Id_Aprendiz = aprendizTurno.Id_Aprendiz
      LEFT JOIN aprendices 
        ON inasistencias.Turno_Id = aprendices.Id_Aprendiz
      LEFT JOIN fichas AS fichasTurno 
        ON aprendizTurno.Id_Ficha = fichasTurno.Id_Ficha
      LEFT JOIN fichas AS fichasAprendiz 
        ON aprendices.Id_Ficha = fichasAprendiz.Id_Ficha
      LEFT JOIN programasformacion AS programasTurno 
        ON fichasTurno.Id_ProgramaFormacion = programasTurno.Id_ProgramaFormacion
      LEFT JOIN programasformacion AS programasAprendices 
        ON fichasAprendiz.Id_ProgramaFormacion = programasAprendices.Id_ProgramaFormacion;
    `,
      {
        type: db.QueryTypes.SELECT,
      }
    );

    // Verificar si se encontraron inasistencias
    if (inasistencias && inasistencias.length > 0) {
      return res.status(200).json(inasistencias); // Retornar todas las inasistencias
    } else {
      return res.status(404).json({
        message: "No se encontraron inasistencias.",
      });
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al obtener las inasistencias: ${error}`);
    return res.status(500).json({ message: "Ocurrio un error con el servidor" });
  }
};

// Obtener una inasistencia específica por ID
export const getAbsence = async (req, res) => {
  try {
    // Se busca una inasistencia por su ID
    const inasistencia = await AbsenceModel.findByPk(
      req.params.Id_Inasistencia
    );

    // Si se encuentra la inasistencia, se retorna con un código 200
    if (inasistencia) {
      return res.status(200).json(inasistencia);
    } else {
      // Si no se encuentra la inasistencia, se retorna un código 404 con un mensaje
      return res.status(404).json({ message: "Inasistencia no encontrada" });
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al obtener la inasistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Crear una nueva inasistencia
export const createAbsence = async (req, res) => {
  try {
    const { Fec_Inasistencia, Mot_Inasistencia, Turno_Id, Tipo_Inasistencia } =
      req.body;

    // Se crea una nueva inasistencia con los datos proporcionados
    const newInasistencia = await AbsenceModel.create({
      Fec_Inasistencia,
      Mot_Inasistencia,
      Turno_Id,
      Tipo_Inasistencia,
    });

    // Si la inasistencia se crea con éxito, se retorna con un código 201
    if (newInasistencia) {
      return res.status(201).json(newInasistencia);
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al crear la inasistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar una inasistencia existente
export const updateAbsence = async (req, res) => {
  try {
    const { Fec_Inasistencia, Mot_Inasistencia, Turno_Id, Tipo_Inasistencia } =
      req.body;
    // Validar los datos antes de proceder
    if (
      !Fec_Inasistencia ||
      !Mot_Inasistencia ||
      !Turno_Id ||
      !Tipo_Inasistencia
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar que el Tipo_Inasistencia sea válido
    if (
      Tipo_Inasistencia !== "turno_rutinario" &&
      Tipo_Inasistencia !== "turno_especial"
    ) {
      return res
        .status(400)
        .json({ message: "Tipo de Inasistencia no válido" });
    }

    // Actualizar la inasistencia
    const [updated] = await AbsenceModel.update(
      {
        Fec_Inasistencia,
        Mot_Inasistencia,
        Turno_Id,
        Tipo_Inasistencia,
      },
      {
        where: { Id_Inasistencia: req.params.Id_Inasistencia },
      }
    );

    // Si no se actualiza ninguna fila, significa que no se encontró la inasistencia
    if (updated === 0) {
      return res.status(404).json({ message: "Inasistencia no encontrada" });
    }

    // Obtener los datos del turno rutinario asociado con el inner join
    const [result] = await db.query(
      `
      SELECT inasistencias.*, turnosrutinarios.Fec_InicioTurno, turnosrutinarios.Fec_FinTurno,
             turnosrutinarios.Hor_InicioTurno, turnosrutinarios.Hor_FinTurno, turnosrutinarios.Obs_TurnoRutinario
      FROM inasistencias
      INNER JOIN turnosrutinarios
      ON inasistencias.Turno_Id = turnosrutinarios.Id_TurnoRutinario
      WHERE inasistencias.Id_Inasistencia = :Id_Inasistencia
    `,
      {
        replacements: { Id_Inasistencia: req.params.Id_Inasistencia },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Si no se encontró el turno rutinario asociado, devolver un error
    if (!result) {
      return res.status(404).json({
        message: "Turno rutinario no encontrado para esta inasistencia",
      });
    }

    // Devolver la inasistencia actualizada junto con los datos del turno rutinario
    return res.json({
      message: "Inasistencia actualizada correctamente",
      data: result, // Aquí se devuelve el resultado del join
    });
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al actualizar la inasistencia: ${error}`);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteAbsence = async (req, res) => {
  try {
    const { Id_Inasistencia } = req.params;

    // Asegúrate de que Id_TurnoRutinario no sea undefined o null
    if (!Id_Inasistencia) {
      return res
        .status(400)
        .json({ message: "Id_TurnoRutinario es requerido" });
    }

    const result = await AbsenceModel.destroy({
      where: { Id_Inasistencia: req.params.Id_Inasistencia },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Inasistencia no encontrada" });
    } else {
      res.json({ message: "Inasistencia eliminada correctamente" });
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al eliminar la inasistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};