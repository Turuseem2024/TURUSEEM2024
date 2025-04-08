import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ProgramaModel from "./programaModel.js";

const FichasModel = db.define(
  "fichas",
  {
    Id_Ficha: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    Fec_Inicio_Etapa_lectiva: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Fec_Fin_Etapa_lectiva: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Can_Aprendices: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Est_Fichas: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      allowNull: false,
    },
    Id_Programa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProgramaModel,
        key: "Id_Programa",
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

export default FichasModel;
