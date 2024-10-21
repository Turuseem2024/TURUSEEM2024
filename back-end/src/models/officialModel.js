import db from "../database/db.js";
import { DataTypes } from "sequelize";

const OfficialModel = db.define(
  "funcionarios",
  {
    Id_Funcionario: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
    },
    Nom_Funcionario: {
      type: DataTypes.STRING(25),
    },
    Ape_Funcionario: {
      type: DataTypes.STRING(25),
    },
    Genero: {
      type: DataTypes.ENUM('Masculino','Femenino','Otro'),
    },
    Tel_Funcionario: {
      type: DataTypes.STRING(12),
    },
    Estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
    },
    Cargo: {
      type: DataTypes.ENUM("Planta", "Contratista"),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
  
);

export default OfficialModel;