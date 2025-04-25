// Importación de módulos necesarios
import { logger } from "../middleware/logMiddleware.js"; // Middleware para el registro de logs de errores
import fs from "fs"; // Módulo para trabajar con archivos del sistema de archivos
import pdf from "html-pdf"; // Módulo para generar archivos PDF desde HTML
import db from "../database/db.js"; // Conexión a la base de datos
import OtrosMemorandumModel from "../models/Otros_MemorandosModel.js"; // Modelo de la base de datos para otros memorandos
import { emailMemorandos } from "../helpers/emailMemorandos.js"; // Funciones auxiliares para enviar emails relacionados con memorandos

/**
 * Obtener todos los memorandos registrados en la base de datos.
 * Este endpoint realiza una consulta compleja para obtener la información de los memorandos,
 * incluyendo detalles del aprendiz asociado, si es relevante (por ejemplo, inasistencia, turno rutinario, etc.).
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
export const getAllOtrosMemorandum = async (req, res) => {
  try {
    // Consulta SQL para obtener todos los memorandos, incluyendo información relacionada con aprendices, turnos y programas
    const query = `
    SELECT 
        om.Id_OtroMemorando,
        om.Fec_OtroMemorando,
        om.Mot_OtroMemorando,
        om.Referencia_Id,
        om.ENVIADO,
        COALESCE(a.Id_Aprendiz, aprendizTurno.Id_Aprendiz, aprendizDirecto.Id_Aprendiz) AS Id_Aprendiz,
        COALESCE(a.Nom_Aprendiz, aprendizTurno.Nom_Aprendiz, aprendizDirecto.Nom_Aprendiz) AS Nom_Aprendiz,
        COALESCE(a.Ape_Aprendiz, aprendizTurno.Ape_Aprendiz, aprendizDirecto.Ape_Aprendiz) AS Ape_Aprendiz,
        inas.Id_Inasistencia,
        tr.Id_TurnoRutinario,
        tr.Fec_InicioTurno,
        tr.Fec_FinTurno,
        tr.Hor_InicioTurno,
        tr.Hor_FinTurno,
        tr.Obs_TurnoRutinario,
        programasTurno.Nom_ProgramaFormacion,
        COALESCE(fichasTurno.Id_Ficha, fichasDirectas.Id_Ficha) AS Ficha_Turno,
        COALESCE(programasTurno.Id_ProgramaFormacion, programasDirectos.Id_ProgramaFormacion) AS Programa_Turno
    FROM 
        otros_memorandos om
    LEFT JOIN 
        inasistencias inas ON om.Referencia_Id = inas.Id_Inasistencia
    LEFT JOIN 
        turnosrutinarios tr ON inas.Turno_Id = tr.Id_TurnoRutinario
    LEFT JOIN 
        aprendices a ON inas.Turno_Id = a.Id_Aprendiz
    LEFT JOIN 
        aprendices AS aprendizTurno ON tr.Id_Aprendiz = aprendizTurno.Id_Aprendiz
    LEFT JOIN 
        fichas AS fichasTurno ON aprendizTurno.Id_Ficha = fichasTurno.Id_Ficha
    LEFT JOIN 
        programasformacion AS programasTurno ON fichasTurno.Id_ProgramaFormacion = programasTurno.Id_ProgramaFormacion
    LEFT JOIN 
        aprendices AS aprendizDirecto ON om.Referencia_Id = aprendizDirecto.Id_Aprendiz
    LEFT JOIN 
        fichas AS fichasDirectas ON aprendizDirecto.Id_Ficha = fichasDirectas.Id_Ficha
    LEFT JOIN 
        programasformacion AS programasDirectos ON fichasDirectas.Id_ProgramaFormacion = programasDirectos.Id_ProgramaFormacion
    LEFT JOIN 
        fichas f ON a.Id_Ficha = f.Id_Ficha
    LEFT JOIN 
        programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
    WHERE 
        om.Referencia_Id IS NOT NULL;
    `;

    // Ejecuta la consulta en la base de datos
    const [memorandums] = await db.query(query);

    // Si se encuentran memorandos, se envían en la respuesta
    if (memorandums.length > 0) {
      res.status(200).json(memorandums);
      return;
    } else {
      // Si no se encuentran memorandos, se responde con un mensaje de error 404
      res.status(404).json({
        message: "No se encontraron memorandos registrados.",
      });
    }
  } catch (error) {
    // Si ocurre un error en la consulta o cualquier parte del proceso, se registra el error y se envía una respuesta 500
    logger.error("Error fetching memorandums: ", error);
    res.status(500).json({
      message: "Error al recuperar los memorandos.",
    });
  }
};

/**
 * Obtener un memorando específico basado en su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
export const getOtroMemorandum = async (req, res) => {
  try {
    // Consulta SQL para obtener un memorando específico usando su ID
    const query = `
        SELECT om.Id_OtroMemorando,
          om.Fec_OtroMemorando,
          om.Mot_OtroMemorando,
          om.Referencia_Id,
          a.Id_Aprendiz,
          a.Nom_Aprendiz,
          a.Ape_Aprendiz,
          a.Id_Ficha,
          f.Id_ProgramaFormacion,
          p.Nom_ProgramaFormacion,
          tr.Id_TurnoRutinario,
          inas.Id_Inasistencia
        FROM otros_memorandos om
        LEFT JOIN inasistencias inas ON om.Referencia_Id = inas.Id_Inasistencia
        LEFT JOIN turnosrutinarios tr ON inas.Turno_Id = tr.Id_TurnoRutinario
        LEFT JOIN aprendices a ON tr.Id_Aprendiz = a.Id_Aprendiz
        LEFT JOIN fichas f ON a.Id_Ficha = f.Id_Ficha
        LEFT JOIN programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
        WHERE om.Id_OtroMemorando = :Id_OtroMemorando;
    `;

    // Ejecuta la consulta con el ID proporcionado en los parámetros de la solicitud
    const [memorandum] = await db.query(query, {
      replacements: { Id_OtroMemorando: req.params.Id_OtroMemorando },
    });

    // Si se encuentra el memorando, se devuelve en la respuesta
    if (memorandum.length > 0) {
      res.status(200).json(memorandum[0]); // Retorna el primer elemento si se encontró
      return;
    } else {
      // Si no se encuentra el memorando, se responde con un mensaje de error 404
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    // Si ocurre un error en la consulta o cualquier parte del proceso, se registra el error y se envía una respuesta 500
    logger.error("Error fetching memorandum: ", error);
    res.status(500).json({
      message: "Error al recuperar el memorando.",
    });
  }
};

/**
 * Obtener el total de memorandos registrados en la base de datos.
 * 
 * @returns {Promise<number>} - El total de memorandos registrados.
 */
