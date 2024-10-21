import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";
import { logger } from "../middleware/logMiddleware.js";

// Controlador para obtener todas las fichas
export const getAllFichas = async (req, res) => {
  try {
    const Fichas = await FichasModel.findAll({
      include: [
        {
          model: ProgramaModel,
          as: "programasFormacion", // Alias usado para la relación
        },
      ],
    });

    if (Fichas.length > 0) {
      // Si se encontraron fichas, se devuelve un código 200 con los datos
      return res.status(200).json(Fichas);
    }

    // Si no se encontraron fichas, se devuelve un código 404 con un mensaje
    return res.status(404).json({
      message: "No se encontraron fichas registradas.",
    });
  } catch (error) {
    // Registro del error y retorno de un código 500 con mensaje de error
    logger.error(`Error al obtener las fichas: ${error.message}`);
    return res.status(500).json({ message: "Error al recuperar las fichas." });
  }
};

// Controlador para obtener una ficha específica por ID
export const getFicha = async (req, res) => {
  try {
    const Ficha = await FichasModel.findByPk(req.params.Id_Ficha, {
      include: [
        {
          model: ProgramaModel,
          as: "programasFormacion", // Alias usado para la relación
        },
      ],
    });

    if (Ficha) {
      // Si se encontró la ficha, se devuelve un código 200 con los datos
      return res.status(200).json(Ficha);
    }

    // Si no se encontró la ficha, se devuelve un código 404 con un mensaje
    return res.status(404).json({ message: "Ficha no encontrada" });
  } catch (error) {
    // Registro del error y retorno de un código 500 con mensaje de error
    logger.error(`Error al obtener la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error al recuperar la ficha." });
  }
};

// Controlador para crear una nueva ficha
export const createFicha = async (req, res) => {
  try {
    const {
      Id_Ficha,
      Fec_InicioEtapaLectiva,
      Fec_FinEtapaLectiva,
      Can_Aprendices,
      Id_ProgramaFormacion,
      Estado,
    } = req.body;

    const NewFicha = await FichasModel.create({
      Id_Ficha,
      Fec_InicioEtapaLectiva,
      Fec_FinEtapaLectiva,
      Can_Aprendices,
      Id_ProgramaFormacion,
      Estado,
    });

    if (NewFicha) {
      // Si la ficha se creó correctamente, se devuelve un código 201 con los datos
      return res.status(201).json(NewFicha);
    }

    // Si hubo un problema en la creación, se devuelve un código 500 con un mensaje
    return res.status(500).json({ message: "Error al crear la ficha." });
  } catch (error) {
    // Registro del error y retorno de un código 500 con mensaje de error
    logger.error(`Error al crear la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Controlador para actualizar una ficha existente
export const updateFicha = async (req, res) => {
  try {
    const {
      Fec_InicioEtapaLectiva,
      Fec_FinEtapaLectiva,
      Can_Aprendices,
      Id_ProgramaFormacion,
      Estado,
    } = req.body;

    const [updated] = await FichasModel.update(
      {
        Fec_InicioEtapaLectiva,
        Fec_FinEtapaLectiva,
        Can_Aprendices,
        Id_ProgramaFormacion,
        Estado,
      },
      {
        where: { Id_Ficha: req.params.Id_Ficha },
      }
    );

    if (updated === 0) {
      // Si no se actualizó ninguna fila, se devuelve un código 404 con un mensaje
      return res.status(404).json({ message: "Ficha no encontrada" });
    }

    // Si la actualización fue exitosa, se devuelve un mensaje de éxito
    return res.json({ message: "Ficha actualizada correctamente" });
  } catch (error) {
    // Registro del error y retorno de un código 500 con mensaje de error
    logger.error(`Error al actualizar la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error al actualizar la ficha." });
  }
};

// Controlador para eliminar una ficha existente
export const deleteFicha = async (req, res) => {
  try {
    const Result = await FichasModel.destroy({
      where: { Id_Ficha: req.params.Id_Ficha },
    });

    if (Result === 0) {
      // Si no se eliminó ninguna fila, se devuelve un código 404 con un mensaje
      return res.status(404).json({ message: "Ficha no encontrada" });
    }

    // Si la eliminación fue exitosa, se devuelve un mensaje de éxito
    return res.json({ message: "Ficha eliminada correctamente" });
  } catch (error) {
    // Registro del error y retorno de un código 500 con mensaje de error
    logger.error(`Error al eliminar la ficha: ${error.message}`);
    return res.status(500).json({ message: "Error al eliminar la ficha." });
  }
};
