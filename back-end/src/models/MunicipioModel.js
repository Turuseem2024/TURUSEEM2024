import db from "../database/db.js";
import { DataTypes } from "sequelize";
import DepartamentoModel from "./DepartamentoModel.js";

const MunicipioModel = db.define(
  "municipios",
  {
    Id_Municipio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Nom_Municipio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Id_Departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DepartamentoModel,
        key: "Id_Departamento",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default MunicipioModel;
