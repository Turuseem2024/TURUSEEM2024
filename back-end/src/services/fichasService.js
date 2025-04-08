import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";

// Definición de la asociación para incluir la relación con el modelo ProgramaModel
const includeProgramas = [
  {
    model: ProgramaModel,
    as: "programasFormacion", // Alias usado en la relación
  },
];

// Servicio para obtener todas las fichas con la relación de programas
export const getAllFichasService = async () => {
  return await FichasModel.findAll({
    include: includeProgramas,
  });
};

// Servicio para obtener una ficha específica por ID, incluyendo la relación de programas
export const getFichaService = async (id) => {
  return await FichasModel.findByPk(id, {
    include: includeProgramas,
  });
};

// Servicio para crear una nueva ficha
export const createFichaService = async (data) => {
  const {
    Id_Ficha,
    Fec_InicioEtapaLectiva,
    Fec_FinEtapaLectiva,
    Can_Aprendices,
    Id_ProgramaFormacion,
    Estado,
  } = data;
  
  return await FichasModel.create({
    Id_Ficha,
    Fec_InicioEtapaLectiva,
    Fec_FinEtapaLectiva,
    Can_Aprendices,
    Id_ProgramaFormacion,
    Estado,
  });
};

// Servicio para actualizar una ficha existente
export const updateFichaService = async (id, data) => {
  const {
    Fec_InicioEtapaLectiva,
    Fec_FinEtapaLectiva,
    Can_Aprendices,
    Id_ProgramaFormacion,
    Estado,
  } = data;

  return await FichasModel.update(
    {
      Fec_InicioEtapaLectiva,
      Fec_FinEtapaLectiva,
      Can_Aprendices,
      Id_ProgramaFormacion,
      Estado,
    },
    {
      where: { Id_Ficha: id },
    }
  );
};

// Servicio para eliminar una ficha existente
export const deleteFichaService = async (id) => {
  return await FichasModel.destroy({
    where: { Id_Ficha: id },
  });
};
