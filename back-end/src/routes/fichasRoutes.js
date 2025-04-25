// src/routes/fichasRoutes.js

// Importación del Router de Express y las funciones del controlador
import { Router } from 'express';
import {
  findAllFichas,       // Función para obtener todas las fichas
  findFichaById,       // Función para obtener una ficha por su ID
  createNewFicha,      // Función para crear una nueva ficha
  updateExistingFicha, // Función para actualizar una ficha existente
  deleteFichaById      // Función para eliminar una ficha por su ID
} from '../controller/fichasController.js';

// Creación de un objeto Router para definir las rutas de la API
const router = Router();

/**
 * Ruta para obtener todas las fichas.
 * Utiliza el método GET para recibir una lista de todas las fichas en el sistema.
 * La función findAllFichas es responsable de manejar esta solicitud.
 */
router.get('/', findAllFichas);

/**
 * Ruta para obtener una ficha específica.
 * Se utiliza el parámetro ':id' en la URL para identificar la ficha que se desea obtener.
 * La función findFichaById se encarga de manejar esta solicitud.
 */
router.get('/:id', findFichaById);

/**
 * Ruta para crear una nueva ficha.
 * Utiliza el método POST y espera los datos de la nueva ficha en el cuerpo de la solicitud.
 * La función createNewFicha maneja la lógica para la creación de la ficha.
 */
router.post('/', createNewFicha);

/**
 * Ruta para actualizar una ficha existente.
 * Se utiliza el parámetro ':id' en la URL para identificar la ficha que se desea actualizar.
 * Utiliza el método PUT y espera los datos actualizados en el cuerpo de la solicitud.
 * La función updateExistingFicha se encarga de actualizar la ficha.
 */
router.put('/:id', updateExistingFicha);

/**
 * Ruta para eliminar una ficha.
 * Se utiliza el parámetro ':id' en la URL para identificar la ficha que se desea eliminar.
 * El método DELETE es utilizado para eliminar la ficha.
 * La función deleteFichaById es responsable de manejar la eliminación de la ficha.
 */
router.delete('/:id', deleteFichaById);

// Exportación del router para ser utilizado en otras partes de la aplicación
export default router;
