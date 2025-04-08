import AsistenciaModel from "../models/attendaceModel.js";
import db from "../database/db.js";

// Servicio para obtener todas las asistencias (utilizando una consulta raw con joins)
export const getAllAsistenciasService = async () => {
  const asistencias = await db.query(
    `SELECT 
        a.*,
        CONCAT(apr.Nom_Aprendiz, ' ', apr.Ape_Aprendiz) as NombreCompleto,
        pf.Nom_ProgramaFormacion as ProgramaFormacion
      FROM asistencias a
      LEFT JOIN aprendices apr ON a.Id_Aprendiz = apr.Id_Aprendiz
      LEFT JOIN fichas f ON apr.Id_Ficha = f.Id_Ficha
      LEFT JOIN programasformacion pf ON f.Id_ProgramaFormacion = pf.Id_ProgramaFormacion`,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  return asistencias;
};

// Servicio para obtener una asistencia específica por ID
export const getAsistenciaService = async (Id_Asistencia) => {
  return await AsistenciaModel.findByPk(Id_Asistencia);
};

// Servicio para crear una nueva asistencia  
export const createAsistenciaService = async ({ Fec_Asistencia, Mot_Asistencia, Tip_Asistencia }) => {
  // Validación de campos obligatorios
  if (!Fec_Asistencia || !Tip_Asistencia) {
    throw new Error("La fecha y tipo de asistencia son obligatorios");
  }
  return await AsistenciaModel.create({
    Fec_Asistencia,
    Mot_Asistencia,
    Tip_Asistencia,
  });
};

// Servicio para actualizar una asistencia existente
export const updateAsistenciaService = async (Id_Asistencia, { Fec_Asistencia, Mot_Asistencia, Tip_Asistencia }) => {
  // Validación de campos obligatorios
  if (!Fec_Asistencia || !Tip_Asistencia) {
    throw new Error("La fecha y tipo de asistencia son obligatorios");
  }
  const [updated] = await AsistenciaModel.update(
    {
      Fec_Asistencia,
      Mot_Asistencia,
      Tip_Asistencia,
    },
    {
      where: { Id_Asistencia },
    }
  );
  if (updated === 0) {
    throw new Error("Registro de asistencia no encontrado");
  }
  const asistenciaActualizada = await AsistenciaModel.findByPk(Id_Asistencia);
  return asistenciaActualizada;
};

// Servicio para eliminar una asistencia
export const deleteAsistenciaService = async (Id_Asistencia) => {
  if (!Id_Asistencia) {
    throw new Error("Id_Asistencia es requerido");
  }
  const result = await AsistenciaModel.destroy({
    where: { Id_Asistencia },
  });
  if (result === 0) {
    throw new Error("Registro de asistencia no encontrado");
  }
  return result;
};
