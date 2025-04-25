// Importación de los módulos necesarios
import fs from "fs"; // Módulo para interactuar con el sistema de archivos
import pdf from "html-pdf"; // Módulo para generar PDFs a partir de HTML
import * as cheerio from "cheerio"; // Módulo para manipular y limpiar el HTML

/**
 * Función para generar un reporte en formato PDF a partir de un HTML proporcionado.
 * 
 * Esta función toma el HTML recibido en el cuerpo de la solicitud, lo limpia eliminando
 * columnas no deseadas y cualquier estilo o clase, luego lo inserta en una plantilla HTML,
 * y finalmente genera un archivo PDF con ese contenido.
 * 
 * @param {Object} req - La solicitud HTTP que contiene los datos necesarios para generar el reporte.
 * @param {Object} res - La respuesta HTTP que se utiliza para devolver el PDF generado.
 * @returns {void}
 */
const reportPDF = async (req, res) => {
  // Desestructuración del cuerpo de la solicitud para obtener el innerHTML y el título del módulo
  const { innerHTML, titleModul } = req.body;

  // Leer la plantilla del archivo HTML que servirá como base para el reporte
  let plantillaHtml;
  let Raiz = process.cwd(); // Obtener la ruta del directorio de trabajo actual
  try {
    // Intentar leer el archivo de la plantilla desde el sistema de archivos
    plantillaHtml = fs.readFileSync(
      `${Raiz}/public/plantillas/pantillaPDF.html`, // Ruta al archivo de plantilla HTML
      "utf-8" // Codificación al leer el archivo
    );
  } catch (err) {
    // Si ocurre un error al leer el archivo, devolver un error 500
    return res.status(500).json({ error: 'Error reading template file' });
  }

  // Cargar el innerHTML recibido con cheerio para limpiarlo y modificarlo
  const $ = cheerio.load(innerHTML);

  // Eliminar la columna de acciones (asumiendo que es la última columna)
  $('th:last-child, td:last-child').remove(); // Eliminar la última columna en la tabla

  // Eliminar todas las clases y estilos de los elementos HTML
  $('[class]').removeAttr('class'); // Eliminar los atributos de clase
  $('[style]').removeAttr('style'); // Eliminar los atributos de estilo en línea

  // Obtener el HTML limpio después de las modificaciones
  const cleanedHtml = $.html();

  // Reemplazar los marcadores de posición en la plantilla con el HTML limpio y el título del módulo
  const htmlContent = plantillaHtml.replace("{{tablaPDF}}", cleanedHtml).replace("{{titleModul}}", titleModul);

  // Configuración de las opciones para la generación del PDF
  const options = {
    format: 'A3', // Tamaño de página (A3)
    orientation: 'landscape', // Orientación de la página (horizontal)
    border: '10mm' // Bordes del documento
  };

  // Generar el PDF a partir del contenido HTML y las opciones configuradas
  pdf.create(htmlContent, options).toBuffer((err, buffer) => {
    if (err) {
      // Si ocurre un error durante la generación del PDF, devolver un error 500
      return res.status(500).json({ error: 'Error generating PDF', details: err });
    }

    // Convertir el buffer del PDF a base64 para enviarlo como respuesta
    const base64 = buffer.toString("base64");
    // Enviar la respuesta con el PDF en base64
    res.status(200).json({ Reporte: base64 });
  });
};

export default reportPDF; // Exportar la función para ser utilizada en otras partes de la aplicación
