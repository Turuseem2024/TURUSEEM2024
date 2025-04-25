// src/routes/areaRoutes.js

// Importa el Router de Express para definir las rutas
import { Router } from 'express';
// Importa las funciones del controlador para manejar las operaciones CRUD de las áreas
import {
  findAllAreas,           // Función para obtener todas las áreas
  findAreaById,           // Función para obtener una área por su ID
  createNewArea,          // Función para crear una nueva área
  updateExistingArea,     // Función para actualizar una área existente
  deleteAreaById          // Función para eliminar una área por su ID
} from '../controller/areaController.js';

// Crea una nueva instancia del enrutador de Express
const router = Router();

/**
 * Ruta GET para obtener todas las áreas
 * Esta ruta invoca la función `findAllAreas` que busca y devuelve todas las áreas desde la base de datos
 */
router.get('/', findAllAreas);

/**
 * Ruta GET para obtener una área por su ID
 * La ruta espera un parámetro `id` que representa el identificador de la área a buscar
 * Esta ruta invoca la función `findAreaById` que busca y devuelve la área con el ID especificado
 */
router.get('/:id', findAreaById);

/**
 * Ruta POST para crear una nueva área
 * Esta ruta invoca la función `createNewArea`, que toma los datos de la nueva área desde el cuerpo de la solicitud y la guarda en la base de datos
 */
router.post('/', createNewArea);

/**
 * Ruta PUT para actualizar una área existente
 * La ruta espera un parámetro `id` que representa el identificador de la área a actualizar
 * Esta ruta invoca la función `updateExistingArea`, que toma el ID y los datos de la nueva área desde el cuerpo de la solicitud para actualizar la existente
 */
router.put('/:id', updateExistingArea);

/**
 * Ruta DELETE para eliminar una área por su ID
 * La ruta espera un parámetro `id` que representa el identificador de la área a eliminar
 * Esta ruta invoca la función `deleteAreaById` que elimina la área con el ID especificado de la base de datos
 */
router.delete('/:id', deleteAreaById);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
export default router;
