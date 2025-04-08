// controllers/unitController.js
import { logger } from "../middleware/logMiddleware.js";
import {
  findAllUnits,
  findUnitById,
  createUnitService,
  updateUnitService,
  deleteUnitService,
} from "../services/unitService.js";

export const getAllUnits = async (req, res) => {
  try {
    const units = await findAllUnits();

    if (units.length > 0) {
      return res.status(200).json(units);
    } else {
      return res.status(404).json({
        message: "No se encontraron unidades registradas.",
      });
    }
  } catch (error) {
    logger.error("Error fetching units: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar las unidades.",
    });
  }
};

export const getUnit = async (req, res) => {
  try {
    const unit = await findUnitById(req.params.Id_Unidad);

    if (unit) {
      return res.status(200).json(unit);
    } else {
      return res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    logger.error("Error fetching unit: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar la unidad.",
    });
  }
};

export const createUnit = async (req, res) => {
  try {
    // Validación: Verificar que el nombre de la unidad no esté vacío.
    const { Nom_Unidad } = req.body;
    if (!Nom_Unidad || Nom_Unidad.trim() === "") {
      return res.status(400).json({
        message: "El nombre de la unidad no puede ir vacío",
      });
    }

    // Crear la nueva unidad mediante el servicio.
    const newUnit = await createUnitService(req.body);

    return res.status(201).json({
      status: "success",
      message: "Unidad registrada correctamente!",
      data: {
        id: newUnit.id,
        name: newUnit.name,
        // Puedes agregar otros campos que consideres necesarios.
      },
    });
  } catch (error) {
    logger.error("Error creating unit: ", error.message);
    return res.status(400).json({
      status: "error",
      message: "Error al registrar la unidad.",
      error: error.message,
    });
  }
};

export const updateUnit = async (req, res) => {
  try {
    // Actualizar la unidad mediante el servicio.
    const [updated] = await updateUnitService(req.params.Id_Unidad, req.body);

    if (updated) {
      return res.json({
        message: "Unidad actualizada correctamente!",
      });
    } else {
      return res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    logger.error("Error updating unit: ", error.message);
    return res.status(400).json({
      message: "Error al actualizar la unidad.",
      error: error.message,
    });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    // Eliminar la unidad mediante el servicio.
    const deleted = await deleteUnitService(req.params.Id_Unidad);

    if (deleted) {
      return res.json({
        message: "Unidad borrada correctamente!",
      });
    } else {
      return res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    logger.error("Error deleting unit: ", error.message);
    return res.status(400).json({
      message: "Error al borrar la unidad.",
      error: error.message,
    });
  }
};
