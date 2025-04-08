// services/userService.js
import UserModel from "../models/userModel.js";

export const findUserByEmail = async (email) => {
  return await UserModel.findOne({ where: { Cor_User: email } });
};

export const findUserById = async (id) => {
  return await UserModel.findOne({ where: { Id_User: id } });
};

export const findUserByToken = async (token) => {
  return await UserModel.findOne({ where: { token } });
};

export const createUser = async (userData) => {
  return await UserModel.create(userData);
};

export const updateUser = async (usuario) => {
  return await usuario.save();
};
