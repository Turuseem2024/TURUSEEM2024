// src/services/UserService.js

// Importación de dependencias
import fs from "fs"; // Módulo para trabajar con el sistema de archivos
import path from "path"; // Módulo para gestionar rutas de archivos
import bcrypt from "bcrypt"; // Módulo para encriptar contraseñas
import UserModel from "../models/userModel.js"; // Modelo de usuario para interactuar con la base de datos
import { generarToken } from "../helpers/generarToken.js"; // Función para generar token de sesión

/**
 * Función para registrar errores en un archivo de log.
 * @param {string} functionName - Nombre de la función donde ocurrió el error.
 * @param {Error} error - El objeto de error que contiene detalles sobre el problema.
 */
const logErrorToFile = (functionName, error) => {
  const logPath = path.resolve("logs", "errores.log"); // Ruta donde se almacenará el archivo de log
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true }); // Asegura que el directorio de logs exista
  fs.appendFileSync(logPath, logMessage); // Escribe el mensaje de error en el archivo
};

/**
 * Obtiene todos los usuarios de la base de datos, excluyendo ciertos campos.
 * @returns {Array} - Lista de usuarios sin los campos sensibles como contraseñas o token.
 * @throws {Error} - Si ocurre un error al obtener los usuarios.
 */
export async function getAllUsers() {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ['Password_User', 'token'] } // Excluye los campos sensibles
    });
    return users; // Devuelve los usuarios obtenidos
  } catch (error) {
    logErrorToFile("getAllUsers", error); // Registra el error en el log
    throw { status: 500, message: `Error al obtener usuarios: ${error.message}` }; // Lanza un error personalizado
  }
}

/**
 * Obtiene un usuario por su ID.
 * @param {number} id - El ID del usuario que se desea obtener.
 * @returns {Object} - El usuario encontrado sin los campos sensibles.
 * @throws {Error} - Si ocurre un error o el usuario no existe.
 */
export async function getUserById(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido"); // Validación del ID
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['Password_User', 'token'] } // Excluye los campos sensibles
    });
    if (!user) throw new Error("Usuario no encontrado"); // Verifica si el usuario existe
    return user; // Devuelve el usuario encontrado
  } catch (error) {
    logErrorToFile("getUserById", error); // Registra el error en el log
    throw { status: 404, message: `Error al obtener usuario: ${error.message}` }; // Lanza un error personalizado
  }
}

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Object} data - Los datos del nuevo usuario.
 * @returns {Object} - Los datos del usuario recién creado.
 * @throws {Error} - Si ocurre un error o los datos no son válidos.
 */
export async function createUser(data) {
  try {
    // Validación de campos requeridos
    if (!data || !data.Password_User || data.Password_User.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres"); // Validación de longitud de la contraseña
    }

    // Validación de campos requeridos
    const camposRequeridos = ['Tipo_Usuario', 'Nom_User', 'Ape_User', 'Genero_User', 'Email_User'];
    for (const campo of camposRequeridos) {
      if (!data[campo] || typeof data[campo] !== 'string' || !data[campo].trim()) {
        throw new Error(`Campo requerido: ${campo}`); // Verifica que los campos estén presentes y sean válidos
      }
    }

    // Validación de ENUMs para asegurar que los valores sean correctos
    const validacionesENUM = {
      Tipo_Usuario: ['Talento Humano', 'Usuario Normal'],
      Genero_User: ['Masculino', 'Femenino'],
      Est_User: ['ACTIVO', 'INACTIVO']
    };

    for (const [campo, valores] of Object.entries(validacionesENUM)) {
      if (data[campo] && !valores.includes(data[campo])) {
        throw new Error(`${campo} inválido`); // Verifica que los valores de los campos coincidan con los valores permitidos
      }
    }

    // Crear el usuario en la base de datos
    const nuevoUsuario = await UserModel.create(data);
    
    return {
      Id_User: nuevoUsuario.Id_User,
      Email_User: nuevoUsuario.Email_User,
      token: nuevoUsuario.token,
      confirmado: nuevoUsuario.confirmado
    }; // Devuelve los datos del nuevo usuario
  } catch (error) {
    logErrorToFile("createUser", error); // Registra el error en el log
    throw { 
      status: 400, 
      message: error.message.includes("unique constraint") 
        ? "El correo electrónico ya está registrado" // Manejo de error si el correo ya existe
        : `Error al crear usuario: ${error.message}` // Lanza un error personalizado
    };
  }
}

