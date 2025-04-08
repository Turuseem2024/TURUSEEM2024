// services/unitService.js
import UnitModel from "../models/unitModel.js";
import AreaModel from "../models/areaModel.js";

/**
 * Obtiene todas las unidades incluyendo sus áreas relacionadas.
 */
export const findAllUnits = async () => {
  return await UnitModel.findAll({
    include: [
      {
        model: AreaModel,
        as: "areas",
      },
    ],
  });
};

/**
 * Obtiene una unidad específica por su ID, incluyendo sus áreas relacionadas.
 * @param {number} id - El ID de la unidad.
 */
export const findUnitById = async (id) => {
  return await UnitModel.findByPk(id, {
    include: [
      {
        model: AreaModel,
        as: "areas",
      },
    ],
  });
};

/**
 * Crea una nueva unidad en la base de datos.
 * @param {Object} unitData - Los datos de la nueva unidad.
 */
export const createUnitService = async (unitData) => {
  return await UnitModel.create(unitData);
};

/**
 * Actualiza los datos de una unidad específica.
 * @param {number} id - El ID de la unidad a actualizar.
 * @param {Object} unitData - Los nuevos datos para la unidad.
 */
export const updateUnitService = async (id, unitData) => {
  return await UnitModel.update(unitData, {
    where: { Id_Unidad: id },
  });
};

/**
 * Elimina una unidad específica de la base de datos.
 * @param {number} id - El ID de la unidad a eliminar.
 */
export const deleteUnitService = async (id) => {
  return await UnitModel.destroy({
    where: { Id_Unidad: id },
  });
};
