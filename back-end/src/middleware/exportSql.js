// Importación de modelos correspondientes a cada tabla de la base de datos
import ApprenticeModel from "../models/apprenticeModel.js";
import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import TurnosRutinariosModel from "../models/turnoRutinarioModel.js";
import MemorandumModel from "../models/memorandumModel.js";
import OtrosMemorandumModel from "../models/Otros_MemorandosModel.js";
import ProgramaModel from "../models/programaModel.js";
import UnitModel from "../models/unitModel.js";
import FichasModel from "../models/fichasModel.js";
import OfficialModel from "../models/officialModel.js";
import TalentoHumanoModel from "../models/talentoHumano.js";
import AbsenceModel from "../models/attendaceModel.js";
import AreaModel from "../models/areaModel.js";
import CityModel from "../models/cityModel.js";

// Función principal para generar SQL basado en los datos recibidos y el modelo de la tabla
const generateSQL = async (req, res) => {
  const { tableName, data } = req.body; // Obtener el nombre de la tabla y los datos enviados en la solicitud

  let Model;

  // Selección dinámica del modelo correspondiente según el nombre de la tabla
  switch (tableName) {
    case "Aprendices":
      Model = ApprenticeModel;
      break;
    case "TurnosEspeciales":
      Model = TurnoEspecialModel;
      break;
    case "TurnosRutinarios":
      Model = TurnosRutinariosModel;
      break;
    case "Memorandos":
      Model = MemorandumModel;
      break;
    case "OtrosMemorandos":
      Model = OtrosMemorandumModel;
      break;
    case "Programas":
      Model = ProgramaModel;
      break;
    case "Unidades":
      Model = UnitModel;
      break;
    case "Fichas":
      Model = FichasModel;
      break;
    case "Funcionarios":
      Model = OfficialModel;
      break;
    case "TalentoHumano":
      Model = TalentoHumanoModel;
      break;
    case "Inasistencias":
      Model = AbsenceModel;
      break;
    case "Areas":
      Model = AreaModel;
      break;
    case "Ciudades":
      Model = CityModel;
      break;
    default:
      throw new Error(`No se encontró el modelo para la tabla: ${tableName}`); // Manejo de error si no se encuentra el modelo
  }

  try {
    // Llamada a la función que genera las sentencias SQL CREATE y INSERT
    const { sqlCreate, sqlInsert } = await generateSQLFromModel(Model, data);

    // Concatenación de las sentencias SQL y conversión a base64
    const sqlData = sqlCreate + sqlInsert;
    const base64SQL = Buffer.from(sqlData).toString("base64");

    // Respuesta exitosa con el SQL en formato base64
    res.status(200).json({ base64SQL });
  } catch (error) {
    console.error("Error al generar el archivo SQL:", error); // Log de error en la consola
    res.status(500).json({ error: "Error al generar el archivo SQL" }); // Respuesta de error al cliente
  }
};

// Función auxiliar que genera las sentencias SQL CREATE y INSERT a partir del modelo y los datos
const generateSQLFromModel = async (Model, data) => {
  const attributes = Model.rawAttributes; // Obtener los atributos del modelo

  // Generación de la sentencia CREATE TABLE
  let sqlCreate = `CREATE TABLE IF NOT EXISTS ${Model.tableName} (\n`;

  Object.keys(attributes).forEach((key, index, array) => {
    const attribute = attributes[key];

    // Manejo de tipo ENUM (si aplica) y otros tipos de datos
    if (attribute.type.key === "ENUM") {
      const enumValues = attribute.type.values
        .map((value) => `'${value}'`)
        .join(", ");
      sqlCreate += `  ${attribute.field || key} ENUM(${enumValues})`;
    } else {
      sqlCreate += `  ${attribute.field || key} ${attribute.type.toString()}`;
    }

    // Agregar restricciones como NOT NULL, PRIMARY KEY, AUTOINCREMENT si corresponden
    if (attribute.allowNull === false) {
      sqlCreate += " NOT NULL";
    }
    if (attribute.primaryKey) {
      sqlCreate += " PRIMARY KEY";
    }
    if (attribute.autoIncrement) {
      sqlCreate += " AUTOINCREMENT";
    }

    // Coma al final de cada línea, excepto en la última
    if (index < array.length - 1) {
      sqlCreate += ",";
    }
    sqlCreate += "\n";
  });

  sqlCreate += ");\n\n"; // Cierre de la sentencia CREATE TABLE

  // Generación de la sentencia INSERT
  const modelColumns = Object.keys(Model.rawAttributes);

  let sqlInsert = `INSERT INTO ${Model.tableName} (${modelColumns.join(
    ", "
  )}) VALUES `;

  // Mapear los valores de los datos a las columnas del modelo
  data.forEach((row, index) => {
    sqlInsert += "(";
    sqlInsert += row
      .map((value) => (value ? `'${value}'` : "NULL")) // Si el valor es nulo o vacío, insertar NULL
      .join(", ");
    sqlInsert += ")";

    // Coma al final de cada línea, excepto en la última
    if (index < data.length - 1) {
      sqlInsert += ", ";
    }
  });

  sqlInsert += ";\n"; // Cierre de la sentencia INSERT

  return { sqlCreate, sqlInsert }; // Devolver las sentencias SQL generadas
};

// Exportar la función principal para que pueda ser utilizada en otras partes del código
export default generateSQL;
