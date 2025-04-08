import { logger } from "../middleware/logMiddleware.js";
import {
  getAllMemorandumsService,
  getMemorandumService,
  getTotalMemorandumsService,
  createMemorandumService,
  updateMemorandumService,
  deleteMemorandumService,
  generateMemorandumPdfService,
} from "../services/memorandumService.js";

// Controlador para obtener todos los memorandos
export const getAllMemorandum = async (req, res) => {
  try {
    const memorandums = await getAllMemorandumsService();
    if (memorandums.length > 0) {
      return res.status(200).json(memorandums);
    } else {
      return res.status(404).json({
        message: "No se encontraron memorandos.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandums: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar los memorandos.",
    });
  }
};

// Controlador para obtener un memorando específico por ID
export const getMemorandum = async (req, res) => {
  try {
    const memorandum = await getMemorandumService(req.params.Id_Memorando);
    if (memorandum) {
      return res.status(200).json(memorandum);
    } else {
      return res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandum: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar el memorando.",
    });
  }
};

// Controlador para obtener el total de memorandos
export const getTotalMemorandums = async () => {
  try {
    return await getTotalMemorandumsService();
  } catch (error) {
    logger.error("Error obteniendo el total de memorandos: ", error.message);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

// Controlador para crear un nuevo memorando
export const createMemorandum = async (req, res) => {
  try {
    const { newMemorandum } = await createMemorandumService(req.body);
    return res.status(201).json({
      message: "Memorando registrado correctamente!",
      data: newMemorandum,
    });
  } catch (error) {
    logger.error("Error creating memorandum: ", error.message);
    return res.status(400).json({
      message: "Error al registrar el memorando.",
      error: error.message,
    });
  }
};

// Controlador para actualizar un memorando existente
export const updateMemorandum = async (req, res) => {
  try {
    const [updated] = await updateMemorandumService(req.params.Id_Memorando, req.body);
    if (updated) {
      return res.json({
        message: "Memorando actualizado correctamente!",
      });
    } else {
      return res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error updating memorandum: ", error.message);
    return res.status(400).json({
      message: "Error al actualizar el memorando.",
      error: error.message,
    });
  }
};

// Controlador para eliminar un memorando existente
export const deleteMemorandum = async (req, res) => {
  try {
    const deleted = await deleteMemorandumService(req.params.Id_Memorando);
    if (deleted) {
      return res.json({
        message: "Memorando borrado correctamente!",
      });
    } else {
      return res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error deleting memorandum: ", error.message);
    return res.status(400).json({
      message: "Error al borrar el memorando.",
      error: error.message,
    });
  }
};

// Controlador para generar un PDF de memorando
export const generateMemorandumPdf = async (req, res) => {
  try {
    // Suponiendo que se reciben en el body el objeto 'memorandum' y el total de memorandos
    const { memorandum, totalMemorandums } = req.body;
    const pdfResult = await generateMemorandumPdfService(memorandum, totalMemorandums);
    return res.status(200).json(pdfResult);
  } catch (error) {
    logger.error("Error generating PDF: ", error.message);
    return res.status(500).json({ message: "Error al generar el PDF." });
  }
};
