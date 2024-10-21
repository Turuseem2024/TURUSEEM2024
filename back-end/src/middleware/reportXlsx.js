import xlsx from 'xlsx'


const reportXLSX = (req, res) => {
  const { headers, rows } = req.body;

  // Crea un nuevo workbook
  const wb = xlsx.utils.book_new();

  // Convierte los datos en un formato compatible con XLSX
  const wsData = [headers, ...rows];
  const ws = xlsx.utils.aoa_to_sheet(wsData);

  // Añade la hoja al workbook
  xlsx.utils.book_append_sheet(wb, ws, 'Tabla');

  // Escribe el archivo en memoria y lo convierte a base64
  const buffer = xlsx.write(wb, { type: 'base64', bookType: 'xlsx' });

  // Retorna el archivo en base64
  res.json({ base64: buffer });
}
export default reportXLSX


