import db from "../database/db.js";
import { DataTypes } from "sequelize";

const OfficialModel = db.define(
  "funcionarios",
  {
    Id_Funcionario: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
      allowNull: false,
    },
    Nom_Funcionario: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Ape_Funcionario: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Genero: {
      type: DataTypes.ENUM("Masculino", "Femenino"),
      allowNull: false,
    },
    Tel_Funcionario: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    Est_Funcionario: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
      allowNull: false,
    },
    Cor_Funcionarios: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Cargo_Funcionario: {
      type: DataTypes.ENUM("Planta", "Contratista"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default OfficialModel;
