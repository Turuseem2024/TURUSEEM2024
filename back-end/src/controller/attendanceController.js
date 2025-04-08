import { logger } from "../middleware/logMiddleware.js";
import {
  getAllAsistenciasService,
  getAsistenciaService,
  createAsistenciaService,
  updateAsistenciaService,
  deleteAsistenciaService,
} from "../services/asistenciaService.js";

// Obtener todas las asistencias
export const getAllAsistencias = async (req, res) => {
  try {
    const asistencias = await getAllAsistenciasService();
    if (asistencias && asistencias.length > 0) {
      return res.status(200).json(asistencias);
    } else {
      return res.status(404).json({
        message: "No se encontraron registros de asistencia.",
      });
    }
  } catch (error) {
    logger.error(`Error al obtener las asistencias: ${error}`);
    return res.status(500).json({ message: "Ocurrió un error con el servidor" });
  }
};

// Obtener una asistencia específica por ID
export const getAsistencia = async (req, res) => {
  try {
    const asistencia = await getAsistenciaService(req.params.Id_Asistencia);
    if (asistencia) {
      return res.status(200).json(asistencia);
    } else {
      return res.status(404).json({ message: "Registro de asistencia no encontrado" });
    }
  } catch (error) {
    logger.error(`Error al obtener la asistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Crear una nueva asistencia
export const createAsistencia = async (req, res) => {
  try {
    const { Fec_Asistencia, Mot_Asistencia, Tip_Asistencia } = req.body;
    const nuevaAsistencia = await createAsistenciaService({ Fec_Asistencia, Mot_Asistencia, Tip_Asistencia });
    return res.status(201).json(nuevaAsistencia);
  } catch (error) {
    logger.error(`Error al crear la asistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar una asistencia existente
export const updateAsistencia = async (req, res) => {
  try {
    const { Fec_Asistencia, Mot_Asistencia, Tip_Asistencia } = req.body;
    const asistenciaActualizada = await updateAsistenciaService(req.params.Id_Asistencia, { Fec_Asistencia, Mot_Asistencia, Tip_Asistencia });
    return res.json({
      message: "Registro de asistencia actualizado correctamente",
      data: asistenciaActualizada,
    });
  } catch (error) {
    logger.error(`Error al actualizar la asistencia: ${error}`);
    // Si la validación falla o no se encuentra el registro se informa con 404, de lo contrario error interno
    if (error.message === "Registro de asistencia no encontrado" || error.message === "La fecha y tipo de asistencia son obligatorios") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar una asistencia
export const deleteAsistencia = async (req, res) => {
  try {
    const { Id_Asistencia } = req.params;
    await deleteAsistenciaService(Id_Asistencia);
    return res.json({ message: "Registro de asistencia eliminado correctamente" });
  } catch (error) {
    logger.error(`Error al eliminar la asistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};
