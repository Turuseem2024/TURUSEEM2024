// services/turnoEspecialService.js

// Importación de los modelos necesarios para interactuar con la base de datos
import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import FichasModel from "../models/fichasModel.js";
import UnitModel from "../models/unitModel.js";
import OfficialModel from "../models/officialModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import ProgramaModel from "../models/programaModel.js";
import { Op, Sequelize } from "sequelize";

/**
 * Obtiene todos los turnos especiales con sus relaciones anidadas.
 * Esto incluye los modelos asociados: Fichas, Unidad y Funcionario.
 * 
 * @returns {Promise<Array>} Lista de turnos especiales con sus relaciones.
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
 * Obtiene un turno especial específico por su ID con las relaciones necesarias.
 * 
 * @param {number} id - El ID del turno especial que se desea obtener.
 * @returns {Promise<Object>} El turno especial con las relaciones correspondientes.
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
 * Crea un nuevo turno especial y las asociaciones correspondientes.
 * El turno especial se crea con los datos proporcionados.
 * 
 * @param {Object} data - Los datos necesarios para crear el turno especial.
 * @returns {Promise<Object>} El turno especial recién creado.
 */
export const createTurnoEspecialService = async (data) => {
  // Formateamos la fecha para que sea en el formato YYYY-MM-DD
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

  // Nota: Las asociaciones con aprendices ya no se crean ya que el modelo TurnoEspecialAprendizModel fue eliminado
  return newTurnoEspecial;
};

/**
 * Actualiza un turno especial existente y actualiza sus asociaciones con los aprendices.
 * 
 * @param {number} id - El ID del turno especial que se desea actualizar.
 * @param {Object} data - Los nuevos datos para actualizar el turno especial.
 * @returns {Promise<number>} El número de registros actualizados (debería ser 1 si se actualizó correctamente).
 * @throws {Error} Si no se encuentra el turno especial, lanza un error.
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
  
  // Si no se encontró el turno especial con ese ID, lanzamos un error
  if (updated === 0) {
    throw new Error("Turno especial no encontrado");
  }

  // Nota: Las asociaciones con aprendices ya no se actualizan ya que el modelo TurnoEspecialAprendizModel fue eliminado
  return updated;
};

/**
 * Elimina un turno especial y sus asociaciones con los aprendices.
 * 
 * @param {number} id - El ID del turno especial a eliminar.
 * @returns {Promise<Object>} Un objeto con el resultado de la eliminación.
 */
export const deleteTurnoEspecialService = async (id) => {
  const result = await TurnoEspecialModel.destroy({
    where: { Id_TurnoEspecial: id },
  });
  return { result, deletedAssociations: 0 }; // Nota: No se eliminan asociaciones con aprendices.
};

/**
 * Obtiene todos los turnos especiales programados para una ficha a partir de la fecha actual.
 * 
 * @param {number} fichaId - El ID de la ficha para la que se desean obtener los turnos especiales.
 * @param {string} fechaHoy - La fecha actual en formato YYYY-MM-DD.
 * @returns {Promise<Array>} Lista de turnos especiales programados para la ficha y después de la fecha indicada.
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
