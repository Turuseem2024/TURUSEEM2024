import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TurnoModel from "./turnoRutinarioModel.js"; // Asegúrate que este modelo exista y se llame así

const MemorandumModel = db.define(
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
        model: TurnoModel,
        key: "Id_Turno",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default MemorandumModel;
