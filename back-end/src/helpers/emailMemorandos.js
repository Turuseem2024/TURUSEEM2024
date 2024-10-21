import nodemailer from "nodemailer";
import { logger } from "../middleware/logMiddleware.js";

export const emailMemorandos = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const {
    Cor_Aprendiz,
    Nom_Aprendiz,
    Tot_Memorandos,
    Nom_TalentoHumano,
    Nom_ProgramaFormacion,
    trimestreActual,
    añoActual,
    pdfBase64,
  } = datos;

  const mailOptions = {
    from: '"SENA EMPRESA - LA GRANJA" <linarrsbarraganjuandavid@gmail.com>',
    to: Cor_Aprendiz,
    subject: `Memorando #${Tot_Memorandos}`,
    text: "Reestablece tu Contraseña",
    html: `
      <p>Buen día ${Nom_Aprendiz}, recibe un cordial saludo.</p>
      <p>A continuación, adjunto su ${Tot_Memorandos} memorando de Sena Empresa. Tienes 48 horas para responder por escrito o presentar excusa. Recuerda que después del segundo memorando recibes comité disciplinario.</p>
      <p>${Nom_TalentoHumano}</p>
      <p>LÍDER TALENTO HUMANO</p>
      <p>${Nom_ProgramaFormacion}</p>
      <p>${trimestreActual} TRIMESTRE SENA EMPRESA ${añoActual}</p>
    `,
    attachments: [
      {
        filename: `Memorando_${Tot_Memorandos}.pdf`,
        content: pdfBase64,
        encoding: 'base64',
        contentType: "application/pdf"
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info.messageId);
    return true; // Indica que el correo fue enviado correctamente
  } catch (error) {
    logger.error(error);
    console.error("Error enviando el email:", error);
    return false; // Indica que el envío del correo falló
  }
};