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

/**
 * Obtiene todos los turnos especiales registrados en la base de datos.
 * @param {Object} req - Objeto de solicitud que contiene los parámetros de la petición.
 * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - Retorna una lista de turnos especiales o un mensaje de error.
 */
export const getAllTurnosEspeciales = async (req, res) => {
  try {
    // Llamamos al servicio para obtener todos los turnos especiales
    const turnosEspeciales = await findAllTurnosEspeciales();
    
    // Si hay turnos especiales, se envían en la respuesta
    if (turnosEspeciales.length > 0) {
      return res.status(200).json(turnosEspeciales);
    } else {
      return res.status(404).json({
        message: "No se encontraron turnos especiales registrados.",
      });
    }
  } catch (error) {
    // Si ocurre un error, lo registramos y enviamos una respuesta de error
    logger.error(`Error al obtener los turnos especiales: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener los turnos especiales.",
    });
  }
};

/**
 * Obtiene un turno especial específico por su ID.
 * @param {Object} req - Objeto de solicitud que contiene el ID del turno especial.
 * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - Retorna el turno especial encontrado o un mensaje de error si no existe.
 */
export const getTurnoEspecial = async (req, res) => {
  try {
    // Buscamos el turno especial por su ID
    const turnoEspecial = await findTurnoEspecialById(req.params.Id_TurnoEspecial);
    
    // Si se encuentra el turno especial, se envía en la respuesta
    if (turnoEspecial) {
      return res.status(200).json(turnoEspecial);
    } else {
      return res.status(404).json({ message: "Turno especial no encontrado" });
    }
  } catch (error) {
    // Si ocurre un error, lo registramos y enviamos una respuesta de error
    logger.error(`Error al obtener el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener el turno especial.",
    });
  }
};

/**
 * Crea un nuevo turno especial con los datos proporcionados.
 * @param {Object} req - Objeto de solicitud que contiene los datos del turno especial.
 * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - Retorna un mensaje de éxito o error al crear el turno especial.
 */
export const createTurnoEspecial = async (req, res) => {
  try {
    // Extraemos los datos del turno especial del cuerpo de la solicitud
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
    
    // Procesamos la imagen de asistencia si existe
    const Img_Asistencia = req.file ? req.file.filename : null;

    // Llamamos al servicio para crear el nuevo turno especial
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
    
    // Si el turno especial se crea correctamente, respondemos con el nuevo turno
    if (newTurnoEspecial) {
      return res.status(201).json({
        message: "Turno Especial Creado Exitosamente",
        newTurnoEspecial,
      });
    }
  } catch (error) {
    // Si ocurre un error, lo registramos y enviamos una respuesta de error
    logger.error(`Error al crear el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al crear el turno especial.",
    });
  }
};

/**
 * Actualiza un turno especial existente por su ID.
 * @param {Object} req - Objeto de solicitud que contiene los datos del turno especial y el ID.
 * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - Retorna un mensaje de éxito o error al actualizar el turno especial.
 */
export const updateTurnoEspecial = async (req, res) => {
  try {
    // Extraemos los datos del turno especial del cuerpo de la solicitud
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

    // Procesamos la imagen de asistencia si existe
    const Img_Asistencia = req.file ? req.file.filename : null;

    // Creamos un objeto con los nuevos datos del turno especial
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

    // Llamamos al servicio para actualizar el turno especial
    await updateTurnoEspecialService(req.params.Id_TurnoEspecial, updateData);

    // Respondemos con un mensaje de éxito
    return res.json({
      message:
        "Turno especial actualizado correctamente y aprendices asociados actualizados",
    });
  } catch (error) {
    // Si ocurre un error, lo registramos y enviamos una respuesta de error
    logger.error(`Error al actualizar el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al actualizar el turno especial.",
    });
  }
};

/**
 * Elimina un turno especial por su ID.
 * @param {Object} req - Objeto de solicitud que contiene el ID del turno especial.
 * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - Retorna un mensaje de éxito o error al eliminar el turno especial.
 */
export const deleteTurnoEspecial = async (req, res) => {
  try {
    // Llamamos al servicio para eliminar el turno especial
    const { result, deletedAssociations } = await deleteTurnoEspecialService(
      req.params.Id_TurnoEspecial
    );

    // Si no se encuentra el turno especial, respondemos con un error
    if (result === 0) {
      return res.status(404).json({ message: "Turno especial no encontrado" });
    } else {
      // Si se eliminó correctamente, respondemos con un mensaje de éxito
      return res.json({
        message: `Turno especial y ${deletedAssociations} asociaciones de aprendices eliminados correctamente`,
      });
    }
  } catch (error) {
    // Si ocurre un error, lo registramos y enviamos una respuesta de error
    logger.error(`Error al eliminar el turno especial: ${error.message}`);
    return res.status(500).json({
      message: "Error al eliminar el turno especial.",
    });
  }
};

/**
 * Obtiene los turnos especiales programados para una ficha en particular, considerando la fecha actual.
 * @param {Object} req - Objeto de solicitud que contiene el ID de la ficha.
 * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - Retorna los turnos especiales programados o un mensaje de error si no hay turnos.
 */
export const getTurnoEspecialForFichas = async (req, res) => {
  try {
    // Obtenemos la fecha de hoy en formato YYYY-MM-DD
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaHoy = hoy.toISOString().split("T")[0];

    // Llamamos al servicio para obtener los turnos especiales para la ficha y la fecha actual
    const turnoEspecialForFichas = await findTurnoEspecialForFichas(
      req.params.Id_Ficha,
      fechaHoy
    );

    // Si no hay turnos especiales, respondemos con un error
    if (turnoEspecialForFichas.length === 0) {
      return res
        .status(404)
        .json({ message: "La ficha no está programada para turno especial" });
    }

    // Si hay turnos especiales, respondemos con la lista de turnos
    return res.status(200).json(turnoEspecialForFichas);
  } catch (error) {
    // Si ocurre un error, lo registramos y enviamos una respuesta de error
    logger.error(`Error al obtener el turno programado: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};
