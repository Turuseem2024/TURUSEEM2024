
import express from "express";

import multer from "multer";

import {
  createApprentice,
  deleteApprentice,
  getAllApprentices,
  getApprentice,
  updateApprentice,
  importCSV

} from "../controller/apprenticeController.js";
import checkAuth from "../middleware/authMiddleware.js";


const router = express.Router();


const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/') // Asegúrate de que este directorio exista
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
});

import { updateInasistencia } from "../controller/turnoRutinarioController.js";


router
  .route("/")
  .get(checkAuth, getAllApprentices)
  .post(checkAuth,upload.single('Foto_Aprendiz'), createApprentice);
router
  .route("/:Id_Aprendiz")
  .get(checkAuth, getApprentice)
  .put(upload.single('Foto_Aprendiz'), updateApprentice)
  .delete(checkAuth, deleteApprentice);


router.put('/actualizar-inasistencia/:Id_Aprendiz',checkAuth,updateInasistencia)

  
// Ruta para importar CSV de aprendices
router.post("/import-csv", checkAuth, upload.single('file'), importCSV);

export default router;