import OfficialModel from "../models/officialModel.js";
import { logger } from "../middleware/logMiddleware.js";

// Controlador para obtener todos los funcionarios
export const getAllFuncionarios = async (req, res) => {
  try {
    const Funcionarios = await OfficialModel.findAll();
    if (Funcionarios.length > 0) {
      return res.status(200).json(Funcionarios);
    } else {
      return res.status(404).json({ message: "No se encontraron funcionarios registrados." });
    }
  } catch (error) {
    logger.error(`Error al obtener los funcionarios: ${error.message}`);
    return res.status(500).json({ message: "Error al recuperar los funcionarios." });
  }
};

// Controlador para obtener un funcionario específico por ID
export const getFuncionario = async (req, res) => {
  try {
    const Funcionario = await OfficialModel.findByPk(req.params.Id_Funcionario);
    if (Funcionario) {
      return res.status(200).json(Funcionario);
    } else {
      return res.status(404).json({ message: "Funcionario no encontrado" });
    }
  } catch (error) {
    logger.error(`Error al obtener el funcionario: ${error.message}`);
    return res.status(500).json({ message: "Error al recuperar el funcionario." });
  }
};

// Controlador para crear un nuevo funcionario
export const createFuncionario = async (req, res) => {
  try {
    const {
      Id_Funcionario,
      Nom_Funcionario,
      Ape_Funcionario,
      Genero,
      Tel_Funcionario,
      Estado,
      Cargo,
    } = req.body;

    const NewFuncionario = await OfficialModel.create({
      Id_Funcionario,
      Nom_Funcionario,
      Ape_Funcionario,
      Genero,
      Tel_Funcionario,
      Estado,
      Cargo,
    });

    if (NewFuncionario) {
      return res.status(201).json(NewFuncionario);
    } else {
      return res.status(400).json({ message: "No se pudo crear el funcionario." });
    }
  } catch (error) {
    logger.error(`Error al crear el funcionario: ${error.message}`);
    return res.status(500).json({ message: "Error al registrar el funcionario." });
  }
};

// Controlador para actualizar un funcionario existente
export const updateFuncionario = async (req, res) => {
  try {
    const {
      Nom_Funcionario,
      Ape_Funcionario,
      Genero,
      Tel_Funcionario,
      Estado,
      Cargo,
    } = req.body;

    const [updated] = await OfficialModel.update(
      {
        Nom_Funcionario,
        Ape_Funcionario,
        Genero,
        Tel_Funcionario,
        Estado,
        Cargo,
      },
      {
        where: { Id_Funcionario: req.params.Id_Funcionario },
      }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Funcionario no encontrado" });
    } else {
      return res.json({ message: "Funcionario actualizado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al actualizar el funcionario: ${error.message}`);
    return res.status(500).json({ message: "Error al actualizar el funcionario." });
  }
};

// Controlador para eliminar un funcionario existente
export const deleteFuncionario = async (req, res) => {
  try {
    const Result = await OfficialModel.destroy({
      where: { Id_Funcionario: req.params.Id_Funcionario },
    });

    if (Result === 0) {
      return res.status(404).json({ message: "Funcionario no encontrado" });
    } else {
      return res.json({ message: "Funcionario eliminado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al eliminar el funcionario: ${error.message}`);
    return res.status(500).json({ message: "Error al eliminar el funcionario." });
  }
};
