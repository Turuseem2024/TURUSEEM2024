// services/turnoEspecialService.js
import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import TurnoEspecialAprendizModel from "../models/turnoEspecialAprendizModel.js";
import FichasModel from "../models/fichasModel.js";
import UnitModel from "../models/unitModel.js";
import OfficialModel from "../models/officialModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import ProgramaModel from "../models/programaModel.js";
import { Op, Sequelize } from "sequelize";

/**
 * Obtiene todos los turnos especiales con sus relaciones anidadas.
 */
export const findAllTurnosEspeciales = async () => {
  return await TurnoEspecialModel.findAll({
    include: [
      {
        model: FichasModel,
        as: "fichas",
        include: [
          {
            model: ProgramaModel,
            as: "programasFormacion",
          },
        ],
      },
      {
        model: UnitModel,
        as: "unidad",
      },
      {
        model: OfficialModel,
        as: "funcionario",
      },
    ],
  });
};

/**
 * Obtiene un turno especial específico por ID con las relaciones necesarias.
 * @param {number} id - El ID del turno especial.
 */
export const findTurnoEspecialById = async (id) => {
  return await TurnoEspecialModel.findByPk(id, {
    include: [
      {
        model: FichasModel,
        as: "fichas",
        include: [
          {
            model: ProgramaModel,
            as: "programasFormacion",
          },
        ],
      },
      {
        model: UnitModel,
        as: "unidad",
      },
      {
        model: OfficialModel,
        as: "funcionario",
      },
    ],
  });
};

/**
 * Crea un nuevo turno especial y las asociaciones correspondientes en TurnoEspecialAprendiz.
 * @param {Object} data - Datos para crear el turno especial.
 */
export const createTurnoEspecialService = async (data) => {
  // Formateamos la fecha para obtener el formato YYYY-MM-DD
  const newTurnoEspecial = await TurnoEspecialModel.create({
    Fec_TurnoEspecial: new Date(data.Fec_TurnoEspecial).toISOString().split("T")[0],
    Hor_Inicio: data.Hor_Inicio,
    Hor_Fin: data.Hor_Fin,
    Obs_TurnoEspecial: data.Obs_TurnoEspecial,
    Tot_AprendicesAsistieron: data.Tot_AprendicesAsistieron,
    Id_Ficha: data.Id_Ficha,
    Img_Asistencia: data.Img_Asistencia || null,
    Id_Funcionario: data.Id_Funcionario,
    Id_Unidad: data.Id_Unidad,
  });

  // Obtener todos los aprendices asociados a la ficha
  const aprendices = await ApprenticeModel.findAll({
    where: { Id_Ficha: data.Id_Ficha },
  });

  // Crear una asociación para cada aprendiz
  const asociaciones = aprendices.map((aprendiz) => ({
    Ind_Asistencia: "Si",
    Id_Aprendiz: aprendiz.Id_Aprendiz,
    Id_TurnoEspecial: newTurnoEspecial.Id_TurnoEspecial,
  }));

  await TurnoEspecialAprendizModel.bulkCreate(asociaciones);
  return newTurnoEspecial;
};

/**
 * Actualiza un turno especial y actualiza las asociaciones con los aprendices.
 * @param {number} id - ID del turno especial a actualizar.
 * @param {Object} data - Datos nuevos para el turno especial.
 */
export const updateTurnoEspecialService = async (id, data) => {
  const [updated] = await TurnoEspecialModel.update(
    {
      Fec_TurnoEspecial: new Date(data.Fec_TurnoEspecial).toISOString().split("T")[0],
      Hor_Inicio: data.Hor_Inicio,
      Hor_Fin: data.Hor_Fin,
      Obs_TurnoEspecial: data.Obs_TurnoEspecial,
      Tot_AprendicesAsistieron: data.Tot_AprendicesAsistieron,
      Id_Ficha: data.Id_Ficha,
      Img_Asistencia: data.Img_Asistencia || null,
      Id_Funcionario: data.Id_Funcionario,
      Id_Unidad: data.Id_Unidad,
    },
    {
      where: { Id_TurnoEspecial: id },
    }
  );
  if (updated === 0) {
    throw new Error("Turno especial no encontrado");
  }

  // Eliminamos las asociaciones actuales
  await TurnoEspecialAprendizModel.destroy({
    where: { Id_TurnoEspecial: id },
  });

  // Obtenemos los aprendices de la ficha actualizada
  const aprendices = await ApprenticeModel.findAll({
    where: { Id_Ficha: data.Id_Ficha },
  });
  const nuevasAsociaciones = aprendices.map((aprendiz) => ({
    Ind_Asistencia: "Si",
    Id_Aprendiz: aprendiz.Id_Aprendiz,
    Id_TurnoEspecial: id,
  }));
  await TurnoEspecialAprendizModel.bulkCreate(nuevasAsociaciones);
  return updated;
};

/**
 * Elimina un turno especial y sus asociaciones en TurnoEspecialAprendiz.
 * @param {number} id - ID del turno especial a eliminar.
 */
export const deleteTurnoEspecialService = async (id) => {
  // Primero eliminamos las asociaciones
  const deletedAssociations = await TurnoEspecialAprendizModel.destroy({
    where: { Id_TurnoEspecial: id },
  });
  const result = await TurnoEspecialModel.destroy({
    where: { Id_TurnoEspecial: id },
  });
  return { result, deletedAssociations };
};

/**
 * Obtiene los turnos especiales programados para una ficha a partir de la fecha actual.
 * @param {number} fichaId - ID de la ficha.
 * @param {string} fechaHoy - Fecha de hoy en formato YYYY-MM-DD.
 */
export const findTurnoEspecialForFichas = async (fichaId, fechaHoy) => {
  return await TurnoEspecialModel.findAll({
    where: {
      Id_Ficha: fichaId,
      [Op.and]: [Sequelize.literal(`DATE(Fec_TurnoEspecial) >= '${fechaHoy}'`)],
    },
    include: [
      {
        model: FichasModel,
        as: "fichas",
      },
      {
        model: UnitModel,
        as: "unidad",
      },
      {
        model: OfficialModel,
        as: "funcionario",
      },
    ],
  });
};
