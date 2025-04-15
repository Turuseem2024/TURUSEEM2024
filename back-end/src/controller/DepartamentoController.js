// Importamos las funciones del servicio que realizará las operaciones CRUD.
import {
    getAllDepartamentos,
    getDepartamentoById,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento,
  } from "../services/DepartamentoService.js";
  
  /**
   * Controlador para obtener todos los departamentos.
   */
  export const findAllDepartamentos = async (req, res) => {
    try {
      const departamentos = await getAllDepartamentos();
      res.status(200).json({
        data: departamentos,
        message: "Departamentos recuperados correctamente.",
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: error.message,
      });
    }
  };
  
  /**
   * Controlador para obtener un departamento por su ID.
   */
  export const findDepartamentoById = async (req, res) => {
    try {
      const { id } = req.params;
      const departamento = await getDepartamentoById(id);
      res.status(200).json({
        data: departamento,
        message: "Departamento recuperado correctamente.",
      });
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        res.status(404).json({
          data: null,
          message: error.message,
        });
      } else {
        res.status(500).json({
          data: null,
          message: error.message,
        });
      }
    }
  };
  
  /**
   * Controlador para crear un nuevo departamento.
   */
  export const createDepartamentoController = async (req, res) => {
    try {
      const data = req.body;
      const newDepartamento = await createDepartamento(data);
      res.status(201).json({
        data: newDepartamento,
        message: "Departamento creado correctamente.",
      });
    } catch (error) {
      res.status(400).json({
        data: null,
        message: error.message,
      });
    }
  };
  
  /**
   * Controlador para actualizar un departamento existente.
   */
  export const updateDepartamentoController = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedDepartamento = await updateDepartamento(id, data);
      res.status(200).json({
        data: updatedDepartamento,
        message: "Departamento actualizado correctamente.",
      });
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        res.status(404).json({
          data: null,
          message: error.message,
        });
      } else {
        res.status(400).json({
          data: null,
          message: error.message,
        });
      }
    }
  };
  
  /**
   * Controlador para eliminar un departamento.
   */
  export const deleteDepartamentoController = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteDepartamento(id);
      res.status(200).json({
        data: null,
        message: "Departamento eliminado correctamente.",
      });
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        res.status(404).json({
          data: null,
          message: error.message,
        });
      } else {
        res.status(500).json({
          data: null,
          message: error.message,
        });
      }
    }
  };
  