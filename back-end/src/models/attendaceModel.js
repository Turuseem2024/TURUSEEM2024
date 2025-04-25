import db from "../database/db.js";
import { DataTypes } from "sequelize";

/**
 * Modelo de la tabla 'asistencias'.
 * 
 * Este modelo define la estructura de la tabla 'asistencias' en la base de datos utilizando Sequelize.
 * Cada fila de la tabla representa un registro de asistencia y contiene información como la fecha de
 * la asistencia, el motivo, el indicador de asistencia, y la relación con una posible inasistencia.
 * 
 * @returns {Model} - El modelo de Sequelize que representa la tabla 'asistencias'.
 */
const AsistenciaModel = db.define(
  "asistencias", // Nombre de la tabla en la base de datos
  {
    /**
     * Define el campo 'Id_Asistencia'.
     * 
     * Este campo es la clave primaria de la tabla y no se auto incrementa, lo que significa que debe
     * ser asignado manualmente al insertar un nuevo registro.
     */
    Id_Asistencia: {
      field: "Id_Asistencia", // Nombre del campo en la base de datos
      type: DataTypes.INTEGER, // Tipo de dato: Integer
      primaryKey: true, // Es la clave primaria
      autoIncrement: false, // No se auto incrementa
      allowNull: false, // Este campo no puede ser nulo
    },

    /**
     * Define el campo 'Fec_Asistencia'.
     * 
     * Este campo almacena la fecha de la asistencia y debe ser un valor no nulo.
     */
    Fec_Asistencia: {
      field: "Fec_Asistencia", // Nombre del campo en la base de datos
      type: DataTypes.DATEONLY, // Tipo de dato: Solo fecha (sin hora)
      allowNull: false, // Este campo no puede ser nulo
    },

    /**
     * Define el campo 'Mot_Asistencia'.
     * 
     * Este campo es opcional y puede almacenar una cadena de texto de hasta 255 caracteres.
     * Se usa para indicar el motivo de la asistencia, si está disponible.
     */
    Mot_Asistencia: {
      field: "Mot_Asistencia", // Nombre del campo en la base de datos
      type: DataTypes.STRING(255), // Tipo de dato: String de hasta 255 caracteres
      allowNull: true, // Este campo puede ser nulo
    },

    /**
     * Define el campo 'Ind_Asistencia'.
     * 
     * Este campo almacena el indicador de asistencia, que puede tener uno de dos valores: "SI" o "NO".
     * El campo no puede ser nulo, y su valor se almacena como una enumeración (ENUM).
     */
    Ind_Asistencia: {
      field: "Ind_Asistencia", // Nombre del campo en la base de datos
      type: DataTypes.ENUM("SI", "NO"), // Tipo de dato: Enumeración con los valores "SI" y "NO"
      allowNull: false, // Este campo no puede ser nulo
    },

    /**
     * Define el campo 'Id_Inasistencia'.
     * 
     * Este campo es opcional y almacena el identificador de una inasistencia asociada, si es aplicable.
     * Si no se asocia a una inasistencia, este campo puede ser nulo.
     */
    Id_Inasistencia: {
      field: "Id_Inasistencia", // Nombre del campo en la base de datos
      type: DataTypes.INTEGER, // Tipo de dato: Integer
      allowNull: true, // Este campo puede ser nulo
    },
  },
  {
    /**
     * Opciones de configuración del modelo.
     * 
     * - 'freezeTableName': Se asegura de que el nombre de la tabla en la base de datos sea exactamente
     *   el que se especifica, sin modificaciones automáticas por parte de Sequelize (como pluralizar).
     * - 'timestamps': Se desactiva el uso de las columnas 'createdAt' y 'updatedAt', ya que no se requieren
     *   en este modelo.
     */
    freezeTableName: true, // Desactiva la pluralización automática del nombre de la tabla
    timestamps: false, // Desactiva la generación automática de las columnas 'createdAt' y 'updatedAt'
  }
);

// Exportar el modelo de asistencia
export default AsistenciaModel;
