// Importación de librerías y controladores necesarios
import express from "express";
import { 
  findAllDepartamentos,           // Función para obtener todos los departamentos
  findDepartamentoById,           // Función para obtener un departamento por su ID
  createNewDepartamento,          // Función para crear un nuevo departamento
  updateExistingDepartamento,     // Función para actualizar un departamento existente
  deleteDepartamentoById         // Función para eliminar un departamento por su ID
} from '../controller/DepartamentoController.js';  // Importa las funciones del controlador

// Creación de una nueva instancia de router de Express
const router = express.Router();

// Definición de las rutas y su correspondiente controlador

/**
 * Ruta GET para obtener todos los departamentos.
 * Llama a la función findAllDepartamentos para obtener y devolver todos los departamentos.
 */
router.get('/', findAllDepartamentos);

/**
 * Ruta GET para obtener un departamento específico por su ID.
 * Llama a la función findDepartamentoById con el parámetro :id.
 * @param {string} id - El ID del departamento que se quiere obtener.
 */
router.get('/:id', findDepartamentoById);

/**
 * Ruta POST para crear un nuevo departamento.
 * Llama a la función createNewDepartamento para crear un nuevo departamento en la base de datos.
 * Se espera que el cuerpo de la solicitud contenga los datos del nuevo departamento.
 */
router.post('/', createNewDepartamento);

/**
 * Ruta PUT para actualizar un departamento existente.
 * Llama a la función updateExistingDepartamento con el parámetro :id.
 * @param {string} id - El ID del departamento que se quiere actualizar.
 */
router.put('/:id', updateExistingDepartamento);

/**
 * Ruta DELETE para eliminar un departamento por su ID.
 * Llama a la función deleteDepartamentoById con el parámetro :id.
 * @param {string} id - El ID del departamento que se quiere eliminar.
 */
router.delete('/:id', deleteDepartamentoById);

// Exportación del router para usarlo en otras partes de la aplicación
export default router;
