// Importación de la instancia de conexión a la base de datos
import db from "../database/db.js";

// Importación del módulo bcrypt para el hash de contraseñas
import bcrypt from "bcrypt";

// Importación de los tipos de datos de Sequelize
import { DataTypes } from "sequelize";

// Importación de la función personalizada para generar tokens
import { generarToken } from "../helpers/generarToken.js";

// Definición del modelo 'UserModel' utilizando Sequelize, mapeando la tabla 'users'
const UserModel = db.define(
  "users", // Nombre de la tabla
  {
    // Campo ID del usuario: clave primaria, entero autoincremental
    Id_User: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      allowNull: false, 
      autoIncrement: true 
    },

    // Campo de tipo de usuario: restringido a los valores definidos
    Tipo_Usuario: { 
      type: DataTypes.ENUM('Talento Humano', 'Usuario Normal'), 
      allowNull: false 
    },

    // Campo para el nombre del usuario
    Nom_User: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },

    // Campo para el apellido del usuario
    Ape_User: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },

    // Campo de género del usuario: restringido a Masculino o Femenino
    Genero_User: { 
      type: DataTypes.ENUM('Masculino','Femenino'), 
      allowNull: false 
    },

    // Campo de correo electrónico del usuario: debe ser único
    Email_User: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      unique: true 
    },

    // Campo de teléfono del usuario: puede ser nulo
    Tel_User: { 
      type: DataTypes.STRING(15), 
      allowNull: true 
    },

    // Campo de contraseña del usuario: almacenada de forma encriptada
    Password_User: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },

    // Campo para almacenar un token de verificación
    token: { 
      type: DataTypes.STRING(255) 
    },

    // Campo para indicar si el usuario ha confirmado su cuenta
    confirmado: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },

    // Estado del usuario: por defecto activo
    Est_User: { 
      type: DataTypes.ENUM('ACTIVO','INACTIVO'), 
      defaultValue: 'ACTIVO' 
    }
  },
  {
    // Se desactivan los campos automáticos 'createdAt' y 'updatedAt'
    timestamps: false,

    // Hooks: funciones que se ejecutan antes de ciertos eventos del modelo
    hooks: {
      // Hook que se ejecuta antes de guardar un usuario (create o update)
      beforeSave: async (user, options) => {
        // Si la contraseña fue modificada, se genera un nuevo hash
        if (user.changed("Password_User")) {
          const salt = await bcrypt.genSalt(10); // Genera un salt
          user.Password_User = await bcrypt.hash(user.Password_User, salt); // Aplica hash a la contraseña
        }
      },

      // Hook que se ejecuta solo antes de crear un nuevo usuario
      beforeCreate: async (user, options) => {
        // Genera y asigna un token único al nuevo usuario
        user.token = generarToken();
      },
    },
  }
);

// Método personalizado del modelo para comprobar si la contraseña ingresada coincide con la almacenada
UserModel.prototype.comprobarPassword = async function (passwordFormulario) {
  // Compara la contraseña ingresada con el hash almacenado usando bcrypt
  return await bcrypt.compare(passwordFormulario, this.Password_User);
};

// Exportación del modelo para ser utilizado en otras partes de la aplicación
export default UserModel;
