// src/routes/asistenciaRoutes.js
import { Router } from 'express';
import {
  findAllAsistencias,
  findAsistenciaById,
  createNewAsistencia,
  updateExistingAsistencia,
  deleteAsistenciaById
} from '../controller/attendanceController.js';

const router = Router();

router.get('/', findAllAsistencias);
router.get('/:id', findAsistenciaById);
router.post('/', createNewAsistencia);
router.put('/:id', updateExistingAsistencia);
router.delete('/:id', deleteAsistenciaById);

export default router;