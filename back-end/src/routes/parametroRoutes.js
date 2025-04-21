// src/routes/parametroRoutes.js
import { Router } from 'express';
import {
  findAllParametros,
  findParametroById,
  createNewParametro,
  updateExistingParametro,
  deleteParametroById,
  findParametroByName
} from '../controller/ParametroController.js';

const router = Router();

router.get('/', findAllParametros);
router.get('/:id', findParametroById);
router.get("/parametros/nombre/:nombre", findParametroByName);
router.post('/', createNewParametro);
router.put('/:id', updateExistingParametro);
router.delete('/:id', deleteParametroById);

export default router;