import express from "express";
import {
  getAllTurnosEspecialesAprendices,
  getTurnoEspecialAprendiz,
  createTurnoEspecialAprendiz,
  updateTurnoEspecialAprendiz,
  deleteTurnoEspecialAprendiz,
} from "../controller/turnoEspecialAprendizController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllTurnosEspecialesAprendices)
  .post(checkAuth, createTurnoEspecialAprendiz);
router
  .route("/:Id_TurnoEspecial")
  .get(checkAuth, getTurnoEspecialAprendiz)
  // .put(checkAuth, updateTurnoEspecialAprendiz)
  .delete(checkAuth, deleteTurnoEspecialAprendiz);
router.route('/:Id_TurnoEspecial').put(checkAuth, updateTurnoEspecialAprendiz);

export default router;
