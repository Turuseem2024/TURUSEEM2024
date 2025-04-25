// Importación de las dependencias necesarias
import db from "../database/db.js"; // Importa la instancia de la base de datos
import { DataTypes } from "sequelize"; // Importa los tipos de datos de Sequelize
import FichasModel from "./fichasModel.js"; // Importa el modelo de fichas
import CityModel from "./cityModel.js"; // Importa el modelo de ciudades

/**
 * Modelo de datos para los aprendices.
 * Este modelo define la estructura de la tabla "aprendices" en la base de datos.
 * Contiene información personal y de contacto de los aprendices.
 */
const ApprenticeModel = db.define(
  "aprendices", // Nombre de la tabla en la base de datos
  {
    // Definición de los campos de la tabla "aprendices"
    Id_Aprendiz: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER
      primaryKey: true, // Define este campo como la clave primaria
      autoIncrement: true, // Este campo se autoincrementará con cada nuevo registro
    },
    Nom_Aprendiz: {
      type: DataTypes.STRING(100), // Tipo de dato STRING con longitud máxima de 100 caracteres
      allowNull: false, // Este campo no puede ser nulo
    },
    Ape_Aprendiz: {
      type: DataTypes.STRING(100), // Tipo de dato STRING con longitud máxima de 100 caracteres
      allowNull: false, // Este campo no puede ser nulo
    },
    Id_Ficha: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER
      allowNull: false, // Este campo no puede ser nulo
      references: {
        model: FichasModel, // Relacionado con el modelo FichasModel
        key: "Id_Ficha", // La clave foránea hace referencia a "Id_Ficha" del modelo "fichas"
      },
    },
    Fec_Nacimiento: {
      type: DataTypes.DATEONLY, // Tipo de dato DATEONLY (solo fecha, sin hora)
      allowNull: false, // Este campo no puede ser nulo
    },
    Id_Municipio: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER
      allowNull: false, // Este campo no puede ser nulo
      references: {
        model: CityModel, // Relacionado con el modelo CityModel
        key: "Id_Ciudad", // La clave foránea hace referencia a "Id_Ciudad" del modelo "city"
      },
    },
    Dir_Residencia: {
      type: DataTypes.STRING(200), // Tipo de dato STRING con longitud máxima de 200 caracteres
      allowNull: true, // Este campo es opcional
    },
    Edad_Aprendiz: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER
      allowNull: true, // Este campo es opcional
    },
    Hijos_Aprendiz: {
      type: DataTypes.ENUM('Si', 'No'), // Tipo de dato ENUM, solo puede ser 'Si' o 'No'
      allowNull: true, // Este campo es opcional
    },
    Nom_Eps: {
      type: DataTypes.STRING(100), // Tipo de dato STRING con longitud máxima de 100 caracteres
      allowNull: true, // Este campo es opcional
    },
    Tel_Acudiente: {
      type: DataTypes.STRING(20), // Tipo de dato STRING con longitud máxima de 20 caracteres
      allowNull: true, // Este campo es opcional
    },
    Gen_Aprendiz: {
      type: DataTypes.ENUM('Masculino', 'Femenino'), // Tipo de dato ENUM, solo puede ser 'Masculino' o 'Femenino'
      allowNull: true, // Este campo es opcional
    },
    Email_Aprendiz: {
      type: DataTypes.STRING(100), // Tipo de dato STRING con longitud máxima de 100 caracteres
      allowNull: true, // Este campo es opcional
    },
    Email_Institucional_Aprendiz: {
      type: DataTypes.STRING(100), // Tipo de dato STRING con longitud máxima de 100 caracteres
      allowNull: true, // Este campo es opcional
    },
    Tel_Aprendiz: {
      type: DataTypes.STRING(20), // Tipo de dato STRING con longitud máxima de 20 caracteres
      allowNull: true, // Este campo es opcional
    },
    Patrocinio: {
      type: DataTypes.ENUM('Si', 'No'), // Tipo de dato ENUM, solo puede ser 'Si' o 'No'
      allowNull: true, // Este campo es opcional
    },
    Nom_Empresa: {
      type: DataTypes.STRING(150), // Tipo de dato STRING con longitud máxima de 150 caracteres
      allowNull: true, // Este campo es opcional
    },
    Centro_Convivencia: {
      type: DataTypes.ENUM('Si', 'No'), // Tipo de dato ENUM, solo puede ser 'Si' o 'No'
      allowNull: true, // Este campo es opcional
    },
    Fot_Aprendiz: {
      type: DataTypes.STRING(255), // Tipo de dato STRING con longitud máxima de 255 caracteres (para almacenar la ruta de la foto)
      allowNull: true, // Este campo es opcional
    },
  },
  {
    timestamps: false, // Desactiva los campos 'createdAt' y 'updatedAt'
    freezeTableName: true, // Evita que Sequelize cambie el nombre de la tabla (será exactamente "aprendices")
  }
);

// Exporta el modelo para su uso en otras partes de la aplicación
export default ApprenticeModel;
