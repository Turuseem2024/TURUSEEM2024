import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { logger } from "./logMiddleware.js";

const checkAuth = async (req, res, next) => {
  let token;

  // Verifica si hay un token en el encabezado Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrae el token del encabezado
      token = req.headers.authorization.split(" ")[1];

      // Verifica y decodifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const decodedIdUser = Buffer.from(decoded.Id_User, "base64").toString(
        "utf-8"
      );

      // Busca el usuario en la base de datos
      const user = await UserModel.findByPk(decodedIdUser, {
        attributes: { exclude: ["password", "Confirmado", "token"] },
      });

      // Verifica si el usuario existe y si el token coincide
      if (!user) {
        return res.status(403).json({ msg: "Usuario no encontrado" });
      }

      req.usuario = user;
      return next();
    } catch (error) {
      // Maneja errores de token, como expiración o firma inválida
      logger.error("Token no válido o expirado", error);
      return res.status(403).json({ msg: "Token no valido o expirado" });
    }
  }
  // Si no hay token, devuelve un error
  if (!token) {
    return res.status(403).json({ msg: "Token no válido o inexistente" });
  }
  next();
};

export default checkAuth;