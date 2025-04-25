// // Importación de módulos necesarios
// import express from 'express';  // Se importa 'express' para manejar las rutas y la lógica del servidor.
// import xlsx from 'xlsx';  // Se importa la librería 'xlsx' para trabajar con archivos Excel.
// import path from 'path';  // Se importa 'path' para manejar rutas de archivos.
// import { fileURLToPath } from 'url';  // Se importa 'fileURLToPath' para obtener la ruta absoluta del archivo actual.

// // Se crea una nueva instancia del enrutador de Express
// const router = express.Router();

// // Obtener la ruta absoluta del archivo actual utilizando 'fileURLToPath' y 'url'.
// // 'import.meta.url' contiene la URL del módulo actual.
// const __filename = fileURLToPath(import.meta.url);  
// // 'path.dirname' extrae la ruta del directorio del archivo actual a partir de la ruta completa.
// const __dirname = path.dirname(__filename);  

// // Ruta definida para generar el archivo Excel
// router.get('/generate-excel', (req, res) => {
  
//   // Datos de ejemplo que serán convertidos a un archivo Excel.
//   const data = [
//     { Name: 'John Doe', Age: 28, Email: 'john@example.com' },  // Primer objeto con datos de una persona.
//     { Name: 'Jane Smith', Age: 34, Email: 'jane@example.com' }  // Segundo objeto con datos de otra persona.
//   ];

//   // Convierte los datos JSON a una hoja de trabajo de Excel utilizando 'xlsx.utils.json_to_sheet'.
//   const worksheet = xlsx.utils.json_to_sheet(data);
  
//   // Crea un nuevo libro de trabajo de Excel.
//   const workbook = xlsx.utils.book_new();
  
//   // Agrega la hoja de trabajo al libro de trabajo. 'Sheet1' es el nombre de la hoja.
//   xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

//   // Define la ruta donde se guardará el archivo Excel generado.
//   // 'path.join' se utiliza para crear una ruta que sea compatible con el sistema operativo.
//   const excelPath = path.join(__dirname, '../output/generated.xlsx');
  
//   // Escribe el archivo Excel en el sistema de archivos.
//   xlsx.writeFile(workbook, excelPath);

//   // Envía el archivo Excel generado como respuesta al cliente.
//   res.sendFile(excelPath);  // 'res.sendFile' sirve para enviar un archivo como respuesta.
// });

// // Se exporta el enrutador para ser utilizado en otras partes de la aplicación.
// export default router;
