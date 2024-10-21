import { logger } from "../middleware/logMiddleware.js";
import AreaModel from "../models/areaModel.js";
import FichasModel from "../models/fichasModel.js"
import ApprenticeModel from "../models/apprenticeModel.js"
import ProgramaModel from "../models/programaModel.js";

export const getAllAreas = async (req, res) => {
  try {
    // Intentamos obtener todas las áreas de la base de datos
    const areas = await AreaModel.findAll();

    // Verificamos si se encontraron áreas
    if (areas.length > 0) {
      // Si se encontraron áreas, devolvemos un código 200 y las áreas en formato JSON
      return res.status(200).json(areas);
    } else {
      // Si no se encontraron áreas, devolvemos un código 404 con un mensaje adecuado
      return res.status(404).json({
        message: "No se encontraron áreas.",
      });
    }
  } catch (error) {
    // Si ocurre un error durante la consulta, lo registramos y devolvemos un código 500 con un mensaje de error
    logger.error("Error fetching areas: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar las áreas.",
      error: error.message,
    });
  }
};

import UnitModel from "../models/unitModel.js";
// Obtener unidades por área
export const getUnidadesByArea = async (req, res) => {
  const { Id_Area } = req.params;

  try {
    const unidades = await UnitModel.findAll({
      where: { Id_Area: Id_Area },
      attributes: ['Id_Unidad', 'Nom_Unidad']  // Devuelve solo los campos necesarios
    });

    if (!unidades.length) {
      return res.status(404).json({ msg: 'No se encontraron unidades para esta área.' });
    }
    res.status(200).json(unidades);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las unidades', error });
  }
};

export const getAprendicesByArea = async (req, res) => {
  const { Id_Area } = req.params;

  try {
    // Encuentra las unidades asociadas al área
    const unidades = await UnitModel.findAll({
      where: { Id_Area },
      attributes: ['Id_Unidad']
    });

    if (!unidades.length) {
      return res.status(404).json({ msg: 'No se encontraron unidades para esta área.' });
    }

    // Encuentra los programas asociados a las unidades del área
    const programas = await ProgramaModel.findAll({
      where: { Id_Area: Id_Area },
      include: {
        model: FichasModel,
        as: 'fichas',
        include: {
          model: ApprenticeModel,
          as: 'aprendices',
          attributes: ['Id_Aprendiz', 'Nom_Aprendiz', 'Ape_Aprendiz']
        }
      }
    });

    // Extrae los aprendices
    const aprendices = programas.flatMap(programa =>
      programa.fichas.flatMap(ficha => ficha.aprendices)
    );

    res.status(200).json(aprendices);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los aprendices', error });
  }
};




