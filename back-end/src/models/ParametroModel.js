// Importa la instancia de conexión a la base de datos configurada en el archivo db.js
import db from "../database/db.js";

// Importa los tipos de datos disponibles desde Sequelize
import { DataTypes } from "sequelize";

/**
 * Definición del modelo `ParametroModel` para interactuar con la tabla `parametros`.
 * Esta tabla se utiliza para almacenar distintos tipos de parámetros configurables
 * por el usuario del sistema, como textos, tiempos, números, etc.
 */
const ParametroModel = db.define(
  "parametros", // Nombre de la tabla en la base de datos
  {
    /**
     * Clave primaria del parámetro.
     * Se incrementa automáticamente con cada nuevo registro.
     */
    Id_Parametro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    /**
     * ID del usuario que creó o administra este parámetro.
     * Se asume que existe una relación lógica con una tabla de usuarios.
     */
    Id_User: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    /**
     * Nombre del parámetro.
     * Es un texto corto y descriptivo (máximo 100 caracteres).
     */
    Nom_Parametro: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    /**
     * Valor asignado al parámetro.
     * Puede representar cualquier tipo de contenido según el tipo de parámetro.
     */
    Val_Parametro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    /**
     * Descripción opcional del parámetro.
     * Campo de texto libre que puede contener explicaciones más detalladas.
     */
    Des_Parametro: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /**
     * Tipo del parámetro, que define la naturaleza del valor:
     * - TIEMPO: probablemente un valor relacionado con fechas o duración.
     * - TEXTO: una cadena simple.
     * - NUMERO: un valor numérico.
     * - BOOLEAN: verdadero o falso.
     * - ENUM: un valor entre varias opciones fijas.
     */
    Tip_Parametro: {
      type: DataTypes.ENUM('TIEMPO', 'TEXTO', 'NUMERO', 'BOOLEAN', 'ENUM'),
      allowNull: false,
    },

    /**
     * Estado actual del parámetro.
     * Puede estar 'ACTIVO' o 'INACTIVO'.
     */
    Est_Parametro: {
      type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
      allowNull: false,
    },

    /**
     * Fecha en que se creó el parámetro.
     * No se actualiza automáticamente, se espera que sea manejado manualmente.
     */
    Fecha_Creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    /**
     * Fecha de la última modificación del parámetro.
     * Tampoco se actualiza automáticamente por Sequelize.
     */
    Fecha_Actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Desactiva el manejo automático de timestamps por Sequelize
    timestamps: false,

    // Evita que Sequelize pluralice el nombre de la tabla
    freezeTableName: true,
  }
);

// Exporta el modelo para su uso en otras partes de la aplicación
export default ParametroModel;
