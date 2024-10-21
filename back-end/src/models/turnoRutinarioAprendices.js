import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TurnoRutinarioModel from "./turnoRutinarioModel.js";
import ApprenticeModel from "./apprenticeModel.js";

const TurnoRutinarioAprendizModel = db.define(
  "turnosrutinarios_aprendices",
  {
    Id_TurnoRutinarioAprendiz: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Id_TurnoRutinario: {
      type: DataTypes.INTEGER,
      references: {
        model: TurnoRutinarioModel,
        key: "Id_TurnoRutinario",
      },
    },
    Id_Aprendiz: {
      type: DataTypes.STRING(11),
      references: {
        model: ApprenticeModel,
        key: "Id_Aprendiz",
      },
    },
    Ind_Asistencia :{
      type:DataTypes.ENUM('Si','No')
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  { freezeTableName: true }
);
export default TurnoRutinarioAprendizModel;
