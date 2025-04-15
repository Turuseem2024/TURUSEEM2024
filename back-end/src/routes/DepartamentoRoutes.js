// Ejemplo de uso en routes/departamentos.js
import express from "express";
import { 
  findAllDepartamentos,
  findDepartamentoById,
  createNewDepartamento,
  updateExistingDepartamento,
  deleteDepartamentoById 
} from '../controller/DepartamentoController.js';

const router = express.Router();

router.get('/', findAllDepartamentos);
router.get('/:id', findDepartamentoById);
router.post('/', createNewDepartamento);
router.put('/:id', updateExistingDepartamento);
router.delete('/:id', deleteDepartamentoById);

export default router;
