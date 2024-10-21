import UserModel from "../models/userModel.js";
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
    const usuario = await UserModel.findOne({
      where: { Cor_User: Cor_User },
    });

    if (!usuario) {
      const error = new Error("El usuario no existe o contraseña no válida!");
      return res.status(404).json({ msg: error.message }); // Uso de return para salir de la función si el usuario no existe.
    }

    // Comprobar si el usuario está confirmado.
    if (!usuario.Confirmado) {
      const error = new Error("Tu cuenta no está confirmada!");
      return res.status(403).json({ msg: error.message }); // Uso de return para salir de la función si la cuenta no está confirmada.
    }

    // Comprobar si la contraseña es correcta.
    if (await usuario.comprobarPassword(password)) {
      const userString = usuario.Id_User.toString();
      const Id_UserHash = Buffer.from(userString).toString('base64');

      res.json({
        Id_User: usuario.Id_User,
        Nom_User: usuario.Nom_User,
        Cor_User: usuario.Cor_User,
        token: generarJWT(Id_UserHash),
      });
      return; // Uso de return para salir de la función después de enviar la respuesta exitosa.
    } else {
      const error = new Error("La contraseña es incorrecta o el correo no es válido!");
      return res.status(403).json({ msg: error.message }); // Uso de return para salir de la función si la contraseña es incorrecta.
    }
  } catch (error) {
    logger.error("Error during authentication: ", error.message);
    return res.status(500).json({ msg: "Error en la autenticación." }); // Captura de errores y manejo de excepciones.
  }
};

export const CreateAccount = async (req, res) => {
  const { Cor_User, Nom_User, Id_User } = req.body;

  try {
    // Validar que Id_User sea un número.
    if (isNaN(Id_User)) {
      const error = new Error("El Documento del usuario debe ser un número.");
      return res.status(400).json({ message: error.message }); // Uso de return para salir de la función si Id_User no es un número.
    }

    // Validar que Nom_User solo contenga letras.
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(Nom_User)) {
      const error = new Error("El Nombre del usuario debe ser solo en letras.");
      return res.status(400).json({ message: error.message }); // Uso de return para salir de la función si Nom_User contiene caracteres no válidos.
    }

    // Validar el formato del correo electrónico.
    const emailRegex = /(gmail\.com|hotmail\.com)/;
    if (!emailRegex.test(Cor_User)) {
      const error = new Error("El correo electrónico debe ser válido y terminar en @gmail.com o @hotmail.com.");
      return res.status(400).json({ message: error.message }); // Uso de return para salir de la función si Cor_User no tiene un formato válido.
    }

    // Prevenir usuarios duplicados por correo.
    const existeCorreo = await UserModel.findOne({
      where: { Cor_User: Cor_User },
    });
    if (existeCorreo) {
      const error = new Error("El correo electrónico ya está en uso!");
      return res.status(400).json({ message: error.message }); // Uso de return para salir de la función si el correo ya está en uso.
    }

    // Prevenir usuarios duplicados por documento.
    const existeUser = await UserModel.findOne({
      where: { Id_User: Id_User },
    });
    if (existeUser) {
      const error = new Error("El documento ya está registrado!");
      return res.status(400).json({ message: error.message }); // Uso de return para salir de la función si el documento ya está registrado.
    }

    // Crear el nuevo usuario.
    const newUser = await UserModel.create({
      ...req.body,
      token: generarToken(), // Genera un token de confirmación.
      Confirmado: false, // La cuenta no está confirmada inicialmente.
    });

    // Enviar Email con token de confirmación.
    emailRegistro({
      Cor_User,
      Nom_User,
      token: newUser.token,
    });

    res.json({
      msg: "Usuario creado. Revisa tu correo para confirmar tu cuenta.",
    });
    return; // Uso de return para salir de la función después de enviar la respuesta exitosa.
  } catch (error) {
    logger.error("Error creating account: ", error.message);
    return res.status(500).json({ message: "Error al crear la cuenta." }); // Captura de errores y manejo de excepciones.
  }
};

