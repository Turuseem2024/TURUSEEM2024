// Importa el módulo 'express' para crear las rutas del servidor.
import express from "express";
// Importa las funciones del controlador que gestionan las operaciones CRUD para Talento Humano.
import {
  getAllTalentoHumano,   // Función para obtener todos los registros de Talento Humano.
  getTalentoHumano,      // Función para obtener un registro específico de Talento Humano por su ID.
  createTalentoHumano,   // Función para crear un nuevo registro de Talento Humano.
  updateTalentoHumano,   // Función para actualizar un registro de Talento Humano existente.
  deleteTalentoHumano,   // Función para eliminar un registro de Talento Humano.
} from "../controller/talentoHumanoController.js";
// Importa el middleware que verifica si el usuario está autenticado.
import checkAuth from "../middleware/authMiddleware.js";

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Define las rutas para la gestión de Talento Humano.
// Ruta principal para obtener todos los registros y crear uno nuevo.
router
  .route("/")
  // GET: Obtiene todos los registros de Talento Humano.
  // Solo se permite si el usuario está autenticado (checkAuth).
  .get(checkAuth, getAllTalentoHumano)
  // POST: Crea un nuevo registro de Talento Humano.
  // Solo se permite si el usuario está autenticado (checkAuth).
  .post(checkAuth, createTalentoHumano);

// Define las rutas para un registro específico de Talento Humano utilizando su ID.
router
  .route("/:Id_Talento_Humano")
  // GET: Obtiene un registro específico de Talento Humano según su ID.
  // Solo se permite si el usuario está autenticado (checkAuth).
  .get(checkAuth, getTalentoHumano)
  // PUT: Actualiza un registro de Talento Humano específico por su ID.
  // Solo se permite si el usuario está autenticado (checkAuth).
  .put(checkAuth, updateTalentoHumano)
  // DELETE: Elimina un registro de Talento Humano específico por su ID.
  // Solo se permite si el usuario está autenticado (checkAuth).
  .delete(checkAuth, deleteTalentoHumano);

// Exporta el enrutador para su uso en otras partes de la aplicación.
export default router;
