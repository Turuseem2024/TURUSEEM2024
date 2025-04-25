// src/services/FuncionarioService.js
import fs from "fs";
import path from "path";
import OfficialModel from "../models/officialModel.js";

// Función auxiliar para registrar los errores en un archivo de log
const logErrorToFile = (functionName, error) => {
  // Ruta donde se almacenará el archivo de logs
  const logPath = path.resolve("logs", "errores.log");
  
  // Mensaje de error a escribir en el log, incluye la fecha y el nombre de la función donde ocurrió el error
  const logMessage = `\n[${new Date().toISOString()}] [${functionName}] ${error.stack || error.message}`;
  
  // Crear el directorio si no existe y escribir el mensaje en el archivo de logs
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, logMessage);
};

// Función para obtener todos los funcionarios
export async function getAllFuncionarios() {
  try {
    // Recuperar todos los funcionarios de la base de datos
    const funcionarios = await OfficialModel.findAll();
    return funcionarios;
  } catch (error) {
    // Registrar el error y lanzar una excepción con un mensaje específico
    logErrorToFile("getAllFuncionarios", error);
    throw { status: 500, message: `Error al obtener funcionarios: ${error.message}` };
  }
}

// Función para obtener un funcionario por su ID
export async function getFuncionarioById(id) {
  try {
    // Validar que el ID sea válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    
    // Buscar el funcionario por su ID
    const funcionario = await OfficialModel.findByPk(id);
    
    // Si el funcionario no existe, lanzar un error
    if (!funcionario) throw new Error("Funcionario no encontrado");
    
    return funcionario;
  } catch (error) {
    // Registrar el error y lanzar una excepción con un mensaje específico
    logErrorToFile("getFuncionarioById", error);
    throw { status: 404, message: `Error al obtener funcionario: ${error.message}` };
  }
}

// Función para crear un nuevo funcionario
export async function createFuncionario(data) {
  try {
    // Validación de campos obligatorios
    if (!data || !data.Id_Funcionario || isNaN(Number(data.Id_Funcionario))) {
      throw new Error("ID de funcionario inválido");
    }
    
    if (typeof data.Nom_Funcionario !== 'string' || !data.Nom_Funcionario.trim()) {
      throw new Error("Nombre inválido");
    }
    
    if (typeof data.Ape_Funcionario !== 'string' || !data.Ape_Funcionario.trim()) {
      throw new Error("Apellido inválido");
    }
    
    if (!['Masculino', 'Femenino'].includes(data.Genero)) {
      throw new Error("Género inválido");
    }
    
    if (!['Activo', 'Inactivo'].includes(data.Est_Funcionario)) {
      throw new Error("Estado inválido");
    }
    
    if (!['Planta', 'Contratista'].includes(data.Cargo_Funcionario)) {
      throw new Error("Cargo inválido");
    }

    // Validación de campos opcionales
    if (data.Tel_Funcionario && (typeof data.Tel_Funcionario !== 'string' || data.Tel_Funcionario.length > 15)) {
      throw new Error("Teléfono inválido");
    }
    
    if (data.Cor_Funcionarios && (typeof data.Cor_Funcionarios !== 'string' || !data.Cor_Funcionarios.includes('@'))) {
      throw new Error("Correo electrónico inválido");
    }

    // Crear el nuevo funcionario en la base de datos
    const nuevoFuncionario = await OfficialModel.create({
      Id_Funcionario: data.Id_Funcionario,
      Nom_Funcionario: data.Nom_Funcionario.trim(),
      Ape_Funcionario: data.Ape_Funcionario.trim(),
      Genero: data.Genero,
      Tel_Funcionario: data.Tel_Funcionario?.trim() || null,
      Est_Funcionario: data.Est_Funcionario,
      Cor_Funcionarios: data.Cor_Funcionarios?.trim() || null,
      Cargo_Funcionario: data.Cargo_Funcionario
    });
    
    return nuevoFuncionario;
  } catch (error) {
    // Registrar el error y lanzar una excepción con un mensaje específico
    logErrorToFile("createFuncionario", error);
    throw { status: 400, message: `Error al crear funcionario: ${error.message}` };
  }
}

// Función para actualizar los datos de un funcionario
export async function updateFuncionario(id, data) {
  try {
    // Validar que el ID sea válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para actualización");
    
    // Validar que los datos de actualización sean correctos
    if (!data || typeof data !== 'object') throw new Error("Datos inválidos para actualización");

    // Buscar el funcionario por su ID
    const funcionario = await OfficialModel.findByPk(id);
    
    // Si el funcionario no existe, lanzar un error
    if (!funcionario) throw new Error("Funcionario no encontrado");

    // Validaciones de campos ENUM
    if (data.Genero && !['Masculino', 'Femenino'].includes(data.Genero)) {
      throw new Error("Género inválido");
    }
    
    if (data.Est_Funcionario && !['Activo', 'Inactivo'].includes(data.Est_Funcionario)) {
      throw new Error("Estado inválido");
    }
    
    if (data.Cargo_Funcionario && !['Planta', 'Contratista'].includes(data.Cargo_Funcionario)) {
      throw new Error("Cargo inválido");
    }

    // Actualizar los campos del funcionario en la base de datos
    const funcionarioActualizado = await funcionario.update({
      Nom_Funcionario: data.Nom_Funcionario?.trim() || funcionario.Nom_Funcionario,
      Ape_Funcionario: data.Ape_Funcionario?.trim() || funcionario.Ape_Funcionario,
      Genero: data.Genero || funcionario.Genero,
      Tel_Funcionario: data.Tel_Funcionario?.trim() || funcionario.Tel_Funcionario,
      Est_Funcionario: data.Est_Funcionario || funcionario.Est_Funcionario,
      Cor_Funcionarios: data.Cor_Funcionarios?.trim() || funcionario.Cor_Funcionarios,
      Cargo_Funcionario: data.Cargo_Funcionario || funcionario.Cargo_Funcionario
    });
    
    return funcionarioActualizado;
  } catch (error) {
    // Registrar el error y lanzar una excepción con un mensaje específico
    logErrorToFile("updateFuncionario", error);
    throw { status: 400, message: `Error al actualizar funcionario: ${error.message}` };
  }
}

// Función para eliminar un funcionario por su ID
export async function deleteFuncionario(id) {
  try {
    // Validar que el ID sea válido
    if (!id || isNaN(Number(id))) throw new Error("ID inválido para eliminación");
    
    // Buscar el funcionario por su ID
    const funcionario = await OfficialModel.findByPk(id);
    
    // Si el funcionario no existe, lanzar un error
    if (!funcionario) throw new Error("Funcionario no encontrado");
    
    // Eliminar al funcionario de la base de datos
    await funcionario.destroy();
    
    return { message: "Funcionario eliminado correctamente" };
  } catch (error) {
    // Registrar el error y lanzar una excepción con un mensaje específico
    logErrorToFile("deleteFuncionario", error);
    throw { status: 400, message: `Error al eliminar funcionario: ${error.message}` };
  }
}