/**
 * Actualiza los datos de un usuario existente.
 * @param {number} id - El ID del usuario a actualizar.
 * @param {Object} data - Los nuevos datos del usuario.
 * @returns {Object} - Los datos del usuario actualizado.
 * @throws {Error} - Si ocurre un error o el usuario no existe.
 */
export async function updateUser(id, data) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización"); // Validación del ID
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización"); // Validación de los datos de actualización

    const user = await UserModel.findByPk(id); // Busca el usuario por su ID
    if (!user) throw new Error("Usuario no encontrado"); // Si no existe el usuario, lanza un error

    // Validación de ENUMs para campos que deben tener valores específicos
    const validacionesENUM = {
      Tipo_Usuario: ['Talento Humano', 'Usuario Normal'],
      Genero_User: ['Masculino', 'Femenino'],
      Est_User: ['ACTIVO', 'INACTIVO']
    };

    for (const [campo, valores] of Object.entries(validacionesENUM)) {
      if (data[campo] && !valores.includes(data[campo])) {
        throw new Error(`${campo} inválido`); // Verifica que los valores de los campos sean correctos
      }
    }

    // Filtra los campos que pueden ser actualizados
    const camposPermitidos = ['Tipo_Usuario', 'Nom_User', 'Ape_User', 'Genero_User', 
                             'Email_User', 'Tel_User', 'Est_User', 'Password_User'];
    const actualizaciones = {};

    for (const campo of camposPermitidos) {
      if (data[campo] !== undefined) {
        actualizaciones[campo] = data[campo]; // Agrega los campos que se desean actualizar
      }
    }

    const usuarioActualizado = await user.update(actualizaciones); // Realiza la actualización en la base de datos
    
    return {
      Id_User: usuarioActualizado.Id_User,
      Email_User: usuarioActualizado.Email_User,
      Est_User: usuarioActualizado.Est_User
    }; // Devuelve los datos del usuario actualizado
  } catch (error) {
    logErrorToFile("updateUser", error); // Registra el error en el log
    throw { 
      status: 400, 
      message: error.message.includes("unique constraint") 
        ? "El correo electrónico ya está en uso" // Manejo de error si el correo ya existe
        : `Error al actualizar usuario: ${error.message}` // Lanza un error personalizado
    };
  }
}

/**
 * Elimina un usuario de la base de datos.
 * @param {number} id - El ID del usuario a eliminar.
 * @returns {Object} - Mensaje de éxito si la eliminación fue correcta.
 * @throws {Error} - Si ocurre un error o el usuario no existe.
 */
export async function deleteUser(id) {
  try {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación"); // Validación del ID
    const user = await UserModel.findByPk(id); // Busca el usuario por su ID
    if (!user) throw new Error("Usuario no encontrado"); // Si no existe el usuario, lanza un error
    await user.destroy(); // Elimina el usuario de la base de datos
    return { message: "Usuario eliminado correctamente" }; // Mensaje de éxito
  } catch (error) {
    logErrorToFile("deleteUser", error); // Registra el error en el log
    throw { status: 400, message: `Error al eliminar usuario: ${error.message}` }; // Lanza un error personalizado
  }
}

/**
 * Función para autenticar a un usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Object} - Los datos del usuario autenticado y un nuevo token de sesión.
 * @throws {Error} - Si ocurre un error de autenticación.
 */
export async function autenticarUsuario(email, password) {
  try {
    const user = await UserModel.findOne({ where: { Email_User: email } }); // Busca el usuario por su correo electrónico
    
    if (!user) throw new Error("El usuario no existe"); // Si no existe el usuario, lanza un error
    if (!user.confirmado) throw new Error("Cuenta no confirmada"); // Verifica si la cuenta está confirmada
    if (user.Est_User === 'INACTIVO') throw new Error("Cuenta inactiva"); // Verifica si la cuenta está inactiva

    const passwordValido = await user.comprobarPassword(password); // Verifica si la contraseña es correcta
    if (!passwordValido) throw new Error("Contraseña incorrecta"); // Si la contraseña es incorrecta, lanza un error

    return {
      Id_User: user.Id_User,
      Nom_User: user.Nom_User,
      Email_User: user.Email_User,
      Tipo_Usuario: user.Tipo_Usuario,
      token: generarToken() // Genera un nuevo token de sesión
    }; 
  } catch (error) {
    logErrorToFile("autenticarUsuario", error); // Registra el error en el log
    throw { status: 401, message: `Error de autenticación: ${error.message}` }; // Lanza un error de autenticación
  }
}
