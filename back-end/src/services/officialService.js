import OfficialModel from "../models/officialModel.js";

// Servicio para obtener todos los funcionarios
export const getAllFuncionariosService = async () => {
  return await OfficialModel.findAll();
};

// Servicio para obtener un funcionario específico por ID
export const getFuncionarioService = async (id) => {
  return await OfficialModel.findByPk(id);
};

// Servicio para crear un nuevo funcionario
export const createFuncionarioService = async (data) => {
  const {
    Id_Funcionario,
    Nom_Funcionario,
    Ape_Funcionario,
    Genero,
    Tel_Funcionario,
    Estado,
    Cargo,
  } = data;
  
  return await OfficialModel.create({
    Id_Funcionario,
    Nom_Funcionario,
    Ape_Funcionario,
    Genero,
    Tel_Funcionario,
    Estado,
    Cargo,
  });
};

// Servicio para actualizar un funcionario existente
export const updateFuncionarioService = async (id, data) => {
  const {
    Nom_Funcionario,
    Ape_Funcionario,
    Genero,
    Tel_Funcionario,
    Estado,
    Cargo,
  } = data;
  
  return await OfficialModel.update(
    {
      Nom_Funcionario,
      Ape_Funcionario,
      Genero,
      Tel_Funcionario,
      Estado,
      Cargo,
    },
    {
      where: { Id_Funcionario: id },
    }
  );
};

// Servicio para eliminar un funcionario existente
export const deleteFuncionarioService = async (id) => {
  return await OfficialModel.destroy({
    where: { Id_Funcionario: id },
  });
};
