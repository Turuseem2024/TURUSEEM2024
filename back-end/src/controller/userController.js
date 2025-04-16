// src/controllers/UserController.js
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  autenticarUsuario
} from "../services/userService.js";

export const findAllUsers = async (req, res) => {
  try {
    const data = await getAllUsers();
    res.status(200).json({ data, message: "Usuarios obtenidos correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener usuarios"
    });
  }
};

export const findUserById = async (req, res) => {
  try {
    const data = await getUserById(req.params.id);
    res.status(200).json({ data, message: "Usuario obtenido correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar usuario"
    });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const data = await createUser(req.body);
    res.status(201).json({ 
      data: {
        Id_User: data.Id_User,
        Email_User: data.Email_User,
        confirmado: data.confirmado
      }, 
      message: "Usuario creado exitosamente. Verifique su email para confirmar la cuenta."
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear usuario"
    });
  }
};

export const updateExistingUser = async (req, res) => {
  try {
    const data = await updateUser(req.params.id, req.body);
    res.status(200).json({ 
      data: {
        Id_User: data.Id_User,
        Email_User: data.Email_User,
        Est_User: data.Est_User
      },
      message: "Usuario actualizado correctamente" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar usuario"
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(200).json({ data: result, message: "Usuario eliminado correctamente" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar usuario"
    });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { Email_User, Password_User } = req.body;
    const data = await autenticarUsuario(Email_User, Password_User);
    res.status(200).json({ 
      data: {
        Id_User: data.Id_User,
        Nom_User: data.Nom_User,
        Email_User: data.Email_User,
        Tipo_Usuario: data.Tipo_Usuario,
        token: data.token
      },
      message: "Autenticación exitosa" 
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error de autenticación"
    });
  }
};
