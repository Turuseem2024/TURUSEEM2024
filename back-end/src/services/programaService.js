// services/programaService.js
import ProgramaModel from "../models/programaModel.js";
import AreaModel from "../models/areaModel.js";

/**
 * Obtiene todos los programas de formación incluyendo sus áreas asociadas.
 */
export const getAllProgramasService = async () => {
  return await ProgramaModel.findAll({
    include: [
      {
        model: AreaModel,
        as: "areas", // Alias definido en la relación del modelo
      },
    ],
  });
};

/**
 * Obtiene un programa específico por su ID, incluyendo sus áreas asociadas.
 * @param {number} id - El ID del programa de formación.
 */
export const getProgramaByIdService = async (id) => {
  return await ProgramaModel.findByPk(id, {
    include: [
      {
        model: AreaModel,
        as: "areas",
      },
    ],
  });
};

/**
 * Crea un nuevo programa de formación.
 * @param {Object} data - Objeto con los campos del programa (Id_ProgramaFormacion, Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area)
 */
export const createProgramaService = async (data) => {
  return await ProgramaModel.create(data);
};

/**
 * Actualiza un programa de formación existente.
 * @param {number} id - El ID del programa a actualizar.
 * @param {Object} data - Objeto con los datos a actualizar.
 */
export const updateProgramaService = async (id, data) => {
  return await ProgramaModel.update(data, {
    where: { Id_ProgramaFormacion: id },
  });
};

/**
 * Elimina un programa de formación por su ID.
 * @param {number} id - El ID del programa a eliminar.
 */
export const deleteProgramaService = async (id) => {
  return await ProgramaModel.destroy({
    where: { Id_ProgramaFormacion: id },
  });
};
