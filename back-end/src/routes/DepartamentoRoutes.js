// Importamos el Router de Express y los controladores correspondientes.
import { Router } from "express";
import {
  findAllDepartamentos,
  findDepartamentoById,
  createDepartamentoController,
  updateDepartamentoController,
  deleteDepartamentoController,
} from "../controller/DepartamentoController.js";

// Creamos una instancia del router.
const router = Router();

/**
 * Ruta para obtener todos los departamentos.
 * Método: GET /departamentos
 */
router.get("/departamentos", findAllDepartamentos);

/**
 * Ruta para obtener un departamento por su ID.
 * Método: GET /departamentos/:id
 */
router.get("/departamentos/:id", findDepartamentoById);

/**
 * Ruta para crear un nuevo departamento.
 * Método: POST /departamentos
 */
router.post("/departamentos", createDepartamentoController);

/**
 * Ruta para actualizar un departamento existente.
 * Método: PUT /departamentos/:id
 */
router.put("/departamentos/:id", updateDepartamentoController);

/**
 * Ruta para eliminar un departamento.
 * Método: DELETE /departamentos/:id
 */
router.delete("/departamentos/:id", deleteDepartamentoController);

// Exportamos el router para integrarlo en la configuración principal de rutas.
export default router;
