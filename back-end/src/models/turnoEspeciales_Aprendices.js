import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TurnoEspecialModel from "./turnoEspecialModel.js";
import ApprenticeModel from "./apprenticeModel.js";

const TurnoEspecialAprendizModel = db.define(
  "turnosespeciales_aprendices",
  {
    Id_TurnoEspecial_Aprendiz: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Id_TurnoEspecial: {
      type: DataTypes.INTEGER,
      references: {
        model: TurnoEspecialModel,
        key: "Id_TurnoEspecial",
      },
    },
    Id_Aprendiz: {
      type: DataTypes.STRING(11),
      references: {
        model: ApprenticeModel,
        key: "Id_Aprendiz",
      },
    },
    Ind_Asistencia: {
      type: DataTypes.ENUM("Si", "No"),
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true, 
  }
);

export default TurnoEspecialAprendizModel;
