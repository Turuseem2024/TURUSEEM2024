// routes/turnoRoutes.js

// Importa el Router de Express para definir las rutas del módulo
import { Router } from 'express';

// Importa los controladores que gestionan la lógica de los turnos rutinarios
import {
  listarTurnos,               // Controlador para obtener todos los turnos
  obtenerTurno,               // Controlador para obtener un turno específico por ID
  crearTurnoManual,           // Controlador para crear un turno manualmente
  actualizarTurno,            // Controlador para actualizar un turno existente
  eliminarTurno,              // Controlador para eliminar un turno por ID
  ejecutarAsignacionAutomatica // Controlador para ejecutar la asignación automática de turnos
} from '../controller/turnoRutinarioController.js';

// Crea una nueva instancia de Router para definir las rutas relacionadas con turnos
const router = Router();

/**
 * Rutas para la gestión de turnos rutinarios (CRUD Manual y Asignación Automática)
 */

// Ruta GET para listar todos los turnos
// Ejemplo de uso: GET /turnos/
router.get('/', listarTurnos);

// Ruta GET para obtener un turno específico mediante su ID
// Ejemplo de uso: GET /turnos/123
router.get('/:id', obtenerTurno);

// Ruta POST para crear un nuevo turno de forma manual
// Ejemplo de uso: POST /turnos/manual
// Requiere un cuerpo (body) con los datos del turno a crear
router.post('/manual', crearTurnoManual);

// Ruta PUT para actualizar un turno existente mediante su ID
// Ejemplo de uso: PUT /turnos/123
// Requiere un cuerpo (body) con los nuevos datos del turno
router.put('/:id', actualizarTurno);

// Ruta DELETE para eliminar un turno mediante su ID
// Ejemplo de uso: DELETE /turnos/123
router.delete('/:id', eliminarTurno);

// Ruta POST para ejecutar el proceso de asignación automática de turnos
// Ejemplo de uso: POST /turnos/asignacion-automatica
// Puede no requerir datos en el cuerpo, dependiendo de la lógica interna del controlador
router.post('/asignacion-automatica', ejecutarAsignacionAutomatica);

// Exporta el enrutador configurado para su uso en otros módulos
export default router;
