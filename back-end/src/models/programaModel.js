import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AreaModel from "./areaModel.js";

const ProgramaModel = db.define(
  "programasformacion",
  {
    Id_ProgramaFormacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement:true,
    },
    Nom_ProgramaFormacion: { type: DataTypes.STRING(65) },
    Tip_ProgramaFormacion: { type: DataTypes.ENUM('Tecnologo') },
    Id_Area: {
      type: DataTypes.INTEGER,
      references: AreaModel,
      key: "Id_Area",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default ProgramaModel;
