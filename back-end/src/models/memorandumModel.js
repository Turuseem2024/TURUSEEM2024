// Importamos la configuración de la base de datos y el modelo TurnoRutinario.
import db from "../database/db.js"; // Base de datos de configuración.
import { DataTypes } from "sequelize"; // Importamos el tipo DataTypes de Sequelize para definir los tipos de datos de los campos.
import TurnoModel from "./turnoRutinarioModel.js"; // Importamos el modelo de TurnoRutinario. Asegúrate que este modelo exista y se llame correctamente.

// Definición del modelo MemorandumModel para la tabla 'memorandos'.
const MemorandumModel = db.define(
  "memorandos", // Nombre de la tabla en la base de datos (en plural).
  {
    // Definición de los campos de la tabla 'memorandos'.
    Id_Memorando: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER.
      primaryKey: true, // Indica que es la clave primaria.
      autoIncrement: true, // El valor de este campo se incrementa automáticamente.
      allowNull: false, // No puede ser nulo.
    },
    Fec_Memorando: {
      type: DataTypes.DATEONLY, // Tipo de dato DATEONLY (solo fecha).
      allowNull: false, // No puede ser nulo.
    },
    Mot_Memorando: {
      type: DataTypes.ENUM( // Tipo de dato ENUM, solo permite valores predefinidos.
        "Evacion de centro", // Opciones para este campo.
        "Comportamiento indebido",
        "inasistencia a turno",
        "inasistencia a centro"
      ),
      allowNull: false, // No puede ser nulo.
    },
    Est_Memorando: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"), // Campo de tipo ENUM para estado activo o inactivo.
      allowNull: false, // No puede ser nulo.
    },
    Id_Turno: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER.
      allowNull: false, // No puede ser nulo.
      references: {
        model: TurnoModel, // Este campo hace referencia al modelo TurnoModel.
        key: "Id_Turno", // La clave que se referencia es 'Id_Turno' del modelo TurnoModel.
      },
    },
  },
  {
    // Configuración adicional para el modelo.
    timestamps: true, // Habilita los campos de tiempo (createdAt y updatedAt).
    createdAt: "created_at", // Personaliza el nombre del campo para la fecha de creación.
    updatedAt: "updated_at", // Personaliza el nombre del campo para la fecha de actualización.
    freezeTableName: true, // Impide que Sequelize modifique el nombre de la tabla.
  }
);

// Exportamos el modelo MemorandumModel para que sea utilizado en otras partes del código.
export default MemorandumModel;
