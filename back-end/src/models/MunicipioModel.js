// Importa el objeto 'db' para interactuar con la base de datos y el módulo 'DataTypes' de Sequelize
import db from "../database/db.js";  // Importa la configuración de la base de datos
import { DataTypes } from "sequelize";  // Importa los tipos de datos de Sequelize
import DepartamentoModel from "./DepartamentoModel.js";  // Importa el modelo de Departamento

// Definición del modelo Municipio
// Se crea el modelo 'MunicipioModel' que representa la tabla 'municipios' en la base de datos
const MunicipioModel = db.define(
  "municipios",  // Nombre de la tabla en la base de datos
  {
    // Definición de la columna 'Id_Municipio'
    // Esta columna es la clave primaria (primaryKey) y es autoincremental
    Id_Municipio: {
      type: DataTypes.INTEGER,  // Tipo de dato entero
      primaryKey: true,  // Define esta columna como la clave primaria
      autoIncrement: true,  // La columna será autoincremental (se asignará un valor único automáticamente)
      allowNull: false,  // No se permite que este campo sea nulo
    },

    // Definición de la columna 'Nom_Municipio'
    // Esta columna almacena el nombre del municipio, no puede ser nula
    Nom_Municipio: {
      type: DataTypes.STRING(100),  // Tipo de dato cadena de texto con un máximo de 100 caracteres
      allowNull: false,  // No se permite que este campo sea nulo
    },

    // Definición de la columna 'Id_Departamento'
    // Esta columna es una clave foránea que hace referencia al modelo 'DepartamentoModel'
    Id_Departamento: {
      type: DataTypes.INTEGER,  // Tipo de dato entero
      allowNull: false,  // No se permite que este campo sea nulo
      references: {
        model: DepartamentoModel,  // Define que esta columna hace referencia al modelo 'DepartamentoModel'
        key: "Id_Departamento",  // La clave foránea referencia la columna 'Id_Departamento' del modelo 'DepartamentoModel'
      },
    },
  },
  {
    timestamps: false,  // Desactiva los campos de 'createdAt' y 'updatedAt' (timestamps)
    freezeTableName: true,  // Evita que Sequelize cambie el nombre de la tabla a plural automáticamente
  }
);

// Exporta el modelo 'MunicipioModel' para que pueda ser utilizado en otras partes de la aplicación
export default MunicipioModel;
