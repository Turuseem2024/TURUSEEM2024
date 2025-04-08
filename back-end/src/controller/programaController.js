// controllers/programaController.js
import { logger } from "../middleware/logMiddleware.js";
import {
  getAllProgramasService,
  getProgramaByIdService,
  createProgramaService,
  updateProgramaService,
  deleteProgramaService,
} from "../services/programaService.js";

export const getAllProgramas = async (req, res) => {
  try {
    const programas = await getAllProgramasService();
    if (programas.length > 0) {
      return res.status(200).json(programas);
    } else {
      return res.status(404).json({
        message: "No se encontraron programas de formación registrados.",
      });
    }
  } catch (error) {
    logger.error(`Error al obtener los programas: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener los programas de formación.",
    });
  }
};

export const getPrograma = async (req, res) => {
  try {
    const programa = await getProgramaByIdService(req.params.Id_ProgramaFormacion);
    if (programa) {
      return res.status(200).json(programa);
    } else {
      return res.status(404).json({ message: "Programa no encontrado" });
    }
  } catch (error) {
    logger.error(`Error al obtener el programa: ${error.message}`);
    return res.status(500).json({
      message: "Error al obtener el programa.",
    });
  }
};

export const createPrograma = async (req, res) => {
  try {
    const { Id_ProgramaFormacion, Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const newPrograma = await createProgramaService({
      Id_ProgramaFormacion,
      Nom_ProgramaFormacion,
      Tip_ProgramaFormacion,
      Id_Area,
    });
    if (newPrograma) {
      return res.status(201).json(newPrograma);
    }
  } catch (error) {
    logger.error(`Error al crear el programa: ${error.message}`);
    return res.status(500).json({
      message: "Error al crear el programa.",
    });
  }
};

export const updatePrograma = async (req, res) => {
  try {
    const { Id_ProgramaFormacion, Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const [updated] = await updateProgramaService(req.params.Id_ProgramaFormacion, {
      Id_ProgramaFormacion,
      Nom_ProgramaFormacion,
      Tip_ProgramaFormacion,
      Id_Area,
    });
    if (updated === 0) {
      return res.status(404).json({
        message: "Programa no encontrado",
      });
    } else {
      return res.json({
        message: "Programa actualizado correctamente",
      });
    }
  } catch (error) {
    logger.error(`Error al actualizar el programa: ${error.message}`);
    return res.status(500).json({
      message: "Error al actualizar el programa.",
    });
  }
};

export const deletePrograma = async (req, res) => {
  try {
    const deleted = await deleteProgramaService(req.params.Id_ProgramaFormacion);
    if (deleted) {
      return res.json({
        message: "Programa borrado correctamente!",
      });
    } else {
      return res.status(404).json({
        message: "Programa no encontrado.",
      });
    }
  } catch (error) {
    logger.error(`Error al eliminar el programa: ${error.message}`);
    return res.status(500).json({
      message: "Error al eliminar el programa.",
    });
  }
};
