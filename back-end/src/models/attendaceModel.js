import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AsistenciaModel = db.define(
  "asistencias",
  {
    Id_Asistencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Fec_Asistencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Mot_Asistencia: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Tip_Asistencia: {
      type: DataTypes.ENUM("incapacidad", "permiso", "calamidad"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default AsistenciaModel;
