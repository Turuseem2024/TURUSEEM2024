// src/routes/programaRoutes.js
import { Router } from 'express';
import {
  findAllProgramas,
  findProgramaById,
  createNewPrograma,
  updateExistingPrograma,
  deleteProgramaById
} from '../controller/programaController.js';

const router = Router();

router.get('/', findAllProgramas);
router.get('/:id', findProgramaById);
router.post('/', createNewPrograma);
router.put('/:id', updateExistingPrograma);
router.delete('/:id', deleteProgramaById);

export default router;