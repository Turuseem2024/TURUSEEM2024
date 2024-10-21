import db from "../database/db.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { generarToken } from "../helpers/generarToken.js";

const UserModel = db.define(
  "users",
  {
    Id_User: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
    Nom_User: { type: DataTypes.STRING },
    Cor_User: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    token: { type: DataTypes.STRING },
    Confirmado: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeCreate: async (user, options) => {
        user.token = generarToken(); // Genera un nuevo token al crear el usuario
      },
    },
  }
);

UserModel.prototype.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};


export default UserModel;

