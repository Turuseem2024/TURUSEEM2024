// src/routes/unidadRoutes.js

// Importa el Router de Express para definir las rutas relacionadas con "unidades"
import { Router } from 'express';

// Importa los controladores que manejarán la lógica de cada ruta
import {
  findAllUnidades,       // Controlador para obtener todas las unidades
  findUnidadById,        // Controlador para obtener una unidad específica por ID
  createNewUnidad,       // Controlador para crear una nueva unidad
  updateExistingUnidad,  // Controlador para actualizar una unidad existente
  deleteUnidadById       // Controlador para eliminar una unidad por ID
} from '../controller/unitControllers.js';

// Crea una nueva instancia del enrutador de Express
const router = Router();

/**
 * @route   GET /
 * @desc    Obtener todas las unidades
 * @access  Público
 */
router.get('/', findAllUnidades);

/**
 * @route   GET /:id
 * @desc    Obtener una unidad por su ID
 * @access  Público
 */
router.get('/:id', findUnidadById);

/**
 * @route   POST /
 * @desc    Crear una nueva unidad
 * @access  Público o Protegido (según implementación de autenticación)
 */
router.post('/', createNewUnidad);

/**
 * @route   PUT /:id
 * @desc    Actualizar una unidad existente por su ID
 * @access  Público o Protegido (según implementación de autenticación)
 */
router.put('/:id', updateExistingUnidad);

/**
 * @route   DELETE /:id
 * @desc    Eliminar una unidad por su ID
 * @access  Público o Protegido (según implementación de autenticación)
 */
router.delete('/:id', deleteUnidadById);

// Exporta el router para que pueda ser utilizado en la aplicación principal
export default router;
