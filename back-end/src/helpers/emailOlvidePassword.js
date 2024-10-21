import nodemailer from "nodemailer";
import { logger } from "../middleware/logMiddleware.js";

export const emailOlvidePassword = async (datos) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const { Cor_User, Nom_User, token } = datos;

  const mailOptions = {
    from: '"SENA EMPRESA - LA GRANJA" <linarrsbarraganjuandavid@gmail.com>',
    to: Cor_User,
    subject: "Reestablece tu Contraseña",
    text: "Reestablece tu Contraseña",
    html: `<p>Hola ${Nom_User}, has solicitado reestablecer tu Contraseña.</p>
                <p>Sigue el sigiente enlace para generar una nueva Contraseña: 
                    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">
                        Reestablecer Contraseña
                    </a>
                </p>
                <p>Si tú no solicitaste este cambio, ignora este mensaje.</p>`,
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email enviado a ${Cor_User}: ${info.messageId}`);
    return { Status: true, Message: info.messageId };

  } catch (error) {
    logger.error(`Error al enviar el correo a ${datos.Cor_User}: ${error.message}`);
    return { Status: false, Message: error.message };
  }
};
