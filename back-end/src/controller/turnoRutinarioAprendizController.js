import TurnoRutinarioAprendizModel from "../models/turnoRutinarioAprendices.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllTurnosRutinariosAprendices = async (req, res) => {
  try {
    // Intento de obtener todos los turnos rutinarios de aprendices con las relaciones necesarias.
    const turnosRutinariosAprendices = await TurnoRutinarioAprendizModel.findAll({
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    // Verifico si se encontraron turnos rutinarios de aprendices.
    if (turnosRutinariosAprendices.length > 0) {
      res.status(200).json(turnosRutinariosAprendices);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron turnos rutinarios de aprendices.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener los turnos rutinarios de aprendices: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener los turnos rutinarios de aprendices.",
    });
  }
};

export const getTurnoRutinarioAprendiz = async (req, res) => {
  try {
    // Intento de obtener un turno rutinario de aprendiz específico por ID con las relaciones necesarias.
    const turnoRutinarioAprendiz = await TurnoRutinarioAprendizModel.findByPk(req.params.Id_TurnoRutinarioAprendiz, {
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    // Verifico si se encontró el turno rutinario de aprendiz.
    if (turnoRutinarioAprendiz) {
      res.status(200).json(turnoRutinarioAprendiz);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Turno rutinario de aprendiz no encontrado.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener el turno rutinario de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener el turno rutinario de aprendiz.",
    });
  }
};

export const createTurnoRutinarioAprendiz = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
    const { Id_TurnoRutinario, Id_Aprendiz } = req.body;

    // Intento de crear un nuevo turno rutinario de aprendiz con los datos proporcionados.
    const newTurnoRutinarioAprendiz = await TurnoRutinarioAprendizModel.create({
      Id_TurnoRutinario,
      Id_Aprendiz,
    });
    // Verifico si se creó el nuevo turno rutinario de aprendiz.
    if (newTurnoRutinarioAprendiz) {
      res.status(201).json(newTurnoRutinarioAprendiz);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error(`Error al crear el turno rutinario de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al crear el turno rutinario de aprendiz.",
    });
  }
};

export const updateTurnoRutinarioAprendiz = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
    const { Id_TurnoRutinario, Id_Aprendiz } = req.body;

    // Intento de actualizar un turno rutinario de aprendiz específico por ID.
    const [updated] = await TurnoRutinarioAprendizModel.update(
      {
        Id_TurnoRutinario,
        Id_Aprendiz,
      },
      {
        where: { Id_TurnoRutinarioAprendiz: req.params.Id_TurnoRutinarioAprendiz },
      }
    );
    // Verifico si se realizó alguna actualización.
    if (updated === 0) {
      res.status(404).json({
        message: "Turno rutinario de aprendiz no encontrado.",
      });
    } else {
      res.json({
        message: "Turno rutinario de aprendiz actualizado correctamente.",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error(`Error al actualizar el turno rutinario de aprendiz: ${error}`);
    res.status(500).json({
      message: "Error al actualizar el turno rutinario de aprendiz.",
    });
  }
};

export const deleteTurnoRutinarioAprendiz = async (req, res) => {
  try {
    // Intento de eliminar un turno rutinario de aprendiz específico por ID.
    const result = await TurnoRutinarioAprendizModel.destroy({
      where: { Id_TurnoRutinarioAprendiz: req.params.Id_TurnoRutinarioAprendiz },
    });
    // Verifico si se realizó la eliminación.
    if (result === 0) {
      res.status(404).json({
        message: "Turno rutinario de aprendiz no encontrado.",
      });
    } else {
      res.json({
        message: "Turno rutinario de aprendiz eliminado correctamente.",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error(`Error al eliminar el turno rutinario de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al eliminar el turno rutinario de aprendiz.",
    });
  }
};