export const getTotalOtrosMemorandums = async () => {
  try {
    return await OtrosMemorandumModel.count(); // Cuenta el número de registros en el modelo de memorandos
  } catch (error) {
    // Si ocurre un error, se registra el error y se lanza una excepción
    console.error("Error del total de memorandos", error);
    logger.error("Error obteniendo el total de memorandos: ", error);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

/**
 * Obtener el total de memorandos para un aprendiz específico.
 * 
 * @param {number} Id_Aprendiz - El ID del aprendiz para contar sus memorandos.
 * @returns {Promise<number>} - El total de memorandos del aprendiz.
 */
export const getTotalOtrosMemorandumsForAprendiz = async (Id_Aprendiz) => {
  try {
    return await OtrosMemorandumModel.count({
      where: { Referencia_Id: Id_Aprendiz }, // Filtra por el ID del aprendiz
    });
  } catch (error) {
    // Si ocurre un error, se registra el error y se lanza una excepción
    logger.error("Error obteniendo el total de memorandos: ", error);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

/**
 * Crear un nuevo memorando en la base de datos.
 * 
 * @param {Object} req - La solicitud HTTP que contiene los datos del nuevo memorando.
 * @param {Object} res - La respuesta HTTP.
 */
export const createOtroMemorandum = async (req, res) => {
  const transaction = await db.transaction(); // Inicia una transacción para asegurar la atomicidad
  try {
    const { Fec_OtroMemorando, Mot_OtroMemorando, Id_Aprendiz } = req.body;

    // Crea un nuevo memorando en la base de datos
    const newMemorandum = await OtrosMemorandumModel.create(
      {
        Fec_OtroMemorando,
        Mot_OtroMemorando,
        Referencia_Id: Id_Aprendiz,
      },
      {
        transaction, // Utiliza la transacción para garantizar la consistencia
      }
    );

    // Enviar un correo con la información del memorando
    emailMemorandos(newMemorandum);

    // Si la creación es exitosa, se confirma la transacción
    await transaction.commit();

    res.status(201).json({
      message: "Memorando creado exitosamente.",
      data: newMemorandum,
    });
  } catch (error) {
    // Si ocurre un error, se revierte la transacción y se maneja el error
    await transaction.rollback();
    logger.error("Error creando memorando: ", error);
    res.status(500).json({
      message: "Error al crear el memorando.",
    });
  }
};

// Función adicional que podrías agregar según los requisitos específicos
