import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AreaModel from "./areaModel.js";

const ProgramaModel = db.define(
  "programas",
  {
    Id_Programa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Nom_Programa: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Tip_Programa: {
      type: DataTypes.ENUM("TECNICO", "TECNOLOGO"),
      allowNull: false,
    },
    Est_Programa: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      allowNull: false,
    },
    Id_Area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AreaModel,
        key: "Id_Area",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ProgramaModel;
