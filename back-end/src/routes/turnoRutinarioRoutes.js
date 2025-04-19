// routes/turnoRoutes.js
import { Router } from 'express';
import {
  listarTurnos,
  obtenerTurno,
  crearTurnoManual,
  actualizarTurno,
  eliminarTurno,
  ejecutarAsignacionAutomatica
} from '../controller/turnoRutinarioController.js';

const router = Router();

// CRUD Manual
router.get('/', listarTurnos);
router.get('/:id', obtenerTurno);
router.post('/manual', crearTurnoManual); // Nueva ruta específica
router.put('/:id', actualizarTurno);
router.delete('/:id', eliminarTurno);

// Automatización
router.post('/asignacion-automatica', ejecutarAsignacionAutomatica);

export default router;