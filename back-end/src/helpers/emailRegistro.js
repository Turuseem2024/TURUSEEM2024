import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  // Configuración del transportador de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Utiliza el servicio de Gmail para enviar correos
    auth: {
      user: process.env.EMAIL_USER, // Usuario del correo (tu dirección de correo)
      pass: process.env.EMAIL_PASS, // Contraseña de aplicaciones del correo
    },
  });

  const { Cor_User, Nom_User, token } = datos;

  // Configuración del correo a enviar
  const mailOptions = {
    from: `"SENA EMPRESA - LA GRANJA" <${process.env.EMAIL_USER}>`, // Dirección del remitente
    to: Cor_User, // Dirección del correo electronico del destinatario
    subject: "Comprueba tu cuenta en TURUSEEM", // Asunto del correo
    text: `Hola ${Nom_User}, comprueba tu cuenta en TURUSEEM. Tu cuenta ya está lista, pero debes comprobarla en el siguiente enlace: ${process.env.FRONTEND_URL}/confirmar/${token}. Si tú no creaste esta cuenta, ignora este mensaje.`, // Contenido en texto plano
    html: `<p>Hola ${Nom_User}, comprueba tu cuenta en TURUSEEM</p>
           <p>Tu cuenta ya está lista, pero debes comprobarla en el siguiente enlace: 
           <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
           <p>Si tú no creaste esta cuenta, ignora este mensaje</p>`, // Contenido en HTML
  };

  try {
    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info.messageId); // Mensaje de confirmación
  } catch (error) {
    console.error("Error al enviar el correo:", error); // Manejo de errores
  }
};
