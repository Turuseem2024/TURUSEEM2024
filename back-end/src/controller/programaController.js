import ProgramaModel from "../models/programaModel.js";
import AreaModel from "../models/areaModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllProgramas = async (req, res) => {
  try {
    // Intento de obtener todos los programas con las áreas asociadas.
    const Programas = await ProgramaModel.findAll({
      include: [
        {
          model: AreaModel,
          as: "areas", // Alias usado para la relación
        },
      ],
    });
    // Verifico si se encontraron programas.
    if (Programas.length > 0) {
      res.status(200).json(Programas);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron programas de formacion registrados.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener los programas: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener los programas de formacion.",
    });
  }
};

export const getPrograma = async (req, res) => {
  try {
    // Intento de obtener un programa específico por ID con las áreas asociadas.
    const Programa = await ProgramaModel.findByPk(
      req.params.Id_ProgramaFormacion,
      {
        include: [
          {
            model: AreaModel,
            as: "areas", // Alias usado para la relación
          },
        ],
      }
    );
    // Verifico si se encontró el programa.
    if (Programa) {
      res.status(200).json(Programa);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Programa no encontrado",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener el programa: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener el programa.",
    });
  }
};

export const createPrograma = async (req, res) => {
  try {
    // Intento de crear un nuevo programa con los datos proporcionados.
    const { Id_ProgramaFormacion, Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const NewPrograma = await ProgramaModel.create({
      Id_ProgramaFormacion,
      Nom_ProgramaFormacion,
      Tip_ProgramaFormacion,
      Id_Area,
    });
    // Verifico si se creó el programa.
    if (NewPrograma) {
      res.status(201).json(NewPrograma);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error(`Error al crear el programa: ${error.message}`);
    res.status(500).json({
      message: "Error al crear el programa.",
    });
  }
};

export const updatePrograma = async (req, res) => {
  try {
    // Intento de actualizar un programa específico por ID.
    const { Id_ProgramaFormacion, Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const [updated] = await ProgramaModel.update(
      {
        Id_ProgramaFormacion,
        Nom_ProgramaFormacion,
        Tip_ProgramaFormacion,
        Id_Area,
      },
      {
        where: { Id_ProgramaFormacion: req.params.Id_ProgramaFormacion },
      }
    );
    // Verifico si se realizó alguna actualización.
    if (updated === 0) {
      res.status(404).json({
        message: "Programa no encontrado",
      });
    } else {
      res.json({
        message: "Programa actualizado correctamente",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error(`Error al actualizar el programa: ${error.message}`);
    res.status(500).json({
      message: "Error al actualizar el programa.",
    });
  }
};

export const deletePrograma = async (req, res) => {
  try {
    // Intento de eliminar un programa específico por ID.
    const deleted = await ProgramaModel.destroy({
      where: { Id_ProgramaFormacion: req.params.Id_ProgramaFormacion },
    });
    // Verifico si se realizó la eliminación.
    if (deleted) {
      res.json({
        message: "Programa borrado correctamente!", // Mensaje de éxito para la eliminación
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Programa no encontrado.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error(`Error al eliminar el programa: ${error.message}`);
    res.status(500).json({
      message: "Error al eliminar el programa.",
    });
  }
};
