import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AreaModel from "./areaModel.js";

const UnitModel = db.define(
  "unidades",
  {
    Id_Unidad: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // Habilita el autoincremento
      primaryKey: true,
    },
    Nom_Unidad: {
      type: DataTypes.STRING(50),  // Define el tamaño máximo como 50 caracteres
    },
    Hor_Apertura: {
      type: DataTypes.TIME,  // Tipo TIME para la hora de apertura
    },
    Hor_Cierre: {
      type: DataTypes.TIME,  // Tipo TIME para la hora de cierre
    },
    Estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),  // Tipo ENUM para el estado
    },
    Id_Area: {
      type: DataTypes.INTEGER,
      references: {
        model: AreaModel,
        key: "Id_Area",
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

export default UnitModel;
