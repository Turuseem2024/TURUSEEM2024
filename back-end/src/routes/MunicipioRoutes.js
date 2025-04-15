// src/routes/municipioRoutes.js
import { Router } from 'express';
import {
  findAllMunicipios,
  findMunicipioById,
  createNewMunicipio,
  updateExistingMunicipio,
  deleteMunicipioById
} from '../controller/MunicipioController.js';

const router = Router();

router.get('/', findAllMunicipios);
router.get('/:id', findMunicipioById);
router.post('/', createNewMunicipio);
router.put('/:id', updateExistingMunicipio);
router.delete('/:id', deleteMunicipioById);

export default router;