import db from "../database/db.js"; // Importación de la conexión a la base de datos.
import { DataTypes } from "sequelize"; // Importación de tipos de datos de Sequelize.

 /**
  * Modelo de la tabla "areas" en la base de datos utilizando Sequelize.
  * 
  * Este modelo define la estructura de la tabla `areas` y sus columnas:
  * - `Id_Area`: La clave primaria de la tabla, de tipo entero, autoincrementable y no nula.
  * - `Nom_Area`: El nombre del área, de tipo cadena con un máximo de 100 caracteres, no nulo.
  * 
  * La configuración del modelo incluye:
  * - `freezeTableName: true`: Evita que Sequelize modifique el nombre de la tabla, asegurando que sea siempre `areas`.
  * - `timestamps: false`: Desactiva la creación automática de las columnas `createdAt` y `updatedAt` por parte de Sequelize.
  * 
  * Este modelo se utiliza para interactuar con la tabla `areas` en la base de datos, realizando operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
  * 
  * @returns {Model} El modelo `AreaModel` que representa la tabla `areas` en la base de datos.
  */
const AreaModel = db.define(
  "areas", // Nombre de la tabla en la base de datos
  {
    Id_Area: {
      type: DataTypes.INTEGER, // Tipo de datos de la columna (entero)
      primaryKey: true, // Marca esta columna como clave primaria
      autoIncrement: true, // Hace que el valor de esta columna se incremente automáticamente
      allowNull: false, // Indica que esta columna no puede ser nula
    },
    Nom_Area: {
      type: DataTypes.STRING(100), // Tipo de datos de la columna (cadena de texto de hasta 100 caracteres)
      allowNull: false, // Indica que esta columna no puede ser nula
    },
  },
  {
    freezeTableName: true, // Evita que Sequelize cambie el nombre de la tabla a plural
    timestamps: false, // Desactiva la creación automática de las columnas de tiempo (createdAt, updatedAt)
  }
);

export default AreaModel; // Exporta el modelo para su uso en otras partes de la aplicación.
