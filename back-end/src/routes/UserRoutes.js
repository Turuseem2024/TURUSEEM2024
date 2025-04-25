// src/routes/userRoutes.js

// Importamos el módulo Router de Express para definir rutas en un módulo separado
import { Router } from 'express';

// Importamos los controladores que gestionan la lógica para cada ruta
import {
  findAllUsers,       // Controlador para obtener todos los usuarios
  findUserById,       // Controlador para obtener un usuario por ID
  createNewUser,      // Controlador para crear un nuevo usuario
  updateExistingUser, // Controlador para actualizar un usuario existente
  deleteUserById,     // Controlador para eliminar un usuario por ID
  authenticateUser    // Controlador para autenticar a un usuario
} from '../controller/userController.js';

// Creamos una instancia del enrutador de Express
const router = Router();

/**
 * Rutas públicas
 * Estas rutas no requieren autenticación previa
 */

// Ruta para autenticar usuarios (login)
// Método: POST
// Endpoint: /auth
// Cuerpo esperado: { email, password }
router.post('/auth', authenticateUser);

/**
 * Rutas protegidas
 * Estas rutas deberían requerir autenticación (middleware no implementado aquí)
 */

// Ruta para obtener todos los usuarios
// Método: GET
// Endpoint: /
router.get('/', findAllUsers);

// Ruta para obtener un usuario específico por ID
// Método: GET
// Endpoint: /:id
// Parámetro de ruta: id (identificador del usuario)
router.get('/:id', findUserById);

// Ruta para crear un nuevo usuario
// Método: POST
// Endpoint: /
// Cuerpo esperado: { nombre, email, contraseña, etc. }
router.post('/', createNewUser);

// Ruta para actualizar un usuario existente por ID
// Método: PUT
// Endpoint: /:id
// Parámetro de ruta: id (identificador del usuario)
// Cuerpo esperado: campos a actualizar
router.put('/:id', updateExistingUser);

// Ruta para eliminar un usuario por ID
// Método: DELETE
// Endpoint: /:id
// Parámetro de ruta: id (identificador del usuario)
router.delete('/:id', deleteUserById);

// Exportamos el enrutador para que pueda ser utilizado en la aplicación principal
export default router;
