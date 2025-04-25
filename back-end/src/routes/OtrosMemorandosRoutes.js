// Importación de dependencias necesarias
import express from "express"; // Express para crear las rutas y gestionar las solicitudes HTTP.
import {
  getAllOtrosMemorandum,        // Controlador para obtener todos los memorandos.
  getOtroMemorandum,             // Controlador para obtener un memorando específico.
  createOtroMemorandum,          // Controlador para crear un nuevo memorando.
  updateOtroMemorandum,          // Controlador para actualizar un memorando existente.
  deleteOtroMemorandum,          // Controlador para eliminar un memorando.
  viewOtherMemorandumPdf,        // Controlador para ver un memorando en formato PDF.
  sendMemorandumPdf              // Controlador para enviar un memorando en formato PDF.
} from "../controller/otrosMemorandosController.js"; // Importa las funciones del controlador relacionados con memorandos.
import checkAuth from "../middleware/authMiddleware.js"; // Middleware para verificar autenticación de los usuarios.

const router = express.Router(); // Instancia de un enrutador de Express para gestionar las rutas.


// Ruta para manejar solicitudes GET (obtener todos los memorandos) y POST (crear un nuevo memorando)
// Ambas rutas están protegidas por el middleware checkAuth que verifica la autenticación.
router
  .route("/") // Define la ruta raíz para '/otros-memorandos'
  .get(checkAuth, getAllOtrosMemorandum) // Solicitud GET: obtiene todos los memorandos
  .post(checkAuth, createOtroMemorandum); // Solicitud POST: crea un nuevo memorando


// Ruta para manejar solicitudes GET (obtener un memorando por su ID), PUT (actualizar un memorando por su ID)
// y DELETE (eliminar un memorando por su ID). La ruta está protegida por checkAuth.
router
  .route("/:Id_OtroMemorando") // Define la ruta para un memorando específico basado en su ID.
  .get(checkAuth, getOtroMemorandum) // Solicitud GET: obtiene un memorando específico por su ID
  .put(checkAuth, updateOtroMemorandum) // Solicitud PUT: actualiza un memorando existente por su ID
  .delete(checkAuth, deleteOtroMemorandum); // Solicitud DELETE: elimina un memorando específico por su ID


// Ruta para visualizar un memorando en formato PDF
// Se utiliza una solicitud POST para generar o visualizar el PDF del memorando dado su ID.
router.route("/view/pdf/:Id_OtroMemorando")
  .post(viewOtherMemorandumPdf); // Solicitud POST: genera o muestra el PDF de un memorando dado su ID


// Ruta para enviar un memorando en formato PDF
// También se utiliza una solicitud POST para enviar el PDF del memorando específico.
router.route("/send/pdf/:Id_OtroMemorando")
  .post(sendMemorandumPdf); // Solicitud POST: envía el PDF de un memorando específico por su ID


// Exportación del router para ser usado en el archivo principal de la aplicación.
export default router;
