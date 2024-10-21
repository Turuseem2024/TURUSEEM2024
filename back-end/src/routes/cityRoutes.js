import express from "express";
import { getAllCities } from "../controller/cityController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllCities)

export default router;