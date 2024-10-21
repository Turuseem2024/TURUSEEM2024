import express from 'express';
import multer from 'multer';


import {
  getAllTurnosEspeciales,
  getTurnoEspecial,
  createTurnoEspecial,
  updateTurnoEspecial,
  deleteTurnoEspecial,
  getTurnoEspecialForFichas
} from '../controller/turnoEspecialController.js';
import checkAuth from '../middleware/authMiddleware.js';

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


router
  .route('/')
  .get( checkAuth, getAllTurnosEspeciales )
  .post( checkAuth,upload.single( 'Img_Asistencia' ), createTurnoEspecial );

router
  .route( '/:Id_TurnoEspecial' )
  .get( checkAuth, getTurnoEspecial )
  .put(checkAuth,upload.single('Img_Asistencia' ), updateTurnoEspecial )
  .delete(checkAuth, deleteTurnoEspecial );
router.get('/consulta/:Id_Ficha', getTurnoEspecialForFichas)

export default router;