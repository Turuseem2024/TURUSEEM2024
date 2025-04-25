// Importación de la instancia de conexión a la base de datos
import db from "../database/db.js";

// Importación del tipo de datos de Sequelize
import { DataTypes } from "sequelize";

// Importación de modelos relacionados que se referencian con llaves foráneas
import FichasModel from "./fichasModel.js";
import UnitModel from "./unitModel.js";
import OfficialModel from "./officialModel.js";

/**
 * Definición del modelo "TurnoEspecialModel" que representa la tabla "turnos_especiales"
 * en la base de datos. Este modelo almacena información relacionada con turnos especiales
 * asignados a funcionarios en relación con fichas y unidades específicas.
 */
const TurnoEspecialModel = db.define(
  "turnos_especiales", // Nombre de la tabla en la base de datos
  {
    // Campo primario, clave única y auto incremental que identifica cada turno especial
    Id_Turno_Especial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    // Llave foránea que hace referencia al funcionario asignado al turno especial
    Id_Funcionario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OfficialModel, // Modelo al que hace referencia (funcionarios)
        key: "Id_Funcionario", // Campo del modelo referenciado
      },
    },

    // Llave foránea que hace referencia a la ficha (grupo o curso) relacionada al turno
    Id_Ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FichasModel, // Modelo de fichas
        key: "Id_Ficha",
      },
    },

    // Llave foránea que indica la unidad (centro, área o sección) asociada al turno
    Id_Unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UnitModel, // Modelo de unidades
        key: "Id_Unidad",
      },
    },
  },
  {
    // Opciones de configuración del modelo

    // Habilita el uso de marcas de tiempo (timestamps)
    timestamps: true,

    // Renombra los campos por defecto de timestamps:
    // "createdAt" será "created_at" y "updatedAt" será "updated_at"
    createdAt: "created_at",
    updatedAt: "updated_at",

    // Evita que Sequelize pluralice automáticamente el nombre de la tabla
    freezeTableName: true,
  }
);

// Exportación del modelo para su uso en otros módulos del proyecto
export default TurnoEspecialModel;
