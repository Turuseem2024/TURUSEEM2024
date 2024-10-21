import express from "express";
import {getAllAreas,getUnidadesByArea,getAprendicesByArea } from "../controller/areaController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllAreas)

router.get('/:Id_Area/unidades',checkAuth, getUnidadesByArea);
router.get('/:Id_Area/aprendices', checkAuth, getAprendicesByArea); // Ruta para obtener aprendices por área
export default router;
