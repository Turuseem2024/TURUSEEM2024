import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AreaModel = db.define(
  "areas",
  {
    Id_Area: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Nom_Area: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default AreaModel;
