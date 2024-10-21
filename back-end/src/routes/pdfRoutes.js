// import express from 'express';
// import pdf from 'html-pdf';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { getUnit } from '../controller/unitControllers.js'; // Reemplaza con el módulo real

// const router = express.Router();

// // Obtener la ruta absoluta actual
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// router.get('/generate-pdf', async (req, res) => {
//     try {
//       // Obtener datos de la base de datos
//       const unidades = await getUnit();
  
//       // Leer la plantilla HTML
//       const templatePath = path.join(__dirname, '../templates/template.html');
//       let html = fs.readFileSync(templatePath, 'utf8');
  
//       // Reemplaza los datos en la plantilla HTML
//       const dataTableRows = unidades.map(unit => `
//         <tr>
//           <td>${unit.Id_Unidad}</td>
//           <td>${unit.Nom_Unidad}</td>
//           <td>${unit.Hor_Apertura}</td>
//           <td>${unit.Hor_Cierre}</td>
//           <td>${unit.Estado}</td>
//           <td>${unit.areas?.Nom_Area || 'N/A'}</td>
//         </tr>
//       `).join('');
  
//       html = html.replace('{{unidades}}', dataTableRows);
  
//       // Generar el PDF
//       const options = { format: 'Letter' };
//       const pdfPath = path.join(__dirname, '../output/generated.pdf');
  
//       pdf.create(html, options).toFile(pdfPath, (err, result) => {
//         if (err) {
//           console.error('Error al generar el PDF:', err); // Agregar este log
//           return res.status(500).send('Error generando el PDF');
//         }
//         // Enviar el PDF generado como respuesta
//         res.sendFile(pdfPath);
//       });
//     } catch (error) {
//       console.error('Error al obtener los datos o procesar el PDF:', error); // Agregar este log
//       res.status(500).send('Error obteniendo los datos');
//     }
//   });
  

// export default router;
