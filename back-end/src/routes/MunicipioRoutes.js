// src/routes/municipioRoutes.js

// Importación del objeto Router desde Express para crear las rutas de la API
import { Router } from 'express';

// Importación de los controladores que manejarán la lógica de las operaciones CRUD para municipios
import {
  findAllMunicipios,            // Controlador para obtener todos los municipios
  findMunicipioById,            // Controlador para obtener un municipio por su ID
  createNewMunicipio,           // Controlador para crear un nuevo municipio
  updateExistingMunicipio,      // Controlador para actualizar un municipio existente
  deleteMunicipioById          // Controlador para eliminar un municipio por su ID
} from '../controller/MunicipioController.js';

// Creación de una instancia del enrutador de Express
const router = Router();

// Ruta GET para obtener todos los municipios
// Cuando se realice una solicitud GET a la raíz de esta ruta ('/'), se llamará a la función findAllMunicipios
router.get('/', findAllMunicipios);

// Ruta GET para obtener un municipio por su ID
// Cuando se realice una solicitud GET a la ruta '/:id', se llamará a la función findMunicipioById
// ':id' es un parámetro dinámico que se refiere al ID del municipio
router.get('/:id', findMunicipioById);

// Ruta POST para crear un nuevo municipio
// Cuando se realice una solicitud POST a la raíz de esta ruta ('/'), se llamará a la función createNewMunicipio
// Esta ruta espera que el cuerpo de la solicitud contenga los datos necesarios para crear el municipio
router.post('/', createNewMunicipio);

// Ruta PUT para actualizar un municipio existente
// Cuando se realice una solicitud PUT a la ruta '/:id', se llamará a la función updateExistingMunicipio
// ':id' es un parámetro dinámico que se refiere al ID del municipio a actualizar
// Esta ruta espera que el cuerpo de la solicitud contenga los nuevos datos para el municipio
router.put('/:id', updateExistingMunicipio);

// Ruta DELETE para eliminar un municipio por su ID
// Cuando se realice una solicitud DELETE a la ruta '/:id', se llamará a la función deleteMunicipioById
// ':id' es un parámetro dinámico que se refiere al ID del municipio a eliminar
router.delete('/:id', deleteMunicipioById);

// Exportación del enrutador para que pueda ser utilizado en otras partes de la aplicación
export default router;
