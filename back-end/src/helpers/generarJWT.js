// Se importa el paquete jwt para manejar la creación de tokens JWT
import jwt from "jsonwebtoken";
// Se importa bcrypt para manejar el cifrado de contraseñas (aunque no se usa en este fragmento)
import bcrypt from "bcrypt";

/**
 * Función para generar un token JWT con un tiempo de expiración de 4 horas.
 * 
 * @param {number} Id_User - El ID del usuario que se incluirá en el payload del token.
 * @returns {string} - El token JWT generado.
 */
export const generarJWT = (Id_User) => {
  // Se genera el token JWT utilizando el ID de usuario, la clave secreta almacenada en las variables de entorno
  // y un tiempo de expiración de 4 horas.
  return jwt.sign({ Id_User: Id_User }, process.env.JWT_SECRET, {
    expiresIn: "4h", // El token expirará en 4 horas
  });
};
