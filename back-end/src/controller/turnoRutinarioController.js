// controllers/TurnoController.js

// Importa los servicios de turno necesarios desde el servicio de turnoRutinario
import {
  getAllTurnos, // Servicio para obtener todos los turnos
  getTurnoById, // Servicio para obtener un turno por su ID
  createTurno, // Servicio para crear un nuevo turno
  updateTurno, // Servicio para actualizar un turno existente
  deleteTurno, // Servicio para eliminar un turno
  assignarTurnosAutomaticos // Servicio para asignar turnos de manera automática
} from '../services/turnoRutinarioService.js';

/**
 * Controlador para listar todos los turnos.
 * 
 * Esta función obtiene todos los turnos registrados en el sistema
 * utilizando el servicio `getAllTurnos`. Si la operación es exitosa,
 * se devuelve una respuesta con los turnos obtenidos y un mensaje
 * de éxito. En caso de error, se captura y se responde con un código
 * de error y el mensaje correspondiente.
 * 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
export const listarTurnos = async (req, res) => {
  try {
    // Obtener todos los turnos
    const data = await getAllTurnos();
    // Responder con los turnos obtenidos y un mensaje de éxito
    res.success(200, data, 'Turnos obtenidos correctamente');
  } catch (error) {
    // En caso de error, se responde con el código de error y mensaje
    res.error(error.status || 500, error.message);
  }
};

/**
 * Controlador para obtener un turno por su ID.
 * 
 * Esta función obtiene un turno específico utilizando su ID
 * proporcionado como parámetro en la solicitud. Si se encuentra el turno,
 * se responde con los datos del turno y un mensaje de éxito. Si ocurre
 * algún error, se responde con un código de error y el mensaje correspondiente.
 * 
 * @param {Object} req - El objeto de solicitud, que contiene el ID del turno.
 * @param {Object} res - El objeto de respuesta.
 */
export const obtenerTurno = async (req, res) => {
  try {
    // Obtener el turno por su ID proporcionado en los parámetros de la solicitud
    const data = await getTurnoById(req.params.id);
    // Responder con el turno obtenido y un mensaje de éxito
    res.success(200, data, 'Turno obtenido correctamente');
  } catch (error) {
    // En caso de error, se responde con el código de error y mensaje
    res.error(error.status || 500, error.message);
  }
};

/**
 * Controlador para crear un turno manualmente.
 * 
 * Esta función crea un nuevo turno utilizando los datos proporcionados
 * en el cuerpo de la solicitud. Si la creación es exitosa, se responde
 * con el nuevo turno creado y un mensaje de éxito. En caso de error,
 * se responde con el código de error y el mensaje correspondiente.
 * 
 * @param {Object} req - El objeto de solicitud, que contiene los datos del nuevo turno.
 * @param {Object} res - El objeto de respuesta.
 */
export const crearTurnoManual = async (req, res) => {
  try {
    // Crear un nuevo turno con los datos proporcionados en el cuerpo de la solicitud
    const data = await createTurno(req.body);
    // Responder con el turno creado y un mensaje de éxito
    res.status(201).json({
      success: true,
      data,
      message: 'Turno creado exitosamente'
    });
  } catch (error) {
    // En caso de error, se responde con el código de error y mensaje
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Controlador para actualizar un turno existente.
 * 
 * Esta función actualiza los datos de un turno existente utilizando
 * su ID y los datos proporcionados en el cuerpo de la solicitud.
 * Si la actualización es exitosa, se responde con los datos actualizados
 * y un mensaje de éxito. En caso de error, se responde con el código
 * de error y el mensaje correspondiente.
 * 
 * @param {Object} req - El objeto de solicitud, que contiene el ID del turno y los nuevos datos.
 * @param {Object} res - El objeto de respuesta.
 */
export const actualizarTurno = async (req, res) => {
  try {
    // Actualizar el turno con el ID proporcionado y los nuevos datos
    const data = await updateTurno(req.params.id, req.body);
    // Responder con el turno actualizado y un mensaje de éxito
    res.success(200, data, 'Turno actualizado correctamente');
  } catch (error) {
    // En caso de error, se responde con el código de error y mensaje
    res.error(error.status || 500, error.message);
  }
};

/**
 * Controlador para eliminar un turno existente.
 * 
 * Esta función elimina un turno utilizando su ID proporcionado
 * en los parámetros de la solicitud. Si la eliminación es exitosa,
 * se responde con un mensaje de éxito. En caso de error, se responde
 * con el código de error y el mensaje correspondiente.
 * 
 * @param {Object} req - El objeto de solicitud, que contiene el ID del turno a eliminar.
 * @param {Object} res - El objeto de respuesta.
 */
export const eliminarTurno = async (req, res) => {
  try {
    // Eliminar el turno con el ID proporcionado
    const result = await deleteTurno(req.params.id);
    // Responder con el resultado de la eliminación y un mensaje de éxito
    res.success(200, result, 'Turno eliminado correctamente');
  } catch (error) {
    // En caso de error, se responde con el código de error y mensaje
    res.error(error.status || 500, error.message);
  }
};

/**
 * Controlador para ejecutar la asignación automática de turnos.
 * 
 * Esta función ejecuta el proceso de asignación automática de turnos
 * utilizando el servicio `assignarTurnosAutomaticos`. Si la operación
 * es exitosa, se responde con el resultado de la asignación y un mensaje
 * de éxito. En caso de error, se responde con el código de error y el
 * mensaje correspondiente.
 * 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
export const ejecutarAsignacionAutomatica = async (req, res) => {
  try {
    // Ejecutar la asignación automática de turnos
    const resultado = await assignarTurnosAutomaticos();
    // Responder con el resultado de la asignación y un mensaje de éxito
    res.status(200).json({
      success: true,
      data: resultado,
      message: resultado.message
    });
  } catch (error) {
    // En caso de error, se responde con el código de error y mensaje
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};
