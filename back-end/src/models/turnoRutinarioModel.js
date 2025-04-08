import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AsistenciaModel from "./attendaceModel.js";
import TurnoEspecialModel from "./turnoEspecialModel.js";
import AprendizModel from "./apprenticeModel.js";

const TurnoModel = db.define(
  "turnos",
  {
    Id_Turno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Fec_Inicio_Turno: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Fec_Fin_Turno: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Hor_Inicio_Turno: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    Hor_Fin_Turno: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    Obs_Turno: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Id_Asistencia: {
      type: DataTypes.INTEGER,
      references: {
        model: AsistenciaModel,
        key: "Id_Asistencia",
      },
      allowNull: true,
    },
    Tip_Turno: {
      type: DataTypes.ENUM("Especial", "Rutinario"),
      allowNull: false,
    },
    Id_Turno_Especial: {
      type: DataTypes.INTEGER,
      references: {
        model: TurnoEspecialModel,
        key: "Id_Turno_Especial",
      },
      allowNull: true,
    },
    Id_Aprendiz: {
      type: DataTypes.INTEGER,
      references: {
        model: AprendizModel,
        key: "Id_Aprendiz",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default TurnoModel;
