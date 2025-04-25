// Importación del módulo express para crear rutas
import express from 'express';
// Importación del módulo multer para manejar la subida de archivos
import multer from 'multer';

// Importación de los controladores que manejan la lógica de negocio relacionada con los turnos especiales
import {
  getAllTurnosEspeciales,         // Obtener todos los turnos especiales
  getTurnoEspecial,               // Obtener un turno especial por su ID
  createTurnoEspecial,            // Crear un nuevo turno especial
  updateTurnoEspecial,            // Actualizar un turno especial existente
  deleteTurnoEspecial,            // Eliminar un turno especial
  getTurnoEspecialForFichas       // Obtener turnos especiales por ID de ficha
} from '../controller/turnoEspecialController.js';

// Middleware para verificar autenticación del usuario antes de acceder a ciertas rutas
import checkAuth from '../middleware/authMiddleware.js';

// Inicialización del enrutador de Express
const router = express.Router();

// Configuración de Multer para la subida de archivos (por ejemplo, imágenes de asistencia)
const upload = multer({ 
  storage: multer.diskStorage({
    // Directorio donde se guardarán los archivos subidos
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/'); // Asegúrate de que este directorio exista en el servidor
    },
    // Nombre con el que se guardará el archivo: marca de tiempo + nombre original
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

/**
 * Rutas para la colección de turnos especiales (/)
 * - GET: Obtiene todos los turnos especiales (requiere autenticación)
 * - POST: Crea un nuevo turno especial (requiere autenticación y puede incluir imagen)
 */
router
  .route('/')
  .get(checkAuth, getAllTurnosEspeciales) // Obtener todos los turnos especiales
  .post(checkAuth, upload.single('Img_Asistencia'), createTurnoEspecial); // Crear uno nuevo con posible imagen

/**
 * Rutas para operaciones sobre un turno especial específico identificado por Id_TurnoEspecial
 * - GET: Obtener detalles de un turno especial específico
 * - PUT: Actualizar un turno especial específico (puede incluir imagen)
 * - DELETE: Eliminar un turno especial específico
 */
router
  .route('/:Id_TurnoEspecial')
  .get(checkAuth, getTurnoEspecial) // Obtener un turno especial por ID
  .put(checkAuth, upload.single('Img_Asistencia'), updateTurnoEspecial) // Actualizar uno con posible imagen
  .delete(checkAuth, deleteTurnoEspecial); // Eliminar uno

/**
 * Ruta para obtener los turnos especiales asociados a una ficha específica
 * - GET: Obtener turnos por el ID de la ficha
 */
router.get('/consulta/:Id_Ficha', getTurnoEspecialForFichas);

// Exportación del enrutador para ser usado en otros archivos del proyecto
export default router;
