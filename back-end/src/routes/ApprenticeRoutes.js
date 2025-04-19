import express from 'express';
import {
  findAllApprentices,
  findApprenticeById,
  createNewApprentice,
  updateExistingApprentice,
  deleteApprenticeById
} from '../controller/apprenticeController.js';

const router = express.Router();

router.get('/', findAllApprentices);
router.get('/:id', findApprenticeById);
router.post('/', createNewApprentice);
router.put('/:id', updateExistingApprentice);
router.delete('/:id', deleteApprenticeById);

export default router;