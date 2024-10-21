// import express from 'express';
// import xlsx from 'xlsx';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const router = express.Router();

// // Obtener la ruta absoluta actual
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ruta para generar el archivo Excel
// router.get('/generate-excel', (req, res) => {
//   const data = [
//     { Name: 'John Doe', Age: 28, Email: 'john@example.com' },x
//     { Name: 'Jane Smith', Age: 34, Email: 'jane@example.com' }
//   ];

//   const worksheet = xlsx.utils.json_to_sheet(data);
//   const workbook = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

//   // Guardar el archivo Excel en una ruta temporal
//   const excelPath = path.join(__dirname, '../output/generated.xlsx');
//   xlsx.writeFile(workbook, excelPath);

//   // Enviar el archivo Excel como respuesta
//   res.sendFile(excelPath);
// });

// export default router;
