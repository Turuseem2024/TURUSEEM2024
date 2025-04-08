import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AreaModel from "./areaModel.js";

const AreaAAreaModel = db.define(
  "areas_a_areas",
  {
    Id_Area_A_Area: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    Area_Asignada: {
      type: DataTypes.ENUM(
        "AGRICOLA",
        "AGROINDUSTRIA",
        "GESTION AMBIENTAL",
        "GESTION ADMINISTRATIVA",
        "MECANIZACION",
        "PECUARIA"
      ),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default AreaAAreaModel;
