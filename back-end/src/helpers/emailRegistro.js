// Importación de nodemailer para enviar correos electrónicos
import nodemailer from 'nodemailer';

/**
 * Función para enviar un correo de registro a un usuario con el enlace para confirmar su cuenta.
 * Utiliza nodemailer para configurar el transporte y enviar el correo.
 * 
 * @param {Object} datos - Los datos del usuario que se utilizarán en el correo.
 * @param {string} datos.Email_User - El correo electrónico del usuario destinatario.
 * @param {string} datos.Nom_User - El nombre del usuario que se utilizará en el correo.
 * @param {string} datos.token - El token de confirmación de la cuenta, que se incluye en el enlace de validación.
 */
export const emailRegistro = async (datos) => {
  // Configuración del transportador de nodemailer para enviar el correo
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Utiliza el servicio de Gmail para el envío de correos electrónicos
    auth: {
      user: process.env.EMAIL_USER, // Usuario del correo, que debe ser la dirección de correo registrada
      pass: process.env.EMAIL_PASS, // Contraseña de la aplicación para autenticar el acceso a la cuenta de correo
    },
  });

  // Extraemos los valores necesarios del objeto de datos proporcionado
  const { Email_User, Nom_User, token } = datos;

  // Configuración del correo a enviar
  const mailOptions = {
    from: `"SENA EMPRESA - LA GRANJA" <${process.env.EMAIL_USER}>`, // Dirección del remitente (nombre y dirección de correo)
    to: Email_User, // Dirección del destinatario (correo electrónico del usuario)
    subject: "Comprueba tu cuenta en TURUSEEM", // Asunto del correo
    text: `Hola ${Nom_User}, comprueba tu cuenta en TURUSEEM. Tu cuenta ya está lista, pero debes comprobarla en el siguiente enlace: ${process.env.FRONTEND_URL}/confirmar/${token}. Si tú no creaste esta cuenta, ignora este mensaje.`, // Contenido del correo en formato texto plano
    html: `<p>Hola ${Nom_User}, comprueba tu cuenta en TURUSEEM</p>
           <p>Tu cuenta ya está lista, pero debes comprobarla en el siguiente enlace: 
           <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
           <p>Si tú no creaste esta cuenta, ignora este mensaje</p>`, // Contenido en formato HTML, con enlace de confirmación
  };

  try {
    // Enviamos el correo utilizando nodemailer
    const info = await transporter.sendMail(mailOptions);
    // En caso de éxito, mostramos el ID del mensaje enviado
    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    // Si ocurre un error, lo manejamos y mostramos un mensaje en consola
    console.error("Error al enviar el correo:", error);
  }
};
