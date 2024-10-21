import db from "../database/db.js";
import { DataTypes } from "sequelize";
import FichasModel from "./fichasModel.js";
import cityModel from "./cityModel.js"

const ApprenticeModel = db.define(
  "aprendices",
  {
    Id_Aprendiz: { type: DataTypes.INTEGER, primaryKey: true },
    Nom_Aprendiz: { type: DataTypes.STRING(30) },
    Ape_Aprendiz: { type: DataTypes.STRING(30) },
    Id_Ficha: {
      type: DataTypes.STRING(11),
      references: {
        model: FichasModel,
        key: "Id_Ficha",
      },
    },
    Fec_Nacimiento: { type: DataTypes.DATE},
    Id_Ciudad:{type:DataTypes.STRING(10),
      references:{
        model: cityModel,
        key:'Id_Ciudad'
      }
    },
    Lugar_Residencia:{type:DataTypes.STRING(50)},
    Edad:{type:DataTypes.INTEGER},
    Hijos:{type:DataTypes.ENUM('Si','No')},
    Nom_Eps:{type:DataTypes.STRING(50)},
    Tel_Padre:{type:DataTypes.STRING(12)},
    Gen_Aprendiz: { type: DataTypes.ENUM('MAsculino','Femenino','Otro') },
    Cor_Aprendiz: { type: DataTypes.STRING(50) },
    Tel_Aprendiz: { type: DataTypes.STRING(12) },
    Tot_Memorandos: { type: DataTypes.INTEGER },
    Tot_Inasistencias: { type: DataTypes.INTEGER },
    Patrocinio: { type: DataTypes.ENUM("Si", "No") },
    Estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
    },
    Nom_Empresa: { type: DataTypes.STRING(50) },
    CentroConvivencia: { type: DataTypes.ENUM("Si", "No") },
    Foto_Aprendiz: { type: DataTypes.STRING(255), allowNull:true},
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
export default ApprenticeModel;
