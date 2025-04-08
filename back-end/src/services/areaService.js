import AreaModel from "../models/areaModel.js";
import UnitModel from "../models/unitModel.js";
import ProgramaModel from "../models/programaModel.js";
import FichasModel from "../models/fichasModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";

// Servicio para obtener todas las áreas
export const getAllAreasService = async () => {
  return await AreaModel.findAll();
};

// Servicio para obtener las unidades asociadas a un área
export const getUnidadesByAreaService = async (Id_Area) => {
  return await UnitModel.findAll({
    where: { Id_Area },
    attributes: ['Id_Unidad', 'Nom_Unidad']
  });
};

// Servicio para obtener los aprendices asociados a un área
export const getAprendicesByAreaService = async (Id_Area) => {
  // Primero se verifica si existen unidades asociadas al área
  const unidades = await UnitModel.findAll({
    where: { Id_Area },
    attributes: ['Id_Unidad']
  });

  if (!unidades.length) {
    return null;
  }

  // Se obtienen los programas cuyo Id_Area coincida y se incluyen las fichas y sus aprendices
  const programas = await ProgramaModel.findAll({
    where: { Id_Area },
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

  // Se extraen y se aplanan los aprendices de todos los programas y sus fichas
  const aprendices = programas.flatMap(programa =>
    programa.fichas.flatMap(ficha => ficha.aprendices)
  );

  return aprendices;
};
