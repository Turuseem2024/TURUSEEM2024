// controllers/turnoRutinarioController.js
import { logger } from "../middleware/logMiddleware.js";
import { Op, Sequelize } from "sequelize";
import {
  findAllTurnosRutinarios,
  findTurnoRutinarioById,
  createTurnoRutinarioService,
  updateTurnoRutinarioService,
  deleteTurnoRutinarioService,
  findTurnosForAprendiz,
  updateInasistenciaService,
} from "../services/turnoRutinarioService.js";

export const getAllTurnosRutinarios = async (req, res) => {
  try {
    const turnosRutinarios = await findAllTurnosRutinarios();
    if (turnosRutinarios.length > 0) {
      return res.status(200).json(turnosRutinarios);
    } else {
      return res.status(404).json({ message: "No se encontraron turnos rutinarios registrados." });
    }
  } catch (error) {
    logger.error(`Error al obtener los turnos rutinarios: ${error.message}`);
    return res.status(500).json({ message: "Error al obtener los turnos rutinarios." });
  }
};

export const getTurnoRutinario = async (req, res) => {
  try {
    const turnoRutinario = await findTurnoRutinarioById(req.params.Id_TurnoRutinario);
    if (turnoRutinario) {
      return res.status(200).json(turnoRutinario);
    } else {
      return res.status(404).json({ message: "Turno rutinario no encontrado." });
    }
  } catch (error) {
    logger.error(`Error al obtener el turno rutinario: ${error.message}`);
    return res.status(500).json({ message: "Error al obtener el turno rutinario." });
  }
};

export const createTurnoRutinario = async (req, res) => {
  try {
    const {
      Fec_InicioTurno,
      Fec_FinTurno,
      Hor_InicioTurno,
      Hor_FinTurno,
      Obs_TurnoRutinario,
      Ind_Asistencia,
      Id_Aprendiz,
      Id_Unidad,
    } = req.body;

    const newTurnoRutinario = await createTurnoRutinarioService({
      Fec_InicioTurno,
      Fec_FinTurno,
      Hor_InicioTurno,
      Hor_FinTurno,
      Obs_TurnoRutinario,
      Ind_Asistencia,
      Id_Aprendiz,
      Id_Unidad,
    });
    if (newTurnoRutinario) {
      return res.status(201).json(newTurnoRutinario);
    }
  } catch (error) {
    logger.error(`Error al crear el turno rutinario: ${error.message}`);
    return res.status(500).json({ message: "Error al crear el turno rutinario." });
  }
};

export const updateTurnoRutinario = async (req, res) => {
  try {
    const updateData = req.body;
    const { Id_TurnoRutinario } = req.params;
    const [updated] = await updateTurnoRutinarioService(Id_TurnoRutinario, updateData);

    if (updated === 0) {
      return res.status(404).json({ message: "Turno rutinario no encontrado." });
    } else {
      // Si se indicó que el aprendiz asistió ("Sí") se procesa la eliminación de la inasistencia
      if (updateData.Ind_Asistencia === "Sí") {
        await updateInasistenciaService(
          { Id_Aprendiz: updateData.Id_Aprendiz },
          {
            Ind_Asistencia: updateData.Ind_Asistencia,
            Turno_Id: Id_TurnoRutinario,
            Fec_Inasistencia: updateData.Fec_Inasistencia, // Se debe enviar en el body si aplica
            Motivo: updateData.Motivo,
            Tipo_Inasistencia: updateData.Tipo_Inasistencia,
          }
        );
      }
      return res.json({ message: "Turno rutinario actualizado correctamente y se eliminó la inasistencia si existía." });
    }
  } catch (error) {
    logger.error(`Error al actualizar el turno rutinario: ${error.message}`);
    return res.status(500).json({ message: "Error al actualizar el turno rutinario." });
  }
};

export const deleteTurnoRutinario = async (req, res) => {
  try {
    const result = await deleteTurnoRutinarioService(req.params.Id_TurnoRutinario);
    if (result === 0) {
      return res.status(404).json({ message: "Turno rutinario no encontrado." });
    } else {
      return res.json({ message: "Turno rutinario eliminado correctamente." });
    }
  } catch (error) {
    logger.error(`Error al eliminar el turno rutinario: ${error.message}`);
    return res.status(500).json({ message: "Error al eliminar el turno rutinario." });
  }
};

export const getTurnoRutinariosForAprendiz = async (req, res) => {
  try {
    // Se obtiene la fecha de hoy en formato YYYY-MM-DD
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaHoy = hoy.toISOString().split("T")[0];
    const turnos = await findTurnosForAprendiz(req.params.Id_Aprendiz, fechaHoy);
    if (turnos.length === 0) {
      return res.status(404).json({ message: "No tienes turno programado para hoy" });
    }
    return res.status(200).json(turnos);
  } catch (error) {
    logger.error(`Error al obtener los turnos rutinarios para el aprendiz: ${error.message}`);
    return res.status(500).json({ message: "Error al obtener los turnos rutinarios para el aprendiz." });
  }
};

/**
 * Controlador para actualizar la inasistencia y el memorando asociado.
 * Invoca el servicio que realiza la lógica de incremento/decremento y
 * creación/eliminación de registros.
 */
export const updateInasistencia = async (req, res) => {
  try {
    const { Id_Aprendiz } = req.params;
    const { Ind_Asistencia, Turno_Id, Fec_Inasistencia, Motivo, Tipo_Inasistencia } = req.body;
    await updateInasistenciaService(
      { Id_Aprendiz },
      { Ind_Asistencia, Turno_Id, Fec_Inasistencia, Motivo, Tipo_Inasistencia }
    );
    return res.status(200).json({ message: "Inasistencia y memorando actualizados exitosamente" });
  } catch (error) {
    logger.error(`Error al actualizar inasistencia y memorando: ${error.message}`);
    return res.status(500).json({ error: "Error al actualizar la inasistencia y memorando" });
  }
};
