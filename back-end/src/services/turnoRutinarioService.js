// services/turnoRutinarioService.js
import TurnosRutinariosModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";
import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";
import AbsenceModel from "../models/attendaceModel.js";
import OtrosMemorandumModel from "../models/Otros_MemorandosModel.js";
import { Op, Sequelize } from "sequelize";

/**
 * Obtiene todos los turnos rutinarios incluyendo las relaciones anidadas
 * (aprendiz, fichas, programas de formación y unidad).
 */
export const findAllTurnosRutinarios = async () => {
  return await TurnosRutinariosModel.findAll({
    include: [
      {
        model: ApprenticeModel,
        as: "aprendiz",
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
        ],
      },
      {
        model: UnitModel,
        as: "unidad",
      },
    ],
  });
};

/**
 * Obtiene un turno rutinario específico por su ID, incluyendo relaciones anidadas.
 * @param {number} id - El ID del turno rutinario.
 */
export const findTurnoRutinarioById = async (id) => {
  return await TurnosRutinariosModel.findByPk(id, {
    include: [
      {
        model: ApprenticeModel,
        as: "aprendiz",
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
        ],
      },
      {
        model: UnitModel,
        as: "unidad",
      },
    ],
  });
};

/**
 * Crea un nuevo turno rutinario con los datos proporcionados.
 * @param {Object} data - Datos para crear el turno rutinario.
 */
export const createTurnoRutinarioService = async (data) => {
  return await TurnosRutinariosModel.create(data);
};

/**
 * Actualiza un turno rutinario específico.
 * @param {number} id - El ID del turno a actualizar.
 * @param {Object} data - Los datos nuevos para el turno.
 * @returns {Array} - Resultado del update (por ejemplo, [filasActualizadas]).
 */
export const updateTurnoRutinarioService = async (id, data) => {
  return await TurnosRutinariosModel.update(data, {
    where: { Id_TurnoRutinario: id },
  });
};

/**
 * Elimina un turno rutinario específico.
 * @param {number} id - El ID del turno a eliminar.
 */
export const deleteTurnoRutinarioService = async (id) => {
  return await TurnosRutinariosModel.destroy({
    where: { Id_TurnoRutinario: id },
  });
};

/**
 * Obtiene los turnos rutinarios programados para un aprendiz a partir de la fecha actual.
 * @param {number} idAprendiz - ID del aprendiz.
 * @param {string} fechaHoy - Fecha en formato YYYY-MM-DD.
 */
export const findTurnosForAprendiz = async (idAprendiz, fechaHoy) => {
  return await TurnosRutinariosModel.findAll({
    where: {
      Id_Aprendiz: idAprendiz,
      [Op.and]: [
        Sequelize.literal(`DATE(Fec_InicioTurno) >= '${fechaHoy}'`),
      ],
    },
    include: [
      {
        model: ApprenticeModel,
        as: "aprendiz",
      },
      {
        model: UnitModel,
        as: "unidad",
      },
    ],
  });
};

/**
 * Actualiza (o revierte) la inasistencia y el memorando asociado en función del valor de la asistencia.
 * Si Ind_Asistencia es "Sí": se decrementan los contadores y se eliminan la inasistencia y su memorando.
 * Si Ind_Asistencia es "No": se incrementan los contadores y se crean la inasistencia y el memorando.
 * @param {Object} params - Contiene por lo menos { Id_Aprendiz }.
 * @param {Object} data - Datos necesarios: { Ind_Asistencia, Turno_Id, Fec_Inasistencia, Motivo, Tipo_Inasistencia }.
 */
export const updateInasistenciaService = async (params, data) => {
  const { Ind_Asistencia, Turno_Id, Fec_Inasistencia, Motivo, Tipo_Inasistencia } = data;
  const { Id_Aprendiz } = params;
  
  // Buscar el aprendiz en la base de datos.
  const aprendiz = await ApprenticeModel.findByPk(Id_Aprendiz);
  if (!aprendiz) {
    throw new Error("Aprendiz no encontrado");
  }

  if (Ind_Asistencia === "Sí") {
    // Decrementar contadores si es posible.
    let inasistenciasModificadas = false;
    if (aprendiz.Tot_Inasistencias > 0) {
      aprendiz.Tot_Inasistencias -= 1;
      inasistenciasModificadas = true;
    }
    if (aprendiz.Tot_Memorandos > 0) {
      aprendiz.Tot_Memorandos -= 1;
      inasistenciasModificadas = true;
    }
    if (inasistenciasModificadas) {
      await aprendiz.save();
    }
    // Buscar la inasistencia asociada al turno.
    const absence = await AbsenceModel.findOne({
      where: { Turno_Id },
    });
    if (absence) {
      // Eliminar el memorando asociado a la inasistencia.
      await OtrosMemorandumModel.destroy({
        where: { Referencia_Id: absence.Id_Inasistencia },
      });
      // Eliminar la inasistencia.
      await AbsenceModel.destroy({
        where: { Turno_Id },
      });
    } else {
      throw new Error("No se encontró inasistencia para eliminar");
    }
  } else if (Ind_Asistencia === "No") {
    // Incrementar contadores.
    aprendiz.Tot_Inasistencias += 1;
    aprendiz.Tot_Memorandos += 1;
    await aprendiz.save();

    // Crear el registro de inasistencia.
    const absence = await AbsenceModel.create({
      Fec_Inasistencia,
      Mot_Inasistencia: Motivo,
      Turno_Id,
      Tipo_Inasistencia,
    });
    // Crear el registro de memorando asociado.
    await OtrosMemorandumModel.create({
      Fec_OtroMemorando: Fec_Inasistencia,
      Mot_OtroMemorando: Motivo,
      Referencia_Id: absence.Id_Inasistencia,
    });
  }
  return true;
};
