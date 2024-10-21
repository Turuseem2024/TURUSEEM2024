import { logger } from "../middleware/logMiddleware.js";
import TalentoHumanoModel from "../models/talentoHumano.js";
import FichasModel from "../models/fichasModel.js";

export const getAllTalentoHumano = async (req, res) => {
  try {
    // Intento de obtener todos los registros de talento humano con las fichas asociadas.
    const talentoHumano = await TalentoHumanoModel.findAll({
      include: [
        { 
          model: FichasModel,
          as: "fichas" 
        }
      ],
    });
    if (talentoHumano.length > 0){
      res.status(200).json(talentoHumano);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron aprendices de talento humano registrados.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error("Error fetching talento humano: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el talento humano.",
    });
  }
};

export const getTalentoHumano = async (req, res) => {
  try {
    // Intento de obtener un registro específico de talento humano por ID con las fichas asociadas.
    const talentoHumano = await TalentoHumanoModel.findByPk(
      req.params.Id_Talento_Humano, {
      include: [
        { 
          model: FichasModel, 
          as: "fichas"
        }
      ],
    });
    // Verifico si se encontró el registro.
    if (talentoHumano) {
      res.status(200).json(talentoHumano);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error("Error fetching talento humano: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el talento humano.",
    });
  }
};

export const createTalentoHumano = async (req, res) => {
  try {
    // Intento de crear un nuevo registro de talento humano.
    const newTalento = await TalentoHumanoModel.create(req.body);
    res.status(201).json({
      message: "Talento humano registrado correctamente!",
      data: newTalento,
    });
    return; // Uso de return para salir de la función después de enviar la respuesta.
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error("Error creating talento humano: ", error.message);
    res.status(400).json({
      message: "Error al registrar el talento humano.",
      error: error.message,
    });
  }
};

export const updateTalentoHumano = async (req, res) => {
  try {
    // Intento de actualizar un registro específico de talento humano.
    const [updated] = await TalentoHumanoModel.update(req.body, {
      where: { Id_Talento_Humano: req.params.Id_Talento_Humano },
    });
    // Verifico si se realizó alguna actualización.
    if (updated) {
      res.json({
        message: "Talento humano actualizado correctamente!",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error("Error updating talento humano: ", error.message);
    res.status(400).json({
      message: "Error al actualizar el talento humano.",
      error: error.message,
    });
  }
};

export const deleteTalentoHumano = async (req, res) => {
  try {
    // Intento de eliminar un registro específico de talento humano.
    const deleted = await TalentoHumanoModel.destroy({
      where: { Id_Talento_Humano: req.params.Id_Talento_Humano },
    });
    // Verifico si se realizó la eliminación.
    if (deleted) {
      res.json({
        message: "Talento humano borrado correctamente!",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error("Error deleting talento humano: ", error.message);
    res.status(400).json({
      message: "Error al borrar el talento humano.",
      error: error.message,
    });
  }
};