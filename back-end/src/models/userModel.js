import db from "../database/db.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { generarToken } from "../helpers/generarToken.js";


const UserModel = db.define(
  "users",
  {
    Id_User: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      allowNull: false, 
      autoIncrement: true 
    },
    Tipo_Usuario: { 
      type: DataTypes.ENUM('Talento Humano', 'Usuario Normal'), 
      allowNull: false 
    },
    Nom_User: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },
    Ape_User: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },
    Genero_User: { 
      type: DataTypes.ENUM('Masculino','Femenino'), 
      allowNull: false 
    },
    Email_User: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      unique: true 
    },
    Tel_User: { 
      type: DataTypes.STRING(15), 
      allowNull: true 
    },
    Password_User: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },
    token: { 
      type: DataTypes.STRING(255) 
    },
    confirmado: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
    Est_User: { 
      type: DataTypes.ENUM('ACTIVO','INACTIVO'), 
      defaultValue: 'ACTIVO' 
    }
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed("Password_User")) {
          const salt = await bcrypt.genSalt(10);
          user.Password_User = await bcrypt.hash(user.Password_User, salt);
        }
      },
      beforeCreate: async (user, options) => {
        user.token = generarToken(); // Genera un nuevo token al crear el usuario
      },
    },
  }
);

UserModel.prototype.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.Password_User);
};

export default UserModel;
