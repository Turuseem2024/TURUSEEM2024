import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import FichasModel from "../models/fichasModel.js";
import UnitModel from "../models/unitModel.js";
import OfficialModel from "../models/officialModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import TurnoEspecialAprendizModel from "../models/turnoEspeciales_Aprendices.js";
import { logger } from "../middleware/logMiddleware.js";
import ProgramaModel from "../models/programaModel.js";
import { Op, Sequelize } from "sequelize";

export const getAllTurnosEspeciales = async (req, res) => {
  try {
    // Intento de obtener todos los turnos especiales con las relaciones anidadas.
    const turnosEspeciales = await TurnoEspecialModel.findAll({
      include: [
        {
          model: FichasModel,
          as: "fichas", // Relación de TurnosEspeciales con Fichas
          include: [
            {
              model: ProgramaModel, // Relación de Fichas con ProgramaFormacion
              as: "programasFormacion",
            },
          ],
        },
        {
          model: UnitModel,
          as: "unidad", // Relación de TurnosEspeciales con Unidad
        },
        {
          model: OfficialModel,
          as: "funcionario", // Relación de TurnosEspeciales con Funcionario
        },
      ],
    });

    // Verifico si se encontraron turnos especiales.
    if (turnosEspeciales.length > 0) {
      res.status(200).json(turnosEspeciales);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron turnos especiales registrados.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener los turnos especiales: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener los turnos especiales.",
    });
  }
};

export const getTurnoEspecial = async (req, res) => {
  try {
    // Intento de obtener un turno especial específico por ID con las relaciones necesarias.
    const turnoEspecial = await TurnoEspecialModel.findByPk(
      req.params.Id_TurnoEspecial,
      {
        include: [
          {
            model: FichasModel,
            as: "fichas", // Relación de TurnosEspeciales con Fichas
            include: [
              {
                model: ProgramaModel, // Relación de Fichas con ProgramaFormacion
                as: "programasFormacion",
              },
            ],
          },
          {
            model: UnitModel,
            as: "unidad", // Relación de TurnosEspeciales con Unidad
          },
          {
            model: OfficialModel,
            as: "funcionario", // Relación de TurnosEspeciales con Funcionario
          },
        ],
      }
    );
    // Verifico si se encontró el turno especial.
    if (turnoEspecial) {
      res.status(200).json(turnoEspecial);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Turno especial no encontrado",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener el turno especial.",
    });
  }
};

