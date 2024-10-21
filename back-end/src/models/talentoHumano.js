import db from "../database/db.js";
import { DataTypes } from "sequelize";
import FichasModel from "./fichasModel.js";

const TalentoHumanoModel = db.define(
  "talento_humano",
  {
    Id_Talento_Humano: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    Nom_Talento_Humano: {
      type: DataTypes.STRING(30),
    },
    Ape_Talento_Humano: {
      type: DataTypes.STRING(30),
    },
    Genero_Talento_Humano: {
      type: DataTypes.ENUM("Masculino", "Femenino", "Otro"), // Assuming 'M', 'F', 'O' are the possible values
    },
    Cor_Talento_Humano: {
      type: DataTypes.STRING(30),
    },
    Tel_Talento_Humano: {
      type: DataTypes.STRING(12),
    },
    Id_Ficha: {
      type: DataTypes.INTEGER,
      references: {
        model: FichasModel,
        key: "Id_Ficha",
      },
    },
    Estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default TalentoHumanoModel;