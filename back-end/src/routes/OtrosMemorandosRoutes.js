import express from "express";
import {
  getAllOtrosMemorandum,
  getOtroMemorandum,
  createOtroMemorandum,
  updateOtroMemorandum,
  deleteOtroMemorandum,
  viewOtherMemorandumPdf,
  sendMemorandumPdf
} from "../controller/otrosMemorandosController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllOtrosMemorandum)
  .post(checkAuth, createOtroMemorandum)
router
  .route("/:Id_OtroMemorando")
  .get(checkAuth, getOtroMemorandum)
  .put(checkAuth, updateOtroMemorandum)
  .delete(checkAuth, deleteOtroMemorandum)

router.route("/view/pdf/:Id_OtroMemorando")
  .post( viewOtherMemorandumPdf);

router.route("/send/pdf/:Id_OtroMemorando")
  .post( sendMemorandumPdf);


export default router;
