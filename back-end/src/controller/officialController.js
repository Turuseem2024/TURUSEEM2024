import { logger } from "../middleware/logMiddleware.js";
import {
  getAllFuncionariosService,
  getFuncionarioService,
  createFuncionarioService,
  updateFuncionarioService,
  deleteFuncionarioService,
} from "../services/officialService.js";

// Controlador para obtener todos los funcionarios
export const getAllFuncionarios = async (req, res) => {
  try {
    const funcionarios = await getAllFuncionariosService();
    if (funcionarios.length > 0) {
      return res.status(200).json(funcionarios);
    } else {
      return res
        .status(404)
        .json({ message: "No se encontraron funcionarios registrados." });
    }
  } catch (error) {
    logger.error(`Error al obtener los funcionarios: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error al recuperar los funcionarios." });
  }
};

// Controlador para obtener un funcionario específico por ID
export const getFuncionario = async (req, res) => {
  try {
    const funcionario = await getFuncionarioService(req.params.Id_Funcionario);
    if (funcionario) {
      return res.status(200).json(funcionario);
    } else {
      return res.status(404).json({ message: "Funcionario no encontrado" });
    }
  } catch (error) {
    logger.error(`Error al obtener el funcionario: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error al recuperar el funcionario." });
  }
};

// Controlador para crear un nuevo funcionario
export const createFuncionario = async (req, res) => {
  try {
    const newFuncionario = await createFuncionarioService(req.body);
    if (newFuncionario) {
      return res.status(201).json(newFuncionario);
    } else {
      return res
        .status(400)
        .json({ message: "No se pudo crear el funcionario." });
    }
  } catch (error) {
    logger.error(`Error al crear el funcionario: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error al registrar el funcionario." });
  }
};

// Controlador para actualizar un funcionario existente
export const updateFuncionario = async (req, res) => {
  try {
    const [updated] = await updateFuncionarioService(
      req.params.Id_Funcionario,
      req.body
    );
    if (updated === 0) {
      return res.status(404).json({ message: "Funcionario no encontrado" });
    } else {
      return res.json({ message: "Funcionario actualizado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al actualizar el funcionario: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error al actualizar el funcionario." });
  }
};

// Controlador para eliminar un funcionario existente
export const deleteFuncionario = async (req, res) => {
  try {
    const result = await deleteFuncionarioService(
      req.params.Id_Funcionario
    );
    if (result === 0) {
      return res.status(404).json({ message: "Funcionario no encontrado" });
    } else {
      return res.json({ message: "Funcionario eliminado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al eliminar el funcionario: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error al eliminar el funcionario." });
  }
};
