// Importación de las dependencias necesarias
import express from "express"; // Se importa express para crear el enrutador y manejar las rutas.
import { getAllCities } from "../controller/cityController.js"; // Se importa la función getAllCities desde el controlador de ciudades.
import checkAuth from "../middleware/authMiddleware.js"; // Se importa el middleware checkAuth que verifica la autenticación del usuario.

// Se crea una instancia del enrutador de Express
const router = express.Router();

/**
 * Ruta para obtener todas las ciudades.
 * Esta ruta está protegida por el middleware checkAuth, que asegura que solo los usuarios autenticados puedan acceder a ella.
 * 
 * El método GET en esta ruta invoca la función getAllCities desde el controlador.
 * 
 * @route GET /api/cities
 * @access Private (requiere autenticación)
 */
router
  .route("/") // Se define la ruta raíz de la API ("/")
  .get(checkAuth, getAllCities); // Se asocia la función getAllCities al método GET de la ruta, con el middleware checkAuth para validar la autenticación.

export default router; // Se exporta el enrutador para que se pueda usar en otros archivos de la aplicación.
