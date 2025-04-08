import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ParametroModel = db.define(
  "parametros",
  {
    Id_Parametro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Id_User: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Nom_Parametro: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Val_Parametro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Des_Parametro: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Tip_Parametro: {
      type: DataTypes.ENUM('TIEMPO', 'TEXTO', 'NUMERO', 'BOOLEAN', 'ENUM'),
      allowNull: false,
    },
    Est_Parametro: {
      type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
      allowNull: false,
    },
    Fecha_Creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Fecha_Actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ParametroModel;
