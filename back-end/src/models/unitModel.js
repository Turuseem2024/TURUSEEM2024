// Importación de la configuración de la base de datos establecida con Sequelize
import db from "../database/db.js";

// Importación del objeto DataTypes para definir los tipos de datos de los campos del modelo
import { DataTypes } from "sequelize";

// Importación del modelo de Área, para establecer la relación entre unidades y áreas
import AreaModel from "./areaModel.js";

// Definición del modelo 'UnitModel' que representa la tabla 'unidades' en la base de datos
const UnitModel = db.define(
  "unidades", // Nombre de la tabla en la base de datos
  {
    // Clave primaria de la unidad
    Id_Unidad: {
      type: DataTypes.INTEGER,     // Tipo de dato entero
      autoIncrement: true,         // Se incrementa automáticamente al insertar un nuevo registro
      primaryKey: true,            // Clave primaria de la tabla
      allowNull: false,            // No se permite valor nulo
    },

    // Nombre de la unidad
    Nom_Unidad: {
      type: DataTypes.STRING(100), // Cadena de texto con un máximo de 100 caracteres
      allowNull: false,            // Campo obligatorio
    },

    // Hora de apertura de la unidad
    Hora_Apertura: {
      type: DataTypes.TIME,        // Tipo de dato de hora (formato hh:mm:ss)
      allowNull: false,            // Campo obligatorio
    },

    // Hora de cierre de la unidad
    Hora_Cierre: {
      type: DataTypes.TIME,        // Tipo de dato de hora (formato hh:mm:ss)
      allowNull: false,            // Campo obligatorio
    },

    // Estado actual de la unidad: puede estar ACTIVO o INACTIVO
    Est_Unidad: {
      type: DataTypes.ENUM('ACTIVO', 'INACTIVO'), // Solo se permiten estos dos valores
      defaultValue: 'ACTIVO',    // Valor por defecto al crear un nuevo registro
      allowNull: false,          // Campo obligatorio
    },

    // Identificador del área a la que pertenece la unidad (clave foránea)
    Id_Area: {
      type: DataTypes.INTEGER,   // Tipo entero que hace referencia a otra tabla
      allowNull: false,          // Campo obligatorio
      references: {
        model: AreaModel,        // Modelo al que se hace referencia (áreas)
        key: "Id_Area",          // Campo del modelo referenciado
      },
    },
  },
  {
    timestamps: false,           // Evita que Sequelize añada automáticamente los campos createdAt y updatedAt
    freezeTableName: true,       // Impide que Sequelize pluralice el nombre de la tabla
  }
);

// Exportación del modelo para que pueda ser utilizado en otras partes del proyecto
export default UnitModel;
