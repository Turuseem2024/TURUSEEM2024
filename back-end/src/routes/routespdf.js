// Importamos el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
import express from 'express';

// Importación de la función 'crearPdf' desde el archivo '../prueba/pruebaPdf.js'.
// Esta función probablemente se encarga de generar un archivo PDF. Actualmente está comentada,
// lo que significa que no está siendo utilizada en este código.
 // import { crearPdf } from '../prueba/pruebaPdf.js';

// Creamos una instancia de Router de Express. Un router permite agrupar las rutas
// de nuestra aplicación de forma modular, ayudando a mantener el código organizado.
const router = express.Router();

// Definimos una ruta GET para el endpoint '/'. Cuando se realice una solicitud GET a esta ruta,
// se ejecutará la función 'crearPdf', que podría generar un archivo PDF.
// Sin embargo, como está comentada la importación de 'crearPdf', esta funcionalidad
// no está activa en el momento.
router.get('/', crearPdf);

// Exportamos el router para que pueda ser utilizado en otras partes de la aplicación.
// Esto hace que las rutas definidas en este router puedan ser registradas en el archivo principal de la aplicación.
export default router;
