// src/routes/memorandumRoutes.js
import { Router } from 'express';
import {
  findAllMemorandos,
  findMemorandumById,
  createNewMemorandum,
  updateExistingMemorandum,
  deleteMemorandumById
} from '../controller/memorandumController.js';

const router = Router();

router.get('/', findAllMemorandos);
router.get('/:id', findMemorandumById);
router.post('/', createNewMemorandum);
router.put('/:id', updateExistingMemorandum);
router.delete('/:id', deleteMemorandumById);

export default router;