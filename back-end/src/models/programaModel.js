// Importación de la instancia de conexión a la base de datos desde el archivo 'db.js'
import db from "../database/db.js";

// Importación de los tipos de datos disponibles en Sequelize
import { DataTypes } from "sequelize";

// Importación del modelo AreaModel, para establecer la relación foránea entre programas y áreas
import AreaModel from "./areaModel.js";

// Definición del modelo 'ProgramaModel' que representa la tabla 'programas' en la base de datos
const ProgramaModel = db.define(
  "programas", // Nombre de la tabla en la base de datos
  {
    // Clave primaria del programa
    Id_Programa: {
      type: DataTypes.INTEGER, // Tipo entero
      primaryKey: true,        // Define esta columna como clave primaria
      allowNull: false,        // No se permite valor nulo
      autoIncrement: true,     // Valor autoincremental
    },
    // Nombre del programa
    Nom_Programa: {
      type: DataTypes.STRING(100), // Cadena de texto con un máximo de 100 caracteres
      allowNull: false,            // No se permite valor nulo
    },
    // Tipo del programa (TECNICO o TECNOLOGO)
    Tip_Programa: {
      type: DataTypes.ENUM("TECNICO", "TECNOLOGO"), // Solo se permiten estos dos valores
      allowNull: false,                             // No se permite valor nulo
    },
    // Estado del programa (ACTIVO o INACTIVO)
    Est_Programa: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"), // Solo se permiten estos dos valores
      allowNull: false,                           // No se permite valor nulo
    },
    // Clave foránea que relaciona este programa con un área específica
    Id_Area: {
      type: DataTypes.INTEGER, // Tipo entero
      allowNull: false,        // No se permite valor nulo
      references: {
        model: AreaModel,      // Se referencia al modelo 'AreaModel'
        key: "Id_Area",        // Se enlaza a la columna 'Id_Area' de la tabla 'areas'
      },
    },
  },
  {
    timestamps: false,       // No se generarán automáticamente las columnas createdAt y updatedAt
    freezeTableName: true,   // El nombre de la tabla se usará tal como está definido ('programas'), sin pluralizar
  }
);

// Exportación del modelo para poder ser utilizado en otras partes del proyecto
export default ProgramaModel;
