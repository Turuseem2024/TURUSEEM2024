// src/routes/parametroRoutes.js

// Importación de dependencias necesarias
import { Router } from 'express';
import {
  findAllParametros,         // Controlador para obtener todos los parámetros
  findParametroById,         // Controlador para obtener un parámetro por su ID
  createNewParametro,        // Controlador para crear un nuevo parámetro
  updateExistingParametro,   // Controlador para actualizar un parámetro existente
  deleteParametroById,       // Controlador para eliminar un parámetro por su ID
  findParametroByName        // Controlador para obtener un parámetro por su nombre
} from '../controller/ParametroController.js';

// Creación de una nueva instancia del router de Express
const router = Router();

// Ruta para obtener todos los parámetros
// GET /parametros
// Esta ruta invoca la función `findAllParametros` que obtiene todos los parámetros de la base de datos.
router.get('/', findAllParametros);

// Ruta para obtener un parámetro por su ID
// GET /parametros/:id
// Esta ruta invoca la función `findParametroById` pasando el ID como parámetro para obtener el parámetro específico.
router.get('/:id', findParametroById);

// Ruta para obtener un parámetro por su nombre
// GET /parametros/nombre/:nombre
// Esta ruta invoca la función `findParametroByName` pasando el nombre como parámetro para obtener el parámetro específico.
router.get("/parametros/nombre/:nombre", findParametroByName);

// Ruta para crear un nuevo parámetro
// POST /parametros
// Esta ruta invoca la función `createNewParametro` para crear un nuevo parámetro en la base de datos.
router.post('/', createNewParametro);

// Ruta para actualizar un parámetro existente
// PUT /parametros/:id
// Esta ruta invoca la función `updateExistingParametro` pasando el ID y los datos a actualizar para modificar un parámetro existente.
router.put('/:id', updateExistingParametro);

// Ruta para eliminar un parámetro por su ID
// DELETE /parametros/:id
// Esta ruta invoca la función `deleteParametroById` pasando el ID del parámetro a eliminar.
router.delete('/:id', deleteParametroById);

// Exportación del router para ser utilizado en otras partes de la aplicación
export default router;
