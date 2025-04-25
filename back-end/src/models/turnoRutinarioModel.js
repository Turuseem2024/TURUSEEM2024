// Importamos la instancia de la base de datos configurada con Sequelize
import db from "../database/db.js";

// Importamos el tipo de datos que proporciona Sequelize
import { DataTypes } from "sequelize";

// Importamos los modelos relacionados que serán usados en claves foráneas
import AsistenciaModel from "./attendaceModel.js";       // Modelo de asistencia
import TurnoEspecialModel from "./turnoEspecialModel.js"; // Modelo de turnos especiales
import AprendizModel from "./apprenticeModel.js";         // Modelo de aprendices

/**
 * Definición del modelo "TurnoModel" que representa la tabla "turnos" en la base de datos.
 * Este modelo almacena información sobre los turnos asignados a los aprendices,
 * pudiendo ser turnos rutinarios o especiales.
 */
const TurnoModel = db.define(
  "turnos", // Nombre de la tabla
  {
    // Clave primaria del turno
    Id_Turno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Incrementa automáticamente con cada nuevo registro
      allowNull: false,
    },

    // Fecha de inicio del turno
    Fec_Inicio_Turno: {
      type: DataTypes.DATEONLY, // Solo fecha (sin hora)
      allowNull: false,
    },

    // Fecha de finalización del turno
    Fec_Fin_Turno: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    // Hora de inicio del turno
    Hor_Inicio_Turno: {
      type: DataTypes.TIME, // Solo hora (sin fecha)
      allowNull: false,
    },

    // Hora de finalización del turno
    Hor_Fin_Turno: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    // Observaciones generales sobre el turno (opcional)
    Obs_Turno: {
      type: DataTypes.STRING(255), // Cadena de texto de hasta 255 caracteres
      allowNull: true,
    },

    // Clave foránea opcional que referencia a la tabla de asistencias
    Id_Asistencia: {
      type: DataTypes.INTEGER,
      references: {
        model: AsistenciaModel, // Modelo de asistencia
        key: "Id_Asistencia",   // Campo referenciado en la tabla
      },
      allowNull: true,
    },

    // Tipo de turno: puede ser "Especial" o "Rutinario"
    Tip_Turno: {
      type: DataTypes.ENUM("Especial", "Rutinario"),
      allowNull: false,
    },

    // Clave foránea opcional que referencia al turno especial
    Id_Turno_Especial: {
      type: DataTypes.INTEGER,
      references: {
        model: TurnoEspecialModel, // Modelo de turno especial
        key: "Id_Turno_Especial",
      },
      allowNull: true,
    },

    // Clave foránea que referencia al aprendiz al que se le asigna el turno
    Id_Aprendiz: {
      type: DataTypes.INTEGER,
      references: {
        model: AprendizModel, // Modelo de aprendiz
        key: "Id_Aprendiz",
      },
      allowNull: false,
    },
  },
  {
    // Configuración adicional del modelo

    // Sequelize agregará automáticamente los campos de timestamps
    timestamps: true,

    // Personalizamos los nombres de los campos de timestamps
    createdAt: "created_at",
    updatedAt: "updated_at",

    // Evita que Sequelize pluralice automáticamente el nombre de la tabla
    freezeTableName: true,
  }
);

// Exportamos el modelo para su uso en otras partes de la aplicación
export default TurnoModel;
