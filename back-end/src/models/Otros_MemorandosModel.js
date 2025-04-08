import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TurnosRutinariosModel from "../models/turnoRutinarioModel.js"; // Asegúrate de tener este modelo creado correctamente

const MemorandoModel = db.define(
  "memorandos",
  {
    Id_Memorando: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Fec_Memorando: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Mot_Memorando: {
      type: DataTypes.ENUM(
        "Evacion de centro",
        "Comportamiento indebido",
        "inasistencia a turno",
        "inasistencia a centro"
      ),
      allowNull: false,
    },
    Est_Memorando: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      allowNull: false,
    },
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
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default MemorandoModel;
