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
      allowNull: false,
    },
    Nom_Unidad: {
      type: DataTypes.STRING(100),  // Ajustado a 100 caracteres según la tabla
      allowNull: false,
    },
    Hora_Apertura: {
      type: DataTypes.TIME,  // Tipo TIME para la hora de apertura
      allowNull: false,
    },
    Hora_Cierre: {
      type: DataTypes.TIME,  // Tipo TIME para la hora de cierre
      allowNull: false,
    },
    Est_Unidad: {
      type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),  // Enum con valores en mayúsculas según la tabla
      defaultValue: 'ACTIVO',
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
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,  // Evita que Sequelize modifique el nombre de la tabla
  }
);

export default UnitModel;
