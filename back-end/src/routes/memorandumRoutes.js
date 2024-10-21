import express from "express";
import {
  getAllMemorandum,
  getMemorandum,
  createMemorandum,
  updateMemorandum,
  deleteMemorandum,
} from "../controller/memorandumController.js"
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllMemorandum)
  .post(checkAuth, createMemorandum);
router
  .route("/:Id_Memorando")
  .get(checkAuth, getMemorandum)
  .put(checkAuth, updateMemorandum)
  .delete(checkAuth, deleteMemorandum);

export default router;
