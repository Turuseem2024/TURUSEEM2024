import db from "../database/db.js";
import { DataTypes } from "sequelize";
import FichasModel from "./fichasModel.js";
import CityModel from "./cityModel.js";

const ApprenticeModel = db.define(
  "aprendices",
  {
    Id_Aprendiz: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nom_Aprendiz: { type: DataTypes.STRING(100), allowNull: false },
    Ape_Aprendiz: { type: DataTypes.STRING(100), allowNull: false },
    Id_Ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FichasModel,
        key: "Id_Ficha",
      },
    },
    Fec_Nacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    Id_Municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CityModel,
        key: "Id_Ciudad", // Asegúrate de que esta clave coincida con el modelo real
      },
    },
    Dir_Residencia: { type: DataTypes.STRING(200), allowNull: true },
    Edad_Aprendiz: { type: DataTypes.INTEGER, allowNull: true },
    Hijos_Aprendiz: { type: DataTypes.ENUM('Si', 'No'), allowNull: true },
    Nom_Eps: { type: DataTypes.STRING(100), allowNull: true },
    Tel_Acudiente: { type: DataTypes.STRING(20), allowNull: true },
    Gen_Aprendiz: { type: DataTypes.ENUM('Masculino', 'Femenino'), allowNull: true },
    Email_Aprendiz: { type: DataTypes.STRING(100), allowNull: true },
    Email_Institucional_Aprendiz: { type: DataTypes.STRING(100), allowNull: true },
    Tel_Aprendiz: { type: DataTypes.STRING(20), allowNull: true },
    Patrocinio: { type: DataTypes.ENUM('Si', 'No'), allowNull: true },
    Nom_Empresa: { type: DataTypes.STRING(150), allowNull: true },
    Centro_Convivencia: { type: DataTypes.ENUM('Si', 'No'), allowNull: true },
    Fot_Aprendiz: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ApprenticeModel;
