// src/routes/programaRoutes.js

// Importación de los módulos necesarios de Express y los controladores
import { Router } from 'express';
import {
  findAllProgramas,           // Controlador para obtener todos los programas
  findProgramaById,           // Controlador para obtener un programa por ID
  createNewPrograma,          // Controlador para crear un nuevo programa
  updateExistingPrograma,     // Controlador para actualizar un programa existente
  deleteProgramaById         // Controlador para eliminar un programa por ID
} from '../controller/programaController.js';

// Creación de una instancia de Router de Express
const router = Router();

/**
 * Ruta GET para obtener todos los programas.
 * Llama a la función 'findAllProgramas' desde el controlador.
 * 
 * @route GET /programas
 * @returns {Array} Lista de todos los programas disponibles en la base de datos.
 */
router.get('/', findAllProgramas);

/**
 * Ruta GET para obtener un programa específico por su ID.
 * Llama a la función 'findProgramaById' desde el controlador.
 * 
 * @route GET /programas/:id
 * @param {string} id - El ID del programa a obtener.
 * @returns {Object} El programa correspondiente al ID proporcionado.
 */
router.get('/:id', findProgramaById);

/**
 * Ruta POST para crear un nuevo programa.
 * Llama a la función 'createNewPrograma' desde el controlador.
 * 
 * @route POST /programas
 * @body {Object} Datos del nuevo programa a crear.
 * @returns {Object} El programa recién creado.
 */
router.post('/', createNewPrograma);

/**
 * Ruta PUT para actualizar un programa existente por su ID.
 * Llama a la función 'updateExistingPrograma' desde el controlador.
 * 
 * @route PUT /programas/:id
 * @param {string} id - El ID del programa a actualizar.
 * @body {Object} Datos del programa a actualizar.
 * @returns {Object} El programa actualizado.
 */
router.put('/:id', updateExistingPrograma);

/**
 * Ruta DELETE para eliminar un programa por su ID.
 * Llama a la función 'deleteProgramaById' desde el controlador.
 * 
 * @route DELETE /programas/:id
 * @param {string} id - El ID del programa a eliminar.
 * @returns {Object} Mensaje confirmando que el programa ha sido eliminado.
 */
router.delete('/:id', deleteProgramaById);

// Exportación del router para ser utilizado en otras partes de la aplicación
export default router;
