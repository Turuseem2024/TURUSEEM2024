// Importamos el modelo DepartamentoModel para interactuar con la base de datos.
import DepartamentoModel from "../models/DepartamentoModel.js";

/**
 * Obtiene todos los registros de departamentos.
 * @returns {Array} Lista de departamentos.
 */
export const getAllDepartamentos = async () => {
  try {
    const departamentos = await DepartamentoModel.findAll();
    return departamentos;
  } catch (error) {
    // Propagamos el error con un mensaje descriptivo.
    throw new Error("Error al obtener departamentos: " + error.message);
  }
};

/**
 * Obtiene un departamento por su ID.
 * @param {number} id - ID del departamento.
 * @returns {Object} Departamento encontrado.
 */
export const getDepartamentoById = async (id) => {
  try {
    const departamento = await DepartamentoModel.findByPk(id);
    if (!departamento) {
      throw new Error("Departamento no encontrado");
    }
    return departamento;
  } catch (error) {
    throw new Error("Error al obtener el departamento: " + error.message);
  }
};

/**
 * Crea un nuevo registro de departamento.
 * @param {Object} data - Datos del nuevo departamento.
 * @returns {Object} Departamento creado.
 */
export const createDepartamento = async (data) => {
  try {
    const newDepartamento = await DepartamentoModel.create(data);
    return newDepartamento;
  } catch (error) {
    throw new Error("Error al crear el departamento: " + error.message);
  }
};

/**
 * Actualiza un departamento existente por su ID.
 * @param {number} id - ID del departamento a actualizar.
 * @param {Object} data - Nuevos datos a actualizar.
 * @returns {Object} Departamento actualizado.
 */
export const updateDepartamento = async (id, data) => {
  try {
    const departamento = await DepartamentoModel.findByPk(id);
    if (!departamento) {
      throw new Error("Departamento no encontrado");
    }
    const updatedDepartamento = await departamento.update(data);
    return updatedDepartamento;
  } catch (error) {
    throw new Error("Error al actualizar el departamento: " + error.message);
  }
};

/**
 * Elimina un departamento mediante su ID.
 * @param {number} id - ID del departamento a eliminar.
 * @returns {Object} Departamento eliminado.
 */
export const deleteDepartamento = async (id) => {
  try {
    const departamento = await DepartamentoModel.findByPk(id);
    if (!departamento) {
      throw new Error("Departamento no encontrado");
    }
    await departamento.destroy();
    return departamento;
  } catch (error) {
    throw new Error("Error al eliminar el departamento: " + error.message);
  }
};
