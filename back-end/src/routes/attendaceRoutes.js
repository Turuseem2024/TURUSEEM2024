// src/routes/asistenciaRoutes.js

// Importamos el módulo Router de Express para crear las rutas.
import { Router } from 'express';

// Importamos los controladores que manejarán las peticiones a las rutas de asistencia.
import {
  findAllAsistencias,           // Controlador para obtener todas las asistencias.
  findAsistenciaById,           // Controlador para obtener una asistencia por su ID.
  createNewAsistencia,          // Controlador para crear una nueva asistencia.
  updateExistingAsistencia,     // Controlador para actualizar una asistencia existente.
  deleteAsistenciaById          // Controlador para eliminar una asistencia por su ID.
} from '../controller/attendanceController.js';

// Creamos una instancia del enrutador de Express.
const router = Router();

/**
 * Ruta GET '/': Obtiene todas las asistencias.
 * Esta ruta invoca el controlador `findAllAsistencias` para recuperar todas las asistencias registradas en la base de datos.
 * 
 * Método HTTP: GET
 */
router.get('/', findAllAsistencias);

/**
 * Ruta GET '/:id': Obtiene una asistencia específica por su ID.
 * Esta ruta invoca el controlador `findAsistenciaById` para recuperar una asistencia individual usando el ID proporcionado en la URL.
 * 
 * Método HTTP: GET
 * Parámetro de URL:
 *  - id: El ID de la asistencia que se quiere consultar.
 */
router.get('/:id', findAsistenciaById);

/**
 * Ruta POST '/': Crea una nueva asistencia.
 * Esta ruta invoca el controlador `createNewAsistencia` para crear una nueva entrada de asistencia en la base de datos.
 * Los datos para crear la asistencia se deben enviar en el cuerpo de la solicitud (request body).
 * 
 * Método HTTP: POST
 * Cuerpo de la solicitud (body): Los datos de la nueva asistencia.
 */
router.post('/', createNewAsistencia);

/**
 * Ruta PUT '/:id': Actualiza una asistencia existente.
 * Esta ruta invoca el controlador `updateExistingAsistencia` para actualizar los datos de una asistencia
 * específica en la base de datos, usando el ID proporcionado en la URL y los datos enviados en el cuerpo de la solicitud.
 * 
 * Método HTTP: PUT
 * Parámetro de URL:
 *  - id: El ID de la asistencia que se quiere actualizar.
 * Cuerpo de la solicitud (body): Los nuevos datos para la asistencia.
 */
router.put('/:id', updateExistingAsistencia);

/**
 * Ruta DELETE '/:id': Elimina una asistencia por su ID.
 * Esta ruta invoca el controlador `deleteAsistenciaById` para eliminar una asistencia específica
 * de la base de datos utilizando el ID proporcionado en la URL.
 * 
 * Método HTTP: DELETE
 * Parámetro de URL:
 *  - id: El ID de la asistencia que se quiere eliminar.
 */
router.delete('/:id', deleteAsistenciaById);

// Exportamos el enrutador para que pueda ser utilizado en otros archivos.
export default router;
