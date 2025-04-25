// Importa la configuración de la base de datos desde el archivo correspondiente
import db from "../database/db.js";

// Importa el tipo de datos de Sequelize para definir los campos del modelo
import { DataTypes } from "sequelize";

// Importa el modelo de 'fichas' para establecer la relación entre tablas
import FichasModel from "./fichasModel.js";

// Define el modelo 'TalentoHumanoModel' que representa la tabla 'talento_humano' en la base de datos
const TalentoHumanoModel = db.define(
  "talento_humano", // Nombre exacto de la tabla en la base de datos
  {
    // Identificador principal del registro de talento humano
    Id_Talento_Humano: {
      type: DataTypes.STRING(10), // Tipo cadena con un máximo de 10 caracteres
      primaryKey: true,           // Clave primaria
    },

    // Nombre del talento humano
    Nom_Talento_Humano: {
      type: DataTypes.STRING(30), // Tipo cadena con un máximo de 30 caracteres
    },

    // Apellido del talento humano
    Ape_Talento_Humano: {
      type: DataTypes.STRING(30), // Tipo cadena con un máximo de 30 caracteres
    },

    // Género del talento humano. Solo se permiten los valores: "Masculino", "Femenino" u "Otro"
    Genero_Talento_Humano: {
      type: DataTypes.ENUM("Masculino", "Femenino", "Otro"), // Enumeración restringida a 3 valores posibles
    },

    // Correo electrónico del talento humano
    Cor_Talento_Humano: {
      type: DataTypes.STRING(30), // Tipo cadena con un máximo de 30 caracteres
    },

    // Teléfono del talento humano
    Tel_Talento_Humano: {
      type: DataTypes.STRING(12), // Tipo cadena con un máximo de 12 caracteres (ideal para incluir guiones o espacios)
    },

    // Identificador de la ficha asociada al talento humano
    Id_Ficha: {
      type: DataTypes.INTEGER, // Tipo entero
      references: {
        model: FichasModel,     // Modelo al que hace referencia (relación foránea)
        key: "Id_Ficha",        // Campo del modelo referenciado
      },
    },

    // Estado del registro del talento humano. Puede ser "Activo" o "Inactivo"
    Estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"), // Enumeración con dos posibles valores
    },
  },
  {
    // Opciones de configuración adicionales para el modelo
    freezeTableName: true,     // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: true,          // Agrega automáticamente campos de fecha de creación y actualización
    createdAt: "created_at",   // Renombra el campo de creación al formato personalizado
    updatedAt: "updated_at",   // Renombra el campo de actualización al formato personalizado
  }
);

// Exporta el modelo para que pueda ser utilizado en otros archivos del proyecto
export default TalentoHumanoModel;
