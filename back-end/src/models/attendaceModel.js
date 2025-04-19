import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AsistenciaModel = db.define(
  "asistencias",
  {
    Id_Asistencia: {
      field: "Id_Asistencia",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    Fec_Asistencia: {
      field: "Fec_Asistencia",
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Mot_Asistencia: {
      field: "Mot_Asistencia",
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Ind_Asistencia: {
      field: "Ind_Asistencia",
      type: DataTypes.ENUM("SI", "NO"),
      allowNull: false,
    },
    Id_Inasistencia: {
      field: "Id_Inasistencia",
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default AsistenciaModel;