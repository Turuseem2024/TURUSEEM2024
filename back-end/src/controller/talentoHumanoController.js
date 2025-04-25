// Se importa el logger para manejar los errores y registros de actividad
import { logger } from "../middleware/logMiddleware.js";
// Se importan los modelos para interactuar con la base de datos
import TalentoHumanoModel from "../models/talentoHumano.js";
import FichasModel from "../models/fichasModel.js";

// Función para obtener todos los registros de talento humano junto con sus fichas asociadas
export const getAllTalentoHumano = async (req, res) => {
  try {
    // Se intenta obtener todos los registros de talento humano y sus fichas relacionadas
    const talentoHumano = await TalentoHumanoModel.findAll({
      include: [
        { 
          model: FichasModel, // Relación con el modelo Fichas
          as: "fichas" // Alias para la relación
        }
      ],
    });
    
    // Se verifica si se encontraron registros
    if (talentoHumano.length > 0) {
      res.status(200).json(talentoHumano); // Se envía la respuesta con los registros encontrados
      return; // Se termina la ejecución de la función tras enviar la respuesta
    } else {
      // En caso de no encontrar registros, se devuelve un mensaje de error
      res.status(404).json({
        message: "No se encontraron aprendices de talento humano registrados.",
      });
    }
  } catch (error) {
    // Se captura cualquier error ocurrido durante la consulta
    logger.error("Error fetching talento humano: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el talento humano.", // Respuesta de error
    });
  }
};

// Función para obtener un solo registro de talento humano específico por ID
export const getTalentoHumano = async (req, res) => {
  try {
    // Se intenta obtener un registro específico de talento humano por su ID con las fichas asociadas
    const talentoHumano = await TalentoHumanoModel.findByPk(
      req.params.Id_Talento_Humano, {
      include: [
        { 
          model: FichasModel, // Relación con el modelo Fichas
          as: "fichas" // Alias para la relación
        }
      ],
    });
    
    // Se verifica si se encontró el registro
    if (talentoHumano) {
      res.status(200).json(talentoHumano); // Se devuelve el registro encontrado
      return; // Se termina la ejecución de la función tras enviar la respuesta
    } else {
      // En caso de no encontrar el registro, se devuelve un mensaje de error
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    // Se captura cualquier error ocurrido durante la consulta
    logger.error("Error fetching talento humano: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el talento humano.", // Respuesta de error
    });
  }
};

// Función para crear un nuevo registro de talento humano
export const createTalentoHumano = async (req, res) => {
  try {
    // Se intenta crear un nuevo registro de talento humano con los datos proporcionados en el cuerpo de la solicitud
    const newTalento = await TalentoHumanoModel.create(req.body);
    
    // Se devuelve una respuesta exitosa con los datos del nuevo talento humano creado
    res.status(201).json({
      message: "Talento humano registrado correctamente!",
      data: newTalento,
    });
    return; // Se termina la ejecución de la función tras enviar la respuesta
  } catch (error) {
    // Se captura cualquier error ocurrido durante la creación del registro
    logger.error("Error creating talento humano: ", error.message);
    res.status(400).json({
      message: "Error al registrar el talento humano.", // Respuesta de error
      error: error.message, // Detalle del error
    });
  }
};

// Función para actualizar un registro de talento humano específico por ID
export const updateTalentoHumano = async (req, res) => {
  try {
    // Se intenta actualizar un registro de talento humano con el ID proporcionado y los nuevos datos
    const [updated] = await TalentoHumanoModel.update(req.body, {
      where: { Id_Talento_Humano: req.params.Id_Talento_Humano }, // Condición de búsqueda por ID
    });
    
    // Se verifica si se realizó la actualización
    if (updated) {
      res.json({
        message: "Talento humano actualizado correctamente!", // Respuesta exitosa
      });
      return; // Se termina la ejecución de la función tras enviar la respuesta
    } else {
      // En caso de no encontrar el registro para actualizar, se devuelve un mensaje de error
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    // Se captura cualquier error ocurrido durante la actualización
    logger.error("Error updating talento humano: ", error.message);
    res.status(400).json({
      message: "Error al actualizar el talento humano.", // Respuesta de error
      error: error.message, // Detalle del error
    });
  }
};

// Función para eliminar un registro de talento humano específico por ID
export const deleteTalentoHumano = async (req, res) => {
  try {
    // Se intenta eliminar un registro de talento humano con el ID proporcionado
    const deleted = await TalentoHumanoModel.destroy({
      where: { Id_Talento_Humano: req.params.Id_Talento_Humano }, // Condición de búsqueda por ID
    });
    
    // Se verifica si se realizó la eliminación
    if (deleted) {
      res.json({
        message: "Talento humano borrado correctamente!", // Respuesta exitosa
      });
      return; // Se termina la ejecución de la función tras enviar la respuesta
    } else {
      // En caso de no encontrar el registro para eliminar, se devuelve un mensaje de error
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    // Se captura cualquier error ocurrido durante la eliminación
    logger.error("Error deleting talento humano: ", error.message);
    res.status(400).json({
      message: "Error al borrar el talento humano.", // Respuesta de error
      error: error.message, // Detalle del error
    });
  }
};
