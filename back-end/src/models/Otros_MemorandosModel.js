/**
 * @file Modelo de la tabla 'memorandos' para gestión de memorandos en la base de datos
 * @description Define la estructura, restricciones y relaciones del modelo de memorandos
 * @requires sequelize
 * @requires ../database/db.js
 * @requires ./turnoRutinarioModel.js
 */

// Importación de dependencias
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TurnosRutinariosModel from "../models/turnoRutinarioModel.js";

/**
 * @class MemorandoModel
 * @classdesc Modelo de Sequelize para la tabla 'memorandos' que almacena:
 * - ID único automático
 * - Fecha del memorando
 * - Motivo del memorando
 * - Estado (Activo/Inactivo)
 * - Relación con turnos rutinarios
 * - Timestamps automáticos
 */
const MemorandoModel = db.define(
  "memorandos",
  {
    /**
     * @member {Integer} Id_Memorando
     * @description Llave primaria autoincremental
     * @primaryKey
     * @autoIncrement
     */
    Id_Memorando: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    /**
     * @member {Date} Fec_Memorando
     * @description Fecha de emisión del memorando (formato: YYYY-MM-DD)
     * @required
     */
    Fec_Memorando: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    /**
     * @member {Enum} Mot_Memorando
     * @description Motivos predefinidos para el memorando:
     * - "Evacion de centro": Abandono no autorizado del centro
     * - "Comportamiento indebido": Conducta inapropiada
     * - "inasistencia a turno": Falta a turno asignado
     * - "inasistencia a centro": Falta general al centro
     * @required
     */
    Mot_Memorando: {
      type: DataTypes.ENUM(
        "Evacion de centro",
        "Comportamiento indebido",
        "inasistencia a turno",
        "inasistencia a centro"
      ),
      allowNull: false,
    },

    /**
     * @member {Enum} Est_Memorando
     * @description Estado actual del memorando:
     * - "ACTIVO": Vigente
     * - "INACTIVO": Archivado o resuelto
     * @required
     */
    Est_Memorando: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      allowNull: false,
    },

    /**
     * @member {Integer} Id_Turno
     * @description Llave foránea que relaciona con la tabla de turnos rutinarios
     * @foreignKey
     * @references turnosrutinarios.Id_Turno
     * @required
     */
    Id_Turno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TurnosRutinariosModel,
        key: "Id_Turno",
      },
    },
  },
  {
    // Configuraciones adicionales del modelo
    /**
     * @config {Object} Opciones del modelo
     * @prop {Boolean} freezeTableName Evita la pluralización automática del nombre de la tabla
     * @prop {Object} timestamps Habilita campos de timestamp automáticos
     * @prop {String} createdAt Nombre personalizado para el campo de creación
     * @prop {String} updatedAt Nombre personalizado para el campo de actualización
     */
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default MemorandoModel;