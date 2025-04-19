import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

/**
 * Genera un archivo Excel con los datos proporcionados.
 * @param {Array<Object>} data - Datos a incluir en el reporte. Cada objeto representa una fila.
 * @param {string} fileName - Nombre del archivo Excel a generar.
 * @returns {Promise<void>} - Promesa que se resuelve cuando el archivo se genera correctamente.
 */
export async function generarReporteExcel(data, fileName) {
  try {
    // Validar datos
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No hay datos para generar el reporte');
    }

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    // Agregar encabezados
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Agregar datos
    data.forEach((row) => {
      const rowData = headers.map((header) => row[header]);
      worksheet.addRow(rowData);
    });

    // Estilizar encabezados
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFCC00' }, // Amarillo
      };
    });

    // Ajustar ancho de columnas automáticamente
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 2; // Ajuste adicional
    });

    // Crear directorio si no existe
    const outputDir = path.resolve('reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Guardar archivo
    const filePath = path.join(outputDir, fileName);
    await workbook.xlsx.writeFile(filePath);

    console.log(`Reporte generado exitosamente: ${filePath}`);
  } catch (error) {
    console.error(`Error al generar el reporte: ${error.message}`);
    throw error;
  }
}