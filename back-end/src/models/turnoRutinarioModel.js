  import db from "../database/db.js";
  import { DataTypes } from "sequelize";
  import UnitModel from "./unitModel.js";
  import ApprenticeModel from "./apprenticeModel.js";

  const TurnosRutinariosModel = db.define(
    "turnosrutinarios",
    {
      Id_TurnoRutinario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Fec_InicioTurno: {
        type: DataTypes.DATE,
      },
      Fec_FinTurno: {
        type: DataTypes.DATE,
      },
      Hor_InicioTurno: {
        type: DataTypes.TIME,
      },
      Hor_FinTurno: {
        type: DataTypes.TIME,
      },
      Obs_TurnoRutinario: {
        type: DataTypes.STRING(100),
      },
      Ind_Asistencia: {
        type: DataTypes.ENUM("Si", "No"),
      },
      Id_Aprendiz: {
        type: DataTypes.STRING(11),
        references: {
          model: ApprenticeModel,
          key: "Id_Aprendiz",
        },
      },
      Id_Unidad: {
        type: DataTypes.INTEGER,
        references: {
          model: UnitModel,
          key: "Id_Unidad",
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    {
      freezeTableName: true,
    }
  );

  export default TurnosRutinariosModel;
