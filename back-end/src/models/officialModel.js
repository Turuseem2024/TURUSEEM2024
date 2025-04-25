/**
 * Modelo de la tabla 'funcionarios' para la gestión de funcionarios en la base de datos.
 * 
 * @author Tu Nombre
 * @version 1.0
 * 
 * @requires {@link module:sequelize} Para la definición del modelo y tipos de datos
 * @see {@link module:../database/db} Conexión a la base de datos
 */

// Importación de dependencias
import db from "../database/db.js";
import { DataTypes } from "sequelize";

/**
 * Define el modelo de Funcionario utilizando Sequelize.
 * 
 * Estructura:
 * - Campos de la tabla con sus tipos, restricciones y validaciones
 * - Configuraciones especiales para el nombre de tabla y timestamps
 * 
 * @constant {Model} OfficialModel - Modelo Sequelize para la entidad Funcionario
 */
const OfficialModel = db.define(
  "funcionarios",  // Nombre físico de la tabla en la base de datos
  {
    /**
     * ID único del funcionario (clave primaria no autoincremental)
     * @type {Object}
     */
    Id_Funcionario: {
      type: DataTypes.INTEGER,
      autoIncrement: false,  // Desactiva autoincremento (asume IDs manuales)
      primaryKey: true,
      allowNull: false
    },

    /**
     * Nombre del funcionario (máximo 100 caracteres)
     * @type {Object}
     */
    Nom_Funcionario: {
      type: DataTypes.STRING(100),
      allowNull: false  // Campo obligatorio
    },

    /**
     * Apellido del funcionario (máximo 100 caracteres)
     * @type {Object}
     */
    Ape_Funcionario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    /**
     * Género del funcionario con valores permitidos
     * @type {Object}
     * @enum {string} ['Masculino', 'Femenino']
     */
    Genero: {
      type: DataTypes.ENUM("Masculino", "Femenino"),
      allowNull: false
    },

    /**
     * Teléfono del funcionario (campo opcional)
     * @type {Object}
     */
    Tel_Funcionario: {
      type: DataTypes.STRING(15),  // Soporta números internacionales
      allowNull: true  // Permite valores nulos
    },

    /**
     * Estado del funcionario en el sistema
     * @type {Object}
     * @enum {string} ['Activo', 'Inactivo']
     */
    Est_Funcionario: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
      allowNull: false
    },

    /**
     * Correo electrónico del funcionario (campo opcional)
     * @type {Object}
     */
    Cor_Funcionarios: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    /**
     * Tipo de contrato del funcionario
     * @type {Object}
     * @enum {string} ['Planta', 'Contratista']
     */
    Cargo_Funcionario: {
      type: DataTypes.ENUM("Planta", "Contratista"),
      allowNull: false
    }
  },
  {
    /**
     * Configuraciones adicionales del modelo:
     * - timestamps: false → Desactiva campos automáticos de timestamp
     * - freezeTableName: true → Evita pluralización automática del nombre
     */
    timestamps: false,
    freezeTableName: true
  }
);

// Exporta el modelo para su uso en otros módulos
export default OfficialModel;