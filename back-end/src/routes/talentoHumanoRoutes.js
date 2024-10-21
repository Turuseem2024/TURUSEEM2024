import express from "express";
import {
  getAllTalentoHumano,
  getTalentoHumano,
  createTalentoHumano,
  updateTalentoHumano,
  deleteTalentoHumano,
} from "../controller/talentoHumanoController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllTalentoHumano)
  .post(checkAuth, createTalentoHumano);
router
  .route("/:Id_Talento_Humano")
  .get(checkAuth, getTalentoHumano)
  .put(checkAuth, updateTalentoHumano)
  .delete(checkAuth, deleteTalentoHumano);

export default router;
