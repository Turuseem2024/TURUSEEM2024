// src/routes/fichasRoutes.js
import { Router } from 'express';
import {
  findAllFichas,
  findFichaById,
  createNewFicha,
  updateExistingFicha,
  deleteFichaById
} from '../controller/fichasController.js';

const router = Router();

router.get('/', findAllFichas);
router.get('/:id', findFichaById);
router.post('/', createNewFicha);
router.put('/:id', updateExistingFicha);
router.delete('/:id', deleteFichaById);

export default router;