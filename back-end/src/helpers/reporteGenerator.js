import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

/**
 * Genera un archivo Excel con los datos proporcionados.
 * 
 * Esta función toma un array de objetos como datos de entrada y genera un archivo
 * Excel con esos datos. Cada objeto en el array representa una fila en el archivo
 * Excel, y las claves de los objetos se utilizan como los encabezados de las columnas.
 * 
 * @param {Array<Object>} data - Datos a incluir en el reporte. Cada objeto representa una fila.
 * @param {string} fileName - Nombre del archivo Excel a generar, incluyendo la extensión (.xlsx).
 * 
 * @returns {Promise<void>} - Promesa que se resuelve cuando el archivo se genera correctamente.
 * 
 * @throws {Error} - Si no se proporcionan datos válidos o si ocurre algún error al generar el archivo.
 */
export async function generarReporteExcel(data, fileName) {
  try {
    // Validar datos: Asegurarse de que 'data' es un array no vacío
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No hay datos para generar el reporte');
    }

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    // Agregar una nueva hoja al libro con el nombre 'Reporte'
    const worksheet = workbook.addWorksheet('Reporte');

    // Agregar encabezados: Los encabezados son las claves del primer objeto en los datos
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Agregar los datos de las filas
    data.forEach((row) => {
      const rowData = headers.map((header) => row[header]);
      worksheet.addRow(rowData);
    });

    // Estilizar los encabezados de las columnas
    worksheet.getRow(1).eachCell((cell) => {
      // Poner los encabezados en negrita
      cell.font = { bold: true };
      // Centrar el texto de los encabezados
      cell.alignment = { horizontal: 'center' };
      // Establecer el color de fondo de los encabezados como amarillo
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFCC00' }, // Amarillo
      };
    });

    // Ajustar el ancho de las columnas automáticamente según el contenido
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        // Calcular la longitud máxima de los valores en la columna
        const cellValue = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      // Ajustar el ancho de la columna sumando un pequeño margen adicional
      column.width = maxLength + 2; // Ajuste adicional
    });

    // Crear directorio de salida si no existe
    const outputDir = path.resolve('reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Guardar el archivo en el directorio de salida con el nombre proporcionado
    const filePath = path.join(outputDir, fileName);
    await workbook.xlsx.writeFile(filePath);

    // Imprimir un mensaje de éxito con la ruta del archivo generado
    console.log(`Reporte generado exitosamente: ${filePath}`);
  } catch (error) {
    // En caso de error, imprimir un mensaje y lanzar el error
    console.error(`Error al generar el reporte: ${error.message}`);
    throw error;
  }
}
