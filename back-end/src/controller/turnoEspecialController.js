// controllers/turnoEspecialController.js
import { logger } from "../middleware/logMiddleware.js";
import { Op, Sequelize } from "sequelize";
import {
  findAllTurnosEspeciales,
  findTurnoEspecialById,
  createTurnoEspecialService,
  updateTurnoEspecialService,
  deleteTurnoEspecialService,
  findTurnoEspecialForFichas,
} from "../services/turnoEspecialService.js";

export const getAllTurnosEspeciales = async (req, res) => {
  try {
    const turnosEspeciales = await findAllTurnosEspeciales();
    if (turnosEspeciales.length > 0) {
      return res.status(200).json(turnosEspeciales);
    } else {
      return res.status(404).json({
        message: "No se encontraron turnos especiales registrados.",
      });
    }
  } catch (error) {
    logger.error(`Error al obtener los turnos especiales: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener los turnos especiales.",
    });
  }
};

export const getTurnoEspecial = async (req, res) => {
  try {
    const turnoEspecial = await findTurnoEspecialById(req.params.Id_TurnoEspecial);
    if (turnoEspecial) {
      return res.status(200).json(turnoEspecial);
    } else {
      return res.status(404).json({ message: "Turno especial no encontrado" });
    }
  } catch (error) {
    logger.error(`Error al obtener el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener el turno especial.",
    });
  }
};

export const createTurnoEspecial = async (req, res) => {
  try {
    const {
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Id_Funcionario,
      Id_Unidad,
    } = req.body;
    // Procesamos la imagen de asistencia (si existe)
    const Img_Asistencia = req.file ? req.file.filename : null;

    const newTurnoEspecial = await createTurnoEspecialService({
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Img_Asistencia,
      Id_Funcionario,
      Id_Unidad,
    });
    if (newTurnoEspecial) {
      return res.status(201).json({
        message: "Turno Especial Creado Exitosamente",
        newTurnoEspecial,
      });
    }
  } catch (error) {
    logger.error(`Error al crear el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al crear el turno especial.",
    });
  }
};

export const updateTurnoEspecial = async (req, res) => {
  try {
    const {
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Id_Funcionario,
      Id_Unidad,
    } = req.body;
    const Img_Asistencia = req.file ? req.file.filename : null;

    const updateData = {
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Img_Asistencia,
      Id_Funcionario,
      Id_Unidad,
    };

    await updateTurnoEspecialService(req.params.Id_TurnoEspecial, updateData);
    return res.json({
      message:
        "Turno especial actualizado correctamente y aprendices asociados actualizados",
    });
  } catch (error) {
    logger.error(`Error al actualizar el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al actualizar el turno especial.",
    });
  }
};

export const deleteTurnoEspecial = async (req, res) => {
  try {
    const { result, deletedAssociations } = await deleteTurnoEspecialService(
      req.params.Id_TurnoEspecial
    );
    if (result === 0) {
      return res.status(404).json({ message: "Turno especial no encontrado" });
    } else {
      return res.json({
        message: `Turno especial y ${deletedAssociations} asociaciones de aprendices eliminados correctamente`,
      });
    }
  } catch (error) {
    logger.error(`Error al eliminar el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al eliminar el turno especial.",
    });
  }
};

export const getTurnoEspecialForFichas = async (req, res) => {
  try {
    // Se obtiene la fecha de hoy en formato YYYY-MM-DD
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaHoy = hoy.toISOString().split("T")[0];

    const turnoEspecialForFichas = await findTurnoEspecialForFichas(
      req.params.Id_Ficha,
      fechaHoy
    );

    if (turnoEspecialForFichas.length === 0) {
      return res
        .status(404)
        .json({ message: "La ficha no está programada para turno especial" });
    }
    return res.status(200).json(turnoEspecialForFichas);
  } catch (error) {
    logger.error(`Error al obtener el turno programado: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
