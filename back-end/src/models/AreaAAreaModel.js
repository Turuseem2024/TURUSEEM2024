// Se importa el objeto `db` que contiene la configuración de la conexión a la base de datos.
import db from "../database/db.js";
// Se importa el tipo `DataTypes` desde Sequelize para definir los tipos de las columnas en el modelo.
import { DataTypes } from "sequelize";
// Se importa el modelo `AreaModel` para usarlo como referencia en la columna `Id_Area`.
import AreaModel from "./areaModel.js";

/**
 * Definición del modelo 'areas_a_areas' utilizando Sequelize.
 * 
 * Este modelo representa una relación entre áreas, donde cada entrada
 * asociará una área con un área asignada específica (Agrícola, Agroindustria, etc.).
 * 
 * @returns {Model} El modelo de la tabla `areas_a_areas` en la base de datos.
 */
const AreaAAreaModel = db.define(
  "areas_a_areas", // Nombre de la tabla en la base de datos.
  {
    // Definición de la columna `Id_Area_A_Area` como la clave primaria y autoincrementable.
    Id_Area_A_Area: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER.
      primaryKey: true, // Define esta columna como la clave primaria.
      autoIncrement: true, // Habilita el autoincremento para esta columna.
      allowNull: false, // No permite valores nulos en esta columna.
    },
    // Definición de la columna `Id_Area`, que es una clave foránea que hace referencia a `AreaModel`.
    Id_Area: {
      type: DataTypes.INTEGER, // Tipo de dato INTEGER.
      allowNull: false, // No permite valores nulos en esta columna.
      references: {
        model: AreaModel, // Hace referencia al modelo `AreaModel`.
        key: "Id_Area", // La clave foránea hace referencia a la columna `Id_Area` en el modelo `AreaModel`.
      },
    },
    // Definición de la columna `Area_Asignada`, que es un ENUM con varios valores posibles.
    Area_Asignada: {
      type: DataTypes.ENUM(
        "AGRICOLA",
        "AGROINDUSTRIA",
        "GESTION AMBIENTAL",
        "GESTION ADMINISTRATIVA",
        "MECANIZACION AGRICOLA",
        "PECUARIA"
      ), // Tipo de dato ENUM con opciones predefinidas.
      allowNull: false, // No permite valores nulos en esta columna.
    },
  },
  {
    freezeTableName: true, // Evita que Sequelize modifique el nombre de la tabla (se usará el nombre exacto 'areas_a_areas').
    timestamps: false, // Desactiva los campos `createdAt` y `updatedAt` en la tabla (no se requieren en este caso).
  }
);

// Se exporta el modelo para su uso en otras partes de la aplicación.
export default AreaAAreaModel;
