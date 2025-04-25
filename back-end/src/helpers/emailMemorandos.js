// Importación de nodemailer para el envío de correos electrónicos y logger para el registro de eventos
import nodemailer from "nodemailer";
import { logger } from "../middleware/logMiddleware.js";

/**
 * Función que envía un correo electrónico para el proceso de recuperación de contraseña.
 * 
 * @param {Object} datos - Objeto que contiene los datos del usuario para el envío del correo.
 * @param {string} datos.Cor_User - Correo electrónico del usuario.
 * @param {string} datos.Nom_User - Nombre del usuario.
 * @param {string} datos.token - Token de recuperación de contraseña.
 * 
 * @returns {Object} Respuesta con el estado del envío del correo y el mensaje o ID de error.
 */
export const emailOlvidePassword = async (datos) => {
  try {
    // Configuración del transportador de correo usando nodemailer
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,       // Host del servidor de correo (p. ej., Gmail, SendGrid)
      port: process.env.EMAIL_PORT,       // Puerto del servidor de correo
      secure: false,                      // Definir como falso si no se usa TLS/SSL
      auth: {
        user: process.env.EMAIL_USER,     // Usuario para la autenticación
        pass: process.env.EMAIL_PASS,     // Contraseña del usuario para autenticación
      },
    });

    // Desestructuración de los datos recibidos en la función
    const { Cor_User, Nom_User, token } = datos;

    // Configuración del contenido del correo electrónico
    const mailOptions = {
      from: '"SENA EMPRESA - LA GRANJA" <linarrsbarraganjuandavid@gmail.com>',  // Dirección de envío
      to: Cor_User,   // Correo electrónico del destinatario
      subject: "Reestablece tu Contraseña",  // Asunto del correo
      text: "Reestablece tu Contraseña",    // Contenido en texto plano
      html: `<p>Hola ${Nom_User}, has solicitado reestablecer tu Contraseña.</p>
                <p>Sigue el siguiente enlace para generar una nueva Contraseña: 
                    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">
                        Reestablecer Contraseña
                    </a>
                </p>
                <p>Si tú no solicitaste este cambio, ignora este mensaje.</p>`,  // Contenido en formato HTML
    };

    // Envío del correo electrónico utilizando el transportador configurado
    const info = await transporter.sendMail(mailOptions);

    // Registro del éxito en el log
    logger.info(`Email enviado a ${Cor_User}: ${info.messageId}`);

    // Retorno de la respuesta con el estado de éxito y el ID del mensaje
    return { Status: true, Message: info.messageId };

  } catch (error) {
    // Registro de error en caso de que ocurra algún fallo durante el envío del correo
    logger.error(`Error al enviar el correo a ${datos.Cor_User}: ${error.message}`);

    // Retorno de la respuesta con estado de fallo y el mensaje de error
    return { Status: false, Message: error.message };
  }
};
