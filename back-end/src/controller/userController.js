// src/controllers/UserController.js
// Importación de las funciones del servicio de usuario
import {
  getAllUsers,         // Función para obtener todos los usuarios
  getUserById,         // Función para obtener un usuario por su ID
  createUser,          // Función para crear un nuevo usuario
  updateUser,          // Función para actualizar un usuario existente
  deleteUser,          // Función para eliminar un usuario por su ID
  autenticarUsuario    // Función para autenticar un usuario
} from "../services/userService.js";

/**
 * Controlador para obtener todos los usuarios.
 * Realiza una llamada al servicio 'getAllUsers' y devuelve una respuesta
 * con el estado 200 si se obtiene la información correctamente.
 * Si ocurre un error, devuelve un mensaje con el estado del error.
 */
export const findAllUsers = async (req, res) => {
  try {
    // Obtener los usuarios desde el servicio
    const data = await getAllUsers();
    // Responder con los datos obtenidos
    res.status(200).json({ data, message: "Usuarios obtenidos correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre una excepción
    const status = error.status || 500; // Establecer el estado en 500 por defecto si no se proporciona otro
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al obtener usuarios"
    });
  }
};

/**
 * Controlador para obtener un usuario por su ID.
 * Recibe el ID del usuario desde los parámetros de la solicitud.
 * Si el usuario es encontrado, devuelve los datos con el mensaje de éxito.
 * Si ocurre un error, devuelve un mensaje con el estado del error.
 */
export const findUserById = async (req, res) => {
  try {
    // Obtener un solo usuario por su ID desde el servicio
    const data = await getUserById(req.params.id);
    // Responder con los datos obtenidos
    res.status(200).json({ data, message: "Usuario obtenido correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre una excepción
    const status = error.status || 500; // Establecer el estado en 500 por defecto si no se proporciona otro
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al buscar usuario"
    });
  }
};

/**
 * Controlador para crear un nuevo usuario.
 * Recibe los datos del usuario desde el cuerpo de la solicitud.
 * Si el usuario es creado correctamente, devuelve el nuevo usuario con un mensaje de éxito.
 * Si ocurre un error, devuelve un mensaje con el estado del error.
 */
export const createNewUser = async (req, res) => {
  try {
    // Crear un nuevo usuario con los datos recibidos
    const data = await createUser(req.body);
    // Responder con los datos del usuario creado
    res.status(201).json({ 
      data: {
        Id_User: data.Id_User,
        Email_User: data.Email_User,
        confirmado: data.confirmado
      }, 
      message: "Usuario creado exitosamente. Verifique su email para confirmar la cuenta."
    });
  } catch (error) {
    // Manejo de errores si ocurre una excepción
    const status = error.status || 500; // Establecer el estado en 500 por defecto si no se proporciona otro
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al crear usuario"
    });
  }
};

/**
 * Controlador para actualizar un usuario existente.
 * Recibe el ID del usuario desde los parámetros de la solicitud y los datos a actualizar desde el cuerpo.
 * Si el usuario es actualizado correctamente, devuelve los datos actualizados con un mensaje de éxito.
 * Si ocurre un error, devuelve un mensaje con el estado del error.
 */
export const updateExistingUser = async (req, res) => {
  try {
    // Actualizar el usuario con los nuevos datos recibidos
    const data = await updateUser(req.params.id, req.body);
    // Responder con los datos del usuario actualizado
    res.status(200).json({ 
      data: {
        Id_User: data.Id_User,
        Email_User: data.Email_User,
        Est_User: data.Est_User
      },
      message: "Usuario actualizado correctamente" 
    });
  } catch (error) {
    // Manejo de errores si ocurre una excepción
    const status = error.status || 500; // Establecer el estado en 500 por defecto si no se proporciona otro
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al actualizar usuario"
    });
  }
};

/**
 * Controlador para eliminar un usuario por su ID.
 * Recibe el ID del usuario desde los parámetros de la solicitud.
 * Si el usuario es eliminado correctamente, devuelve un mensaje de éxito.
 * Si ocurre un error, devuelve un mensaje con el estado del error.
 */
export const deleteUserById = async (req, res) => {
  try {
    // Eliminar al usuario usando el ID recibido
    const result = await deleteUser(req.params.id);
    // Responder con el mensaje de éxito
    res.status(200).json({ data: result, message: "Usuario eliminado correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre una excepción
    const status = error.status || 500; // Establecer el estado en 500 por defecto si no se proporciona otro
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error interno al eliminar usuario"
    });
  }
};

/**
 * Controlador para autenticar a un usuario.
 * Recibe el email y la contraseña del usuario desde el cuerpo de la solicitud.
 * Si la autenticación es exitosa, devuelve los datos del usuario y un token de autenticación.
 * Si ocurre un error, devuelve un mensaje de error.
 */
export const authenticateUser = async (req, res) => {
  try {
    // Desestructurar el email y la contraseña del cuerpo de la solicitud
    const { Email_User, Password_User } = req.body;
    // Autenticar al usuario usando los datos recibidos
    const data = await autenticarUsuario(Email_User, Password_User);
    // Responder con los datos del usuario autenticado y el token
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
    // Manejo de errores si ocurre una excepción
    const status = error.status || 500; // Establecer el estado en 500 por defecto si no se proporciona otro
    res.status(status).json({ 
      data: null, 
      message: error.message || "Error de autenticación"
    });
  }
};
