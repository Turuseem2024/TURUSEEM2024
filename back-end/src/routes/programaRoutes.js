import express from "express";
import {
  getAllProgramas,
  getPrograma,
  createPrograma,
  updatePrograma,
  deletePrograma,
} from "../controller/programaController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllProgramas)
  .post(checkAuth, createPrograma);
router
  .route("/:Id_ProgramaFormacion")
  .get(checkAuth, getPrograma)
  .put(checkAuth, updatePrograma)
  .delete(checkAuth, deletePrograma);

export default router;