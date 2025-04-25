// Importamos el módulo express, el cual nos permite crear el servidor y definir rutas.
import express from 'express';

// Importamos los controladores responsables de manejar la lógica de negocio
// para las distintas operaciones CRUD sobre los aprendices.
import {
  findAllApprentices,        // Controlador para obtener todos los aprendices
  findApprenticeById,        // Controlador para obtener un aprendiz por su ID
  createNewApprentice,       // Controlador para crear un nuevo aprendiz
  updateExistingApprentice,  // Controlador para actualizar un aprendiz existente
  deleteApprenticeById       // Controlador para eliminar un aprendiz por su ID
} from '../controller/apprenticeController.js';

// Creamos una nueva instancia del enrutador de Express.
// Este enrutador se usará para definir las rutas relacionadas con los aprendices.
const router = express.Router();

/**
 * @route   GET /
 * @desc    Obtener todos los aprendices registrados en el sistema.
 * @access  Público (se puede ajustar a protegido si se requiere autenticación)
 */
router.get('/', findAllApprentices);

/**
 * @route   GET /:id
 * @desc    Obtener un aprendiz específico usando su ID como parámetro.
 * @param   {String} id - ID del aprendiz a buscar.
 * @access  Público
 */
router.get('/:id', findApprenticeById);

/**
 * @route   POST /
 * @desc    Crear un nuevo aprendiz con los datos enviados en el cuerpo de la solicitud.
 * @body    {Object} apprenticeData - Datos del nuevo aprendiz.
 * @access  Público
 */
router.post('/', createNewApprentice);

/**
 * @route   PUT /:id
 * @desc    Actualizar los datos de un aprendiz existente usando su ID.
 * @param   {String} id - ID del aprendiz a actualizar.
 * @body    {Object} updatedData - Datos actualizados del aprendiz.
 * @access  Público
 */
router.put('/:id', updateExistingApprentice);

/**
 * @route   DELETE /:id
 * @desc    Eliminar un aprendiz del sistema usando su ID.
 * @param   {String} id - ID del aprendiz a eliminar.
 * @access  Público
 */
router.delete('/:id', deleteApprenticeById);

// Exportamos el enrutador para ser utilizado en el archivo principal del servidor.
export default router;
