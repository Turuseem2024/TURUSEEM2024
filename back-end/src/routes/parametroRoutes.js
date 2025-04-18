// src/routes/parametroRoutes.js
import { Router } from 'express';
import {
  findAllParametros,
  findParametroById,
  createNewParametro,
  updateExistingParametro,
  deleteParametroById
} from '../controller/ParametroController.js';

const router = Router();

router.get('/', findAllParametros);
router.get('/:id', findParametroById);
router.post('/', createNewParametro);
router.put('/:id', updateExistingParametro);
router.delete('/:id', deleteParametroById);

export default router;