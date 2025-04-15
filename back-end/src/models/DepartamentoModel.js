import db from "../database/db.js";
import { DataTypes } from "sequelize";

const DepartamentoModel = db.define(
  "departamentos",
  {
    Id_Departamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Cambiado a true para que sea autoincremental
      allowNull: false,
    },
    Nom_Departamento: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default DepartamentoModel;