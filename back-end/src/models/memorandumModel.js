import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AbsenceModel from "./absenceModel.js";

const MemorandumModel = db.define(
  "memorandos",
  {
    Id_Memorando: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_Memorando: { type: DataTypes.DATE },
    Mot_Memorando: { type: DataTypes.STRING(40) },
    Id_Inasistencia: {
      type: DataTypes.INTEGER,
      references: {
        model: AbsenceModel,
        key: "Id_Inasistencia",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  {
    freezeTableName: true,
  }
);

export default MemorandumModel;