export const createTurnoEspecial = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
    const {
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Id_Funcionario,
      Id_Unidad,
    } = req.body;
    // Manejo la imagen de asistencia si está disponible.
    const Img_Asistencia = req.file ? req.file.filename : null;

    // Intento de crear un nuevo turno especial con los datos proporcionados.
    const newTurnoEspecial = await TurnoEspecialModel.create({
      Fec_TurnoEspecial: new Date(Fec_TurnoEspecial)
        .toISOString()
        .split("T")[0],
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Img_Asistencia,
      Id_Funcionario,
      Id_Unidad,
    });

    const aprendices = await ApprenticeModel.findAll({
      where: { Id_Ficha: Id_Ficha },
    });

    const asociaciones = aprendices.map((aprendiz) => ({
      Ind_Asistencia: "Si",
      Id_Aprendiz: aprendiz.Id_Aprendiz,
      Id_TurnoEspecial: newTurnoEspecial.Id_TurnoEspecial,
    }));

    await TurnoEspecialAprendizModel.bulkCreate(asociaciones);
    // Verifico si se creó el nuevo turno especial.
    if (newTurnoEspecial) {
      res.status(201).json({
        message: "Turno Especial Creado Exitosamente",
        newTurnoEspecial,
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error(`Error al crear el turno especial: ${error}`);
    res.status(500).json({
      message: "Error al crear el turno especial.",
    });
  }
};

export const updateTurnoEspecial = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
    const {
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Id_Funcionario,
      Id_Unidad,
    } = req.body;

    const Img_Asistencia = req.file ? req.file.filename : null;

    // Intento de actualizar un turno especial específico por ID.
    const [updated] = await TurnoEspecialModel.update(
      {
        Fec_TurnoEspecial: new Date(Fec_TurnoEspecial)
          .toISOString()
          .split("T")[0],
        Hor_Inicio,
        Hor_Fin,
        Obs_TurnoEspecial,
        Tot_AprendicesAsistieron,
        Id_Ficha,
        Img_Asistencia,
        Id_Funcionario,
        Id_Unidad,
      },
      {
        where: { Id_TurnoEspecial: req.params.Id_TurnoEspecial },
      }
    );

    if (updated === 0) {
      res.status(404).json({
        message: "Turno especial no encontrado",
      });
      return;
    }

    // Primero eliminamos los registros de TurnoEspecialAprendiz asociados al turno especial.
    await TurnoEspecialAprendizModel.destroy({
      where: { Id_TurnoEspecial: req.params.Id_TurnoEspecial },
    });

    // Ahora obtenemos los aprendices de la nueva ficha.
    const aprendicesUpdate = await ApprenticeModel.findAll({
      where: { Id_Ficha: Id_Ficha },
    });

    // Creamos las nuevas asociaciones con los aprendices de la nueva ficha.
    const nuevasAsociaciones = aprendicesUpdate.map((aprendiz) => ({
      Ind_Asistencia: "Si", // Aquí puedes ajustar este valor según tu lógica de negocio.
      Id_Aprendiz: aprendiz.Id_Aprendiz,
      Id_TurnoEspecial: req.params.Id_TurnoEspecial,
    }));

    // Insertamos las nuevas asociaciones en la tabla TurnoEspecialAprendiz.
    await TurnoEspecialAprendizModel.bulkCreate(nuevasAsociaciones);

    // Respuesta exitosa
    res.json({
      message:
        "Turno especial actualizado correctamente y aprendices asociados actualizados",
    });
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error(`Error al actualizar el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al actualizar el turno especial.",
    });
  }
};

export const deleteTurnoEspecial = async (req, res) => {
  try {
    const {Id_TurnoEspecial} = req.params;

    // Primero eliminamos los registros de TurnoEspecialAprendiz asociados al turno especial.
    const deletedAssociations = await TurnoEspecialAprendizModel.destroy({
      where: { Id_TurnoEspecial: Id_TurnoEspecial },
    });

    // Luego intentamos eliminar el turno especial.
    const result = await TurnoEspecialModel.destroy({
      where: { Id_TurnoEspecial: Id_TurnoEspecial },
    });

    // Verifico si se realizó la eliminación.
    if (result === 0) {
      res.status(404).json({
        message: "Turno especial no encontrado",
      });
    } else {
      res.json({
        message: `Turno especial y ${deletedAssociations} asociaciones de aprendices eliminados correctamente`,
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error(`Error al eliminar el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al eliminar el turno especial.",
    });
  }
};

export const getTurnoEspecialForFichas = async (req, res) => {
  try {
    // Obtenemos la fecha de hoy y eliminamos la parte de la hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    // Formateamos la fecha en formato de YYYY-MM-DD para usar en la consulta
    const fechaHoy = hoy.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    const turnoEspecialForAprendiz = await TurnoEspecialModel.findAll({
      where: {
        Id_Ficha: req.params.Id_Ficha,
        [Op.and]: [
          Sequelize.literal(`DATE(Fec_TurnoEspecial) >= '${fechaHoy}'`),
        ],
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

    if (turnoEspecialForAprendiz.length === 0) {
      res
        .status(404)
        .json({ message: "La ficha no esta Programada Para Turno" });
      return;
    }
    res.status(200).json(turnoEspecialForAprendiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el turno programado: ${error}`);
  }
};