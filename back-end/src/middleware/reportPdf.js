import fs from "fs";
import pdf from "html-pdf";
import * as cheerio from "cheerio";

const reportPDF = async (req, res) => {
  const { innerHTML, titleModul } = req.body;

  // Leer la plantilla del archivo
  let plantillaHtml;
  let Raiz = process.cwd()
  try {
    plantillaHtml = fs.readFileSync(
      `${Raiz}/public/plantillas/pantillaPDF.html`,
      "utf-8"
    );
  } catch (err) {
    return res.status(500).json({ error: 'Error reading template file' });
  }

  // Cargar el innerHTML con cheerio para limpiarlo
  const $ = cheerio.load(innerHTML);

  // Eliminar la columna de acciones (asumiendo que es la última columna)
  $('th:last-child, td:last-child').remove();

  // Eliminar todas las clases y estilos en los elementos
  $('[class]').removeAttr('class');
  $('[style]').removeAttr('style');

  // Obtener el HTML limpio
  const cleanedHtml = $.html();

  // Reemplazar el marcador en la plantilla con el HTML limpio
  const htmlContent = plantillaHtml.replace("{{tablaPDF}}", cleanedHtml).replace("{{titleModul}}", titleModul);

  const options = {
    format: 'A3',
    orientation: 'landscape',
    border: '10mm'
  };

  // Crear el PDF
  pdf.create(htmlContent, options).toBuffer((err, buffer) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating PDF', details: err });
    }

    const base64 = buffer.toString("base64");
    res.status(200).json({ Reporte: base64 });
  });
};

export default reportPDF;
