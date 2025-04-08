import db from "../database/db.js";
import { DataTypes } from "sequelize";
import FichasModel from "./fichasModel.js";
import UnitModel from "./unitModel.js";
import OfficialModel from "./officialModel.js";

const TurnoEspecialModel = db.define(
  "turnos_especiales",
  {
    Id_Turno_Especial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Id_Funcionario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OfficialModel,
        key: "Id_Funcionario",
      },
    },
    Id_Ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FichasModel,
        key: "Id_Ficha",
      },
    },
    Id_Unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    freezeTableName: true,
  }
);

export default TurnoEspecialModel;
