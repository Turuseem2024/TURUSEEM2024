// Importación de la instancia de base de datos (db) desde el archivo de configuración de la base de datos
import db from "../database/db.js";
// Importación de los tipos de datos de Sequelize
import { DataTypes } from "sequelize";

/**
 * Definición del modelo 'ciudades' en la base de datos utilizando Sequelize.
 * Este modelo representa la tabla 'ciudades' y tiene dos columnas: 'Id_Ciudad' y 'Nom_Ciudad'.
 * 
 * - 'Id_Ciudad' es una cadena de texto que actúa como clave primaria.
 * - 'Nom_Ciudad' es una cadena de texto que almacena el nombre de la ciudad.
 * 
 * @module cityModel
 */
const cityModel = db.define('ciudades', {
  /**
   * Columna 'Id_Ciudad': Identificador único de la ciudad.
   * - Tipo de dato: STRING con una longitud máxima de 10 caracteres.
   * - Esta columna es la clave primaria (primaryKey) y no puede ser nula (allowNull: false).
   */
  Id_Ciudad: { 
    type: DataTypes.STRING(10), 
    primaryKey: true, 
    allowNull: false 
  },

  /**
   * Columna 'Nom_Ciudad': Nombre de la ciudad.
   * - Tipo de dato: STRING con una longitud máxima de 50 caracteres.
   */
  Nom_Ciudad: {
    type: DataTypes.STRING(50)
  }
}, 
{
  /**
   * Configuración adicional del modelo.
   * - 'timestamps: false' deshabilita la creación automática de las columnas 'createdAt' y 'updatedAt'.
   */
  timestamps: false
}); 

// Exporta el modelo 'cityModel' para ser utilizado en otras partes de la aplicación
export default cityModel;
