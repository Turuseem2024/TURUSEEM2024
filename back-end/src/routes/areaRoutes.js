// src/routes/areaRoutes.js
import { Router } from 'express';
import {
  findAllAreas,
  findAreaById,
  createNewArea,
  updateExistingArea,
  deleteAreaById
} from '../controller/areaController.js';

const router = Router();

router.get('/', findAllAreas);
router.get('/:id', findAreaById);
router.post('/', createNewArea);
router.put('/:id', updateExistingArea);
router.delete('/:id', deleteAreaById);

export default router;