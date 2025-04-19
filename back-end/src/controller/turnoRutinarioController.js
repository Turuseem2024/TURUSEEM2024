// controllers/TurnoController.js
import {
  getAllTurnos,
  getTurnoById,
  createTurno,
  updateTurno,
  deleteTurno,
  assignarTurnosAutomaticos
} from '../services/turnoRutinarioService.js';

export const listarTurnos = async (req, res) => {
  try {
    const data = await getAllTurnos();
    res.success(200, data, 'Turnos obtenidos correctamente');
  } catch (error) {
    res.error(error.status || 500, error.message);
  }
};

export const obtenerTurno = async (req, res) => {
  try {
    const data = await getTurnoById(req.params.id);
    res.success(200, data, 'Turno obtenido correctamente');
  } catch (error) {
    res.error(error.status || 500, error.message);
  }
};

export const crearTurnoManual = async (req, res) => {
  try {
    const data = await createTurno(req.body);
    res.status(201).json({
      success: true,
      data,
      message: 'Turno creado exitosamente'
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};

export const actualizarTurno = async (req, res) => {
  try {
    const data = await updateTurno(req.params.id, req.body);
    res.success(200, data, 'Turno actualizado correctamente');
  } catch (error) {
    res.error(error.status || 500, error.message);
  }
};

export const eliminarTurno = async (req, res) => {
  try {
    const result = await deleteTurno(req.params.id);
    res.success(200, result, 'Turno eliminado correctamente');
  } catch (error) {
    res.error(error.status || 500, error.message);
  }
};

export const ejecutarAsignacionAutomatica = async (req, res) => {
  try {
    const resultado = await assignarTurnosAutomaticos();
    res.status(200).json({
      success: true,
      data: resultado,
      message: resultado.message
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};
