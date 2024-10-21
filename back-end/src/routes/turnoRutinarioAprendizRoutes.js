import express from "express";
import {
  getAllTurnosRutinariosAprendices,
  getTurnoRutinarioAprendiz,
  createTurnoRutinarioAprendiz,
  updateTurnoRutinarioAprendiz,
  deleteTurnoRutinarioAprendiz,
} from "../controller/turnoRutinarioAprendizController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllTurnosRutinariosAprendices)
  .post(checkAuth, createTurnoRutinarioAprendiz);
router
  .route("/:Id_TurnoRutinarioAprendiz")
  .get(checkAuth, getTurnoRutinarioAprendiz)
  .put(checkAuth, updateTurnoRutinarioAprendiz)
  .delete(checkAuth, deleteTurnoRutinarioAprendiz);

export default router;
