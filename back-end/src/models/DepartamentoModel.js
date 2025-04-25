// Importación de la conexión a la base de datos y DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Definición del modelo "Departamento" utilizando Sequelize
const DepartamentoModel = db.define(
  "departamentos", // Nombre de la tabla en la base de datos
  {
    // Definición de los atributos (columnas) del modelo
    Id_Departamento: {
      type: DataTypes.INTEGER, // Tipo de dato entero para la columna Id_Departamento
      primaryKey: true, // Define esta columna como la clave primaria de la tabla
      autoIncrement: true, // Se establece como autoincrementable, para que se incremente automáticamente
      allowNull: false, // No permite valores nulos para esta columna
    },
    Nom_Departamento: {
      type: DataTypes.STRING(100), // Tipo de dato cadena de texto, con longitud máxima de 100 caracteres
      allowNull: false, // No permite valores nulos para esta columna
    },
  },
  {
    // Opciones adicionales para la configuración del modelo
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false, // Desactiva los campos 'createdAt' y 'updatedAt' que se crean automáticamente
  }
);

// Exportación del modelo para que pueda ser utilizado en otras partes del proyecto
export default DepartamentoModel;
