// src/routes/areaAAreaRoutes.js

// Importamos el Router de Express para definir rutas en módulos separados
import { Router } from 'express';

// Importamos los controladores correspondientes para manejar las operaciones CRUD
import {
  findAllAreasAArea,        // Función que devuelve todas las áreas a área
  findAreaAAreaById,        // Función que devuelve una área a área específica por ID
  createNewAreaAArea,       // Función que crea una nueva área a área
  updateExistingAreaAArea,  // Función que actualiza una área a área existente por ID
  deleteAreaAAreaById       // Función que elimina una área a área por ID
} from '../controller/AreaAAreaController.js';

// Creamos una instancia del enrutador de Express
const router = Router();

/**
 * @route GET /
 * @description Obtiene todas las relaciones de áreas a área
 * @access Público
 */
router.get('/', findAllAreasAArea);

/**
 * @route GET /:id
 * @description Obtiene una relación de área a área por su ID
 * @access Público
 */
router.get('/:id', findAreaAAreaById);

/**
 * @route POST /
 * @description Crea una nueva relación de área a área
 * @access Público
 */
router.post('/', createNewAreaAArea);

/**
 * @route PUT /:id
 * @description Actualiza una relación de área a área existente por su ID
 * @access Público
 */
router.put('/:id', updateExistingAreaAArea);

/**
 * @route DELETE /:id
 * @description Elimina una relación de área a área por su ID
 * @access Público
 */
router.delete('/:id', deleteAreaAAreaById);

// Exportamos el enrutador configurado para ser utilizado en el servidor principal
export default router;
