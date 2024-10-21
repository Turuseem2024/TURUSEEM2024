import express from "express";
import {
  getAllUnits,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit

} from "../controller/unitControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllUnits)
  .post(checkAuth, createUnit);
router
  .route("/:Id_Unidad")
  .get(checkAuth, getUnit)
  .put(checkAuth, updateUnit)
  .delete(checkAuth, deleteUnit);

export default router;
