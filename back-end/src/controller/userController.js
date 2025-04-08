// controllers/userController.js
import { 
  findUserByEmail, 
  findUserById, 
  findUserByToken, 
  createUser, 
  updateUser 
} from "../services/userService.js";

import { generarJWT } from "../helpers/generarJWT.js";
import { generarToken } from "../helpers/generarToken.js";
import { emailRegistro } from "../helpers/emailRegistro.js";
import { emailOlvidePassword } from "../helpers/emailOlvidePassword.js";
import { logger } from "../middleware/logMiddleware.js";
import bcrypt from "bcrypt";

export const autenticar = async (req, res) => {
  const { Cor_User, password } = req.body;
  
  try {
    // Comprobar si el usuario existe en la base de datos.
    const usuario = await findUserByEmail(Cor_User);

    if (!usuario) {
      const error = new Error("El usuario no existe o contraseña no válida!");
      return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el usuario está confirmado.
    if (!usuario.Confirmado) {
      const error = new Error("Tu cuenta no está confirmada!");
      return res.status(403).json({ msg: error.message });
    }

    // Comprobar si la contraseña es correcta.
    if (await usuario.comprobarPassword(password)) {
      const userString = usuario.Id_User.toString();
      const Id_UserHash = Buffer.from(userString).toString('base64');

      return res.json({
        Id_User: usuario.Id_User,
        Nom_User: usuario.Nom_User,
        Cor_User: usuario.Cor_User,
        token: generarJWT(Id_UserHash),
      });
    } else {
      const error = new Error("La contraseña es incorrecta o el correo no es válido!");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    logger.error("Error during authentication: ", error.message);
    return res.status(500).json({ msg: "Error en la autenticación." });
  }
};

export const CreateAccount = async (req, res) => {
  const { Cor_User, Nom_User, Id_User } = req.body;

  try {
    // Validar que Id_User sea un número.
    if (isNaN(Id_User)) {
      const error = new Error("El Documento del usuario debe ser un número.");
      return res.status(400).json({ message: error.message });
    }

    // Validar que Nom_User solo contenga letras.
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(Nom_User)) {
      const error = new Error("El Nombre del usuario debe ser solo en letras.");
      return res.status(400).json({ message: error.message });
    }

    // Validar el formato del correo electrónico.
    const emailRegex = /(gmail\.com|hotmail\.com)/;
    if (!emailRegex.test(Cor_User)) {
      const error = new Error("El correo electrónico debe ser válido y terminar en @gmail.com o @hotmail.com.");
      return res.status(400).json({ message: error.message });
    }

    // Prevenir usuarios duplicados por correo.
    const existeCorreo = await findUserByEmail(Cor_User);
    if (existeCorreo) {
      const error = new Error("El correo electrónico ya está en uso!");
      return res.status(400).json({ message: error.message });
    }

    // Prevenir usuarios duplicados por documento.
    const existeUser = await findUserById(Id_User);
    if (existeUser) {
      const error = new Error("El documento ya está registrado!");
      return res.status(400).json({ message: error.message });
    }

    // Crear el nuevo usuario.
    const newUser = await createUser({
      ...req.body,
      token: generarToken(), // Genera un token de confirmación.
      Confirmado: false,     // La cuenta no está confirmada inicialmente.
    });

    // Enviar email con token de confirmación.
    emailRegistro({
      Cor_User,
      Nom_User,
      token: newUser.token,
    });

    return res.json({
      msg: "Usuario creado. Revisa tu correo para confirmar tu cuenta.",
    });
  } catch (error) {
    logger.error("Error creating account: ", error.message);
    return res.status(500).json({ message: "Error al crear la cuenta." });
  }
};

export const perfil = async (req, res) => {
  try {
    const { usuario } = req;
    return res.json({ usuario });
  } catch (error) {
    logger.error("Error fetching profile: ", error.message);
    return res.status(500).json({ message: "Error al obtener el perfil." });
  }
};

export const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    // Buscar usuario por token.
    const usuarioConfirmar = await findUserByToken(token);
    if (!usuarioConfirmar) {
      const error = new Error("Token no válido");
      return res.status(404).json({ msg: error.message });
    }

    // Confirmar la cuenta del usuario.
    usuarioConfirmar.token = null;
    usuarioConfirmar.Confirmado = true;
    await updateUser(usuarioConfirmar);

    // Generar el token JWT después de confirmar la cuenta.
    const jwtToken = generarJWT(usuarioConfirmar.Id_User);

    return res.status(200).json({
      msg: "Cuenta confirmada correctamente",
      token: jwtToken,
    });
  } catch (error) {
    logger.error("Error confirming account: ", error.message);
    return res.status(500).json({ msg: "Error al confirmar el usuario" });
  }
};

export const olvidePassword = async (req, res) => {
  const { Cor_User } = req.body;

  try {
    // Buscar usuario por correo electrónico.
    const existeUsuario = await findUserByEmail(Cor_User);
    if (!existeUsuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    // Generar y asignar un nuevo token de recuperación.
    existeUsuario.token = generarToken();
    await updateUser(existeUsuario);

    // Enviar email con instrucciones para restablecer la contraseña.
    emailOlvidePassword({
      Cor_User,
      Nom_User: existeUsuario.Nom_User,
      token: existeUsuario.token,
    });

    return res.json({ msg: "Hemos enviado un correo con las instrucciones!" });
  } catch (error) {
    logger.error("Error processing password reset request: ", error.message);
    return res.status(500).json({ msg: "Error al procesar la solicitud." });
  }
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;

  try {
    // Buscar usuario por token.
    const tokenUsuario = await findUserByToken(token);
    if (tokenUsuario) {
      return res.json({ msg: "Token válido, el usuario existe!" });
    } else {
      const error = new Error("Token no válido");
      return res.status(404).json({ msg: error.message });
    }
  } catch (error) {
    logger.error("Error verifying token: ", error.message);
    return res.status(500).json({ msg: "Error al verificar el token." });
  }
};

export const nuevoPassword = async (req, res) => {
  const { password } = req.body;

  try {
    // Buscar usuario por token.
    const usuario = await findUserByToken(req.params.token);
    if (!usuario) {
      const error = new Error("Hubo un error");
      return res.status(404).json({ msg: error.message });
    }

    // Actualizar token y la contraseña del usuario.
    usuario.token = null;
    usuario.password = password; // Asegúrate de que en el modelo se aplique el hash automáticamente o realiza el hash manualmente aquí.
    await updateUser(usuario);

    return res.json({ msg: "Contraseña cambiada correctamente!" });
  } catch (error) {
    logger.error("Error resetting password: ", error.message);
    return res.status(500).json({ msg: "Error al cambiar la contraseña." });
  }
};
