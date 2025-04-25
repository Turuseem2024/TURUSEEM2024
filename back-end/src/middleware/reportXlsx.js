// Importación de la librería xlsx para manipular y generar archivos Excel
import xlsx from 'xlsx';

/**
 * Genera un archivo Excel (XLSX) a partir de los datos proporcionados en la solicitud.
 * 
 * @param {Object} req - Objeto de solicitud que contiene los datos del reporte en el cuerpo de la solicitud.
 * @param {Object} res - Objeto de respuesta que se utiliza para devolver el archivo Excel en formato base64.
 */
const reportXLSX = (req, res) => {
  // Extracción de las cabeceras y las filas desde el cuerpo de la solicitud
  const { headers, rows } = req.body;

  // Crea un nuevo libro de trabajo (workbook)
  const wb = xlsx.utils.book_new();

  // Convierte los datos en un formato de hoja compatible con XLSX
  // 'headers' representa las cabeceras de la tabla, y 'rows' representa las filas de datos
  const wsData = [headers, ...rows];  // Combina las cabeceras con las filas de datos
  const ws = xlsx.utils.aoa_to_sheet(wsData);  // Convierte el arreglo de arreglos en una hoja de cálculo

  // Añade la hoja de cálculo al libro de trabajo (workbook) con el nombre 'Tabla'
  xlsx.utils.book_append_sheet(wb, ws, 'Tabla');

  // Escribe el archivo en memoria y lo convierte a base64 para ser retornado en la respuesta
  const buffer = xlsx.write(wb, { type: 'base64', bookType: 'xlsx' });

  // Retorna el archivo generado en formato base64
  res.json({ base64: buffer });
};

// Exporta la función 'reportXLSX' para que pueda ser utilizada en otros archivos
export default reportXLSX;
