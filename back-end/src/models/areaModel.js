import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AreaModel = db.define(
  "areas",
  {
    Id_Area: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
    Nom_Area: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);
export default AreaModel;
