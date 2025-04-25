// src/routes/funcionarioRoutes.js

// Importación de módulos necesarios
import { Router } from 'express'; // Importa el objeto Router de Express para definir las rutas
import {
  findAllFuncionarios, // Función para obtener todos los funcionarios
  findFuncionarioById, // Función para obtener un funcionario por su ID
  createNewFuncionario, // Función para crear un nuevo funcionario
  updateExistingFuncionario, // Función para actualizar un funcionario existente
  deleteFuncionarioById // Función para eliminar un funcionario por su ID
} from '../controller/officialController.js'; // Importa las funciones del controlador

// Creación de una instancia del enrutador de Express
const router = Router();

/**
 * Ruta GET /funcionarios
 * Obtener todos los funcionarios registrados.
 * Esta ruta llama a la función findAllFuncionarios del controlador.
 */
router.get('/', findAllFuncionarios);

/**
 * Ruta GET /funcionarios/:id
 * Obtener un funcionario específico por su ID.
 * Esta ruta recibe un parámetro 'id' en la URL y lo pasa a la función findFuncionarioById del controlador.
 * 
 * @param {string} id - El ID del funcionario a buscar.
 */
router.get('/:id', findFuncionarioById);

/**
 * Ruta POST /funcionarios
 * Crear un nuevo funcionario.
 * Esta ruta espera los datos del nuevo funcionario en el cuerpo de la solicitud y los pasa a la función createNewFuncionario.
 */
router.post('/', createNewFuncionario);

/**
 * Ruta PUT /funcionarios/:id
 * Actualizar los datos de un funcionario existente por su ID.
 * Esta ruta recibe un parámetro 'id' en la URL y los datos actualizados en el cuerpo de la solicitud.
 * Llama a la función updateExistingFuncionario del controlador.
 * 
 * @param {string} id - El ID del funcionario a actualizar.
 */
router.put('/:id', updateExistingFuncionario);

/**
 * Ruta DELETE /funcionarios/:id
 * Eliminar un funcionario específico por su ID.
 * Esta ruta recibe un parámetro 'id' en la URL y lo pasa a la función deleteFuncionarioById del controlador.
 * 
 * @param {string} id - El ID del funcionario a eliminar.
 */
router.delete('/:id', deleteFuncionarioById);

// Exportación del enrutador para ser utilizado en otras partes de la aplicación
export default router;