export const perfil = async (req, res) => {
  try {
    const { usuario } = req;
    res.json({ usuario }); // Respuesta exitosa con los datos del perfil del usuario.
  } catch (error) {
    logger.error("Error fetching profile: ", error.message);
    return res.status(500).json({ message: "Error al obtener el perfil." }); // Captura de errores y manejo de excepciones.
  }
};

export const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    // Buscar usuario por token.
    const usuarioConfirmar = await UserModel.findOne({
      where: { token: token },
    });
    if (!usuarioConfirmar) {
      const error = new Error("Token no válido");
      return res.status(404).json({ msg: error.message }); // Uso de return para salir de la función si el token no es válido.
    }

    // Confirmar la cuenta del usuario.
    usuarioConfirmar.token = null;
    usuarioConfirmar.Confirmado = true;
    await usuarioConfirmar.save();

    // Generar el token JWT después de confirmar la cuenta.
    const jwtToken = generarJWT(usuarioConfirmar.Id_User);

    return res.status(200).json({
      msg: "Cuenta confirmada correctamente",
      token: jwtToken,
    });
  } catch (error) {
    logger.error("Error confirming account: ", error.message);
    return res.status(500).json({ msg: "Error al confirmar el usuario" }); // Captura de errores y manejo de excepciones.
  }
};

export const olvidePassword = async (req, res) => {
  const { Cor_User } = req.body;

  try {
    // Buscar usuario por correo electrónico.
    const existeUsuario = await UserModel.findOne({
      where: { Cor_User: Cor_User },
    });
    if (!existeUsuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message }); // Uso de return para salir de la función si el usuario no existe.
    }

    // Generar y asignar un nuevo token de recuperación.
    existeUsuario.token = generarToken();
    await existeUsuario.save();

    // Enviar Email con instrucciones para restablecer la contraseña.
    emailOlvidePassword({
      Cor_User,
      Nom_User: existeUsuario.Nom_User,
      token: existeUsuario.token,
    });

    res.json({ msg: "Hemos enviado un correo con las instrucciones!" });
    return; // Uso de return para salir de la función después de enviar la respuesta exitosa.
  } catch (error) {
    logger.error("Error processing password reset request: ", error.message);
    return res.status(500).json({ msg: "Error al procesar la solicitud." }); // Captura de errores y manejo de excepciones.
  }
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;

  try {
    // Buscar usuario por token.
    const tokenUsuario = await UserModel.findOne({
      where: { token: token },
    });
    if (tokenUsuario) {
      res.json({ msg: "Token válido, el usuario existe!" });
      return; // Uso de return para salir de la función después de enviar la respuesta exitosa.
    } else {
      const error = new Error("Token no válido");
      return res.status(404).json({ msg: error.message }); // Uso de return para salir de la función si el token no es válido.
    }
  } catch (error) {
    logger.error("Error verifying token: ", error.message);
    return res.status(500).json({ msg: "Error al verificar el token." }); // Captura de errores y manejo de excepciones.
  }
};

export const nuevoPassword = async (req, res) => {
  const { password } = req.body;

  try {
    // Buscar usuario por token.
    const usuario = await UserModel.findOne({
      where: { token: req.params.token },
    });
    if (!usuario) {
      const error = new Error("Hubo un error");
      return res.status(404).json({ msg: error.message }); // Uso de return para salir de la función si no se encuentra el usuario.
    }

    // Actualizar el token y la contraseña del usuario.
    usuario.token = null;
    usuario.password = password;
    await usuario.save();

    res.json({ msg: "Contraseña cambiada correctamente!" });
    return; // Uso de return para salir de la función después de enviar la respuesta exitosa.
  } catch (error) {
    logger.error("Error resetting password: ", error.message);
    return res.status(500).json({ msg: "Error al cambiar la contraseña." }); // Captura de errores y manejo de excepciones.
  }
};
