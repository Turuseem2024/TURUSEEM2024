// src/routes/memorandumRoutes.js

// Importación del enrutador de Express y las funciones del controlador de memorandos
import { Router } from 'express';
import {
  findAllMemorandos,        // Función para obtener todos los memorandos
  findMemorandumById,       // Función para obtener un memorando por su ID
  createNewMemorandum,      // Función para crear un nuevo memorando
  updateExistingMemorandum, // Función para actualizar un memorando existente
  deleteMemorandumById      // Función para eliminar un memorando por su ID
} from '../controller/memorandumController.js';

// Se crea una instancia del enrutador de Express
const router = Router();

// Ruta GET para obtener todos los memorandos
// - Esta ruta se encarga de devolver todos los memorandos registrados en el sistema.
router.get('/', findAllMemorandos);

// Ruta GET para obtener un memorando específico por ID
// - El parámetro ':id' se extrae de la URL y se utiliza para buscar un memorando específico en la base de datos.
// - Si el memorando existe, se devuelve, si no, se retorna un error de no encontrado.
router.get('/:id', findMemorandumById);

// Ruta POST para crear un nuevo memorando
// - Esta ruta recibe datos en el cuerpo de la solicitud (por ejemplo, título, contenido, fecha, etc.)
// - Estos datos son procesados y se crea un nuevo memorando en la base de datos.
router.post('/', createNewMemorandum);

// Ruta PUT para actualizar un memorando existente por ID
// - El parámetro ':id' se extrae de la URL y se utiliza para identificar el memorando a actualizar.
// - El cuerpo de la solicitud debe contener los nuevos datos que reemplazarán los antiguos.
router.put('/:id', updateExistingMemorandum);

// Ruta DELETE para eliminar un memorando por ID
// - El parámetro ':id' se extrae de la URL y se utiliza para identificar el memorando a eliminar.
// - Si el memorando existe, se elimina de la base de datos, de lo contrario, se retorna un error de no encontrado.
router.delete('/:id', deleteMemorandumById);

// Exporta el enrutador para que pueda ser utilizado en el archivo principal de la aplicación
export default router;
