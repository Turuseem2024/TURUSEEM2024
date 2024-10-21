import db from "../database/db.js";
import { DataTypes } from "sequelize";

const OtrosMemorandumModel = db.define(
  "otros_memorandos",
  {
    Id_OtroMemorando: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_OtroMemorando: {
      type: DataTypes.DATE,
      allowNull: false, // Asegurarse de que este campo no sea nulo
    },
    Mot_OtroMemorando: {
      type: DataTypes.STRING(255), // Tamaño cambiado a 255 para coincidir con la tabla
      allowNull: false, // Asegurarse de que este campo no sea nulo
    },
    ENVIADO: {
      type: DataTypes.BOOLEAN
    },
    Referencia_Id: { 
      type: DataTypes.INTEGER, // Ahora es un campo de entero, sin referencias explícitas
      allowNull: true, // Manteniendo el valor por defecto NULL
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true, // Para asegurarte de que el nombre de la tabla no sea pluralizado
  }
);

export default OtrosMemorandumModel;