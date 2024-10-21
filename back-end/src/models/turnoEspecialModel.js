import db from "../database/db.js";
import { DataTypes } from "sequelize";
import FichasModel from "./fichasModel.js";
import UnitModel from "./unitModel.js";
import OfficialModel from "./officialModel.js";

const TurnoEspecialModel = db.define(
  "turnosespeciales",
  {
    Id_TurnoEspecial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Fec_TurnoEspecial: { type: DataTypes.DATE },
    Hor_Inicio: { type: DataTypes.TIME },
    Hor_Fin: { type: DataTypes.TIME },
    Obs_TurnoEspecial: { type: DataTypes.STRING(100) },
    Tot_AprendicesAsistieron: { type: DataTypes.STRING(10) },
    Id_Ficha: {
      type: DataTypes.STRING(11),
      references: {
        model: FichasModel,
        key: "Id_Ficha",
      },
    },
    Img_Asistencia: { type: DataTypes.STRING(50) },
    Id_Funcionario: {
      type: DataTypes.STRING(11),
      references: {
        model: OfficialModel,
        key: "Id_Funcionario",
      },
    },
    Id_Unidad: {
      type: DataTypes.INTEGER,
      references: {
        model: UnitModel,
        key: "Id_Unidad",
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
export default TurnoEspecialModel;