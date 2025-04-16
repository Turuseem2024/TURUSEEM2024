import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AsistenciaModel = db.define(
  "asistencias",
  {
    Id_Asistencia: {
      field: "Id_Asistencia",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,  // El id no es auto incremental
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
    Tip_Asistencia: {
      field: "Tip_Asistencia",
      type: DataTypes.ENUM("incapacidad", "permiso", "calamidad"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default AsistenciaModel;
