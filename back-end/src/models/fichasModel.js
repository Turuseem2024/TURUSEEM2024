// Importamos la conexión a la base de datos y los tipos de datos necesarios de Sequelize.
import db from "../database/db.js"; // Importa la instancia de conexión a la base de datos.
import { DataTypes } from "sequelize"; // Importa los tipos de datos de Sequelize, necesarios para definir los modelos.
import ProgramaModel from "./programaModel.js"; // Importa el modelo de la tabla "programas", usado como clave foránea en el modelo "fichas".

/**
 * Modelo Fichas: Define la estructura y reglas de la tabla "fichas" en la base de datos.
 *
 * Este modelo contiene información sobre las fichas formativas, incluyendo:
 * - El identificador de la ficha.
 * - Las fechas de inicio y fin de la etapa lectiva.
 * - La cantidad de aprendices en la ficha.
 * - El estado de la ficha (activo o inactivo).
 * - La relación con el programa al que pertenece la ficha.
 * 
 * Sequelize es utilizado como ORM para interactuar con la base de datos de manera más eficiente.
 */
const FichasModel = db.define(
  "fichas", // Nombre de la tabla en la base de datos.
  {
    // Definición de los atributos de la tabla "fichas".

    // Id_Ficha: El identificador único de la ficha.
    // Se establece como la clave primaria (primaryKey) y no se autoincrementa.
    Id_Ficha: {
      type: DataTypes.INTEGER, // Tipo de datos: número entero.
      primaryKey: true, // Indica que es la clave primaria de la tabla.
      autoIncrement: false, // No se autoincrementa, ya que es proporcionado manualmente.
      allowNull: false, // No puede ser nulo.
    },

    // Fec_Inicio_Etapa_lectiva: Fecha de inicio de la etapa lectiva.
    Fec_Inicio_Etapa_lectiva: {
      type: DataTypes.DATEONLY, // Tipo de datos: fecha sin hora.
      allowNull: false, // No puede ser nulo.
    },

    // Fec_Fin_Etapa_lectiva: Fecha de fin de la etapa lectiva.
    Fec_Fin_Etapa_lectiva: {
      type: DataTypes.DATEONLY, // Tipo de datos: fecha sin hora.
      allowNull: false, // No puede ser nulo.
    },

    // Can_Aprendices: Número de aprendices asociados a la ficha.
    Can_Aprendices: {
      type: DataTypes.INTEGER, // Tipo de datos: número entero.
      allowNull: false, // No puede ser nulo.
    },

    // Est_Fichas: Estado de la ficha, que puede ser "ACTIVO" o "INACTIVO".
    Est_Fichas: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"), // Tipo de datos: un valor enumerado.
      allowNull: false, // No puede ser nulo.
    },

    // Id_Programa: Clave foránea que hace referencia a un registro en el modelo ProgramaModel.
    Id_Programa: {
      type: DataTypes.INTEGER, // Tipo de datos: número entero.
      allowNull: false, // No puede ser nulo.
      references: {
        model: ProgramaModel, // Relacionado con el modelo "programaModel".
        key: "Id_Programa", // Hace referencia a la columna "Id_Programa" de la tabla "programas".
      },
    },
  },
  {
    // Configuración adicional del modelo.
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla.
    timestamps: true, // Habilita las columnas "createdAt" y "updatedAt".
    createdAt: "created_at", // Renombra la columna "createdAt" a "created_at".
    updatedAt: "updated_at", // Renombra la columna "updatedAt" a "updated_at".
  }
);

// Exportamos el modelo para usarlo en otras partes del proyecto.
export default FichasModel;
