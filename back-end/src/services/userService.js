// src/services/UserService.js
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import { generarToken } from "../helpers/generarToken.js";

const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log");
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

export async function getAllUsers() {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ['Password_User', 'token'] }
    });
    return users;
  } catch (error) {
    logErrorToFile("getAllUsers", error);
    throw { status: 500, message: `Error al obtener usuarios: ${error.message}` };
  }
}

export async function getUserById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['Password_User', 'token'] }
    });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  } catch (error) {
    logErrorToFile("getUserById", error);
    throw { status: 404, message: `Error al obtener usuario: ${error.message}` };
  }
}

export async function createUser(data) {
  try {
    // Validación de campos requeridos
    if (!data || !data.Password_User || data.Password_User.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    
    const camposRequeridos = ['Tipo_Usuario', 'Nom_User', 'Ape_User', 'Genero_User', 'Email_User'];
    for (const campo of camposRequeridos) {
      if (!data[campo] || typeof data[campo] !== 'string' || !data[campo].trim()) {
        throw new Error(`Campo requerido: ${campo}`);
      }
    }

    // Validación de ENUMs
    const validacionesENUM = {
      Tipo_Usuario: ['Talento Humano', 'Usuario Normal'],
      Genero_User: ['Masculino', 'Femenino'],
      Est_User: ['ACTIVO', 'INACTIVO']
    };

    for (const [campo, valores] of Object.entries(validacionesENUM)) {
      if (data[campo] && !valores.includes(data[campo])) {
        throw new Error(`${campo} inválido`);
      }
    }

    // Crear usuario con hooks automáticos
    const nuevoUsuario = await UserModel.create(data);
    
    return {
      Id_User: nuevoUsuario.Id_User,
      Email_User: nuevoUsuario.Email_User,
      token: nuevoUsuario.token,
      confirmado: nuevoUsuario.confirmado
    };
    
  } catch (error) {
    logErrorToFile("createUser", error);
    throw { 
      status: 400, 
      message: error.message.includes("unique constraint") 
        ? "El correo electrónico ya está registrado"
        : `Error al crear usuario: ${error.message}`
    };
  }
}

export async function updateUser(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    const user = await UserModel.findByPk(id);
    if (!user) throw new Error("Usuario no encontrado");

    // Validaciones de ENUM
    const validacionesENUM = {
      Tipo_Usuario: ['Talento Humano', 'Usuario Normal'],
      Genero_User: ['Masculino', 'Femenino'],
      Est_User: ['ACTIVO', 'INACTIVO']
    };

    for (const [campo, valores] of Object.entries(validacionesENUM)) {
      if (data[campo] && !valores.includes(data[campo])) {
        throw new Error(`${campo} inválido`);
      }
    }

    // Actualizar campos
    const camposPermitidos = ['Tipo_Usuario', 'Nom_User', 'Ape_User', 'Genero_User', 
                             'Email_User', 'Tel_User', 'Est_User', 'Password_User'];
    const actualizaciones = {};
    
    for (const campo of camposPermitidos) {
      if (data[campo] !== undefined) {
        actualizaciones[campo] = data[campo];
      }
    }

    const usuarioActualizado = await user.update(actualizaciones);
    
    return {
      Id_User: usuarioActualizado.Id_User,
      Email_User: usuarioActualizado.Email_User,
      Est_User: usuarioActualizado.Est_User
    };
    
  } catch (error) {
    logErrorToFile("updateUser", error);
    throw { 
      status: 400, 
      message: error.message.includes("unique constraint") 
        ? "El correo electrónico ya está en uso"
        : `Error al actualizar usuario: ${error.message}`
    };
  }
}

export async function deleteUser(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    const user = await UserModel.findByPk(id);
    if (!user) throw new Error("Usuario no encontrado");
    await user.destroy();
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    logErrorToFile("deleteUser", error);
    throw { status: 400, message: `Error al eliminar usuario: ${error.message}` };
  }
}

// Función adicional para autenticación
export async function autenticarUsuario(email, password) {
  try {
    const user = await UserModel.findOne({ where: { Email_User: email } });
    
    if (!user) throw new Error("El usuario no existe");
    if (!user.confirmado) throw new Error("Cuenta no confirmada");
    if (user.Est_User === 'INACTIVO') throw new Error("Cuenta inactiva");

    const passwordValido = await user.comprobarPassword(password);
    if (!passwordValido) throw new Error("Contraseña incorrecta");

    return {
      Id_User: user.Id_User,
      Nom_User: user.Nom_User,
      Email_User: user.Email_User,
      Tipo_Usuario: user.Tipo_Usuario,
      token: generarToken() // Generar nuevo token de sesión
    };
    
  } catch (error) {
    logErrorToFile("autenticarUsuario", error);
    throw { status: 401, message: `Error de autenticación: ${error.message}` };
  }
}