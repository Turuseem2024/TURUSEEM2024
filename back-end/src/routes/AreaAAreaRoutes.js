// src/routes/areaAAreaRoutes.js
import { Router } from 'express';
import {
  findAllAreasAArea,
  findAreaAAreaById,
  createNewAreaAArea,
  updateExistingAreaAArea,
  deleteAreaAAreaById
} from '../controller/AreaAAreaController.js';

const router = Router();

router.get('/', findAllAreasAArea);
router.get('/:id', findAreaAAreaById);
router.post('/', createNewAreaAArea);
router.put('/:id', updateExistingAreaAArea);
router.delete('/:id', deleteAreaAAreaById);

export default router;