// src/routes/funcionarioRoutes.js
import { Router } from 'express';
import {
  findAllFuncionarios,
  findFuncionarioById,
  createNewFuncionario,
  updateExistingFuncionario,
  deleteFuncionarioById
} from '../controller/officialController.js';

const router = Router();

router.get('/', findAllFuncionarios);
router.get('/:id', findFuncionarioById);
router.post('/', createNewFuncionario);
router.put('/:id', updateExistingFuncionario);
router.delete('/:id', deleteFuncionarioById);

export default router;