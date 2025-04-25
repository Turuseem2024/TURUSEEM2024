// Importación de la librería jsonwebtoken para verificar y decodificar los tokens JWT
import jwt from "jsonwebtoken";
// Importación del modelo de usuario para realizar consultas a la base de datos
import UserModel from "../models/userModel.js";
// Importación del middleware de log para registrar errores
import { logger } from "./logMiddleware.js";

/**
 * Middleware para verificar la autenticación del usuario mediante un token JWT.
 * Este middleware asegura que el usuario esté autenticado antes de permitirle acceder
 * a las rutas protegidas en la aplicación.
 * 
 * El middleware verifica si hay un token presente en el encabezado 'Authorization'
 * y valida su autenticidad. Si el token es válido y el usuario asociado existe en la base
 * de datos, la solicitud continúa; de lo contrario, se devuelve un error.
 * 
 * @param {Object} req - El objeto de la solicitud (request).
 * @param {Object} res - El objeto de la respuesta (response).
 * @param {Function} next - La función que se llama para pasar al siguiente middleware o ruta.
 * 
 * @returns {Object} - Devuelve un JSON con un mensaje de error si no hay un token válido o si ocurre algún problema.
 */
const checkAuth = async (req, res, next) => {
  let token;

  // Verifica si hay un token en el encabezado Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrae el token del encabezado 'Authorization'
      token = req.headers.authorization.split(" ")[1];

      // Verifica y decodifica el token usando la clave secreta JWT almacenada en el entorno
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Decodifica el ID del usuario desde la información contenida en el token (Base64 -> UTF-8)
      const decodedIdUser = Buffer.from(decoded.Id_User, "base64").toString(
        "utf-8"
      );

      // Busca al usuario en la base de datos utilizando el ID del usuario decodificado
      const user = await UserModel.findByPk(decodedIdUser, {
        // Excluye las columnas de contraseña, confirmación y token del resultado
        attributes: { exclude: ["password", "Confirmado", "token"] },
      });

      // Verifica si el usuario existe en la base de datos
      if (!user) {
        return res.status(403).json({ msg: "Usuario no encontrado" });
      }

      // Si el usuario existe, lo asigna al objeto 'req' para que esté disponible en las siguientes etapas del middleware
      req.usuario = user;
      // Continúa al siguiente middleware o ruta
      return next();
    } catch (error) {
      // Si el token es inválido o ha expirado, captura el error y registra el evento
      logger.error("Token no válido o expirado", error);
      // Responde con un mensaje de error de autenticación
      return res.status(403).json({ msg: "Token no valido o expirado" });
    }
  }
  
  // Si no se encuentra un token en el encabezado, devuelve un error de token inexistente o inválido
  if (!token) {
    return res.status(403).json({ msg: "Token no válido o inexistente" });
  }
  
  // Si el token es válido, continúa con la ejecución del siguiente middleware o ruta
  next();
};

// Exporta el middleware para que pueda ser utilizado en otras partes de la aplicación
export default checkAuth;
