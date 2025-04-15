// src/routes/unidadRoutes.js
import { Router } from 'express';
import {
  findAllUnidades,
  findUnidadById,
  createNewUnidad,
  updateExistingUnidad,
  deleteUnidadById
} from '../controller/unitControllers.js';

const router = Router();

router.get('/', findAllUnidades);
router.get('/:id', findUnidadById);
router.post('/', createNewUnidad);
router.put('/:id', updateExistingUnidad);
router.delete('/:id', deleteUnidadById);

export default router;