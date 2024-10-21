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
import AbsenceModel from "../models/absenceModel.js";
import AreaModel from "../models/areaModel.js";
import CityModel from "../models/cityModel.js";

const generateSQL = async (req, res) => {
  const { tableName, data } = req.body;

  let Model;

  // Selecciona el modelo basado en el nombre de la tabla
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
      throw new Error(`No se encontró el modelo para la tabla: ${tableName}`);
  }

  try {
    // Convierte los datos a formato SQL
    const { sqlCreate, sqlInsert } = await generateSQLFromModel(Model, data);

    // Concatenar las sentencias SQL y convertirlas a base64
    const sqlData = sqlCreate + sqlInsert;
    const base64SQL = Buffer.from(sqlData).toString("base64");

    // Retornar el SQL en base64
    res.status(200).json({ base64SQL });
  } catch (error) {
    console.error("Error al generar el archivo SQL:", error);
    res.status(500).json({ error: "Error al generar el archivo SQL" });
  }
};

// Función que genera SQL a partir de los datos y el modelo
const generateSQLFromModel = async (Model, data) => {
  const attributes = Model.rawAttributes;

  // Crear la sentencia CREATE TABLE
  let sqlCreate = `CREATE TABLE IF NOT EXISTS ${Model.tableName} (\n`;

  Object.keys(attributes).forEach((key, index, array) => {
    const attribute = attributes[key];
    if (attribute.type.key === "ENUM") {
      const enumValues = attribute.type.values
        .map((value) => `'${value}'`)
        .join(", ");
      sqlCreate += `  ${attribute.field || key} ENUM(${enumValues})`;
    } else {
      sqlCreate += `  ${attribute.field || key} ${attribute.type.toString()}`;
    }

    if (attribute.allowNull === false) {
      sqlCreate += " NOT NULL";
    }
    if (attribute.primaryKey) {
      sqlCreate += " PRIMARY KEY";
    }
    if (attribute.autoIncrement) {
      sqlCreate += " AUTOINCREMENT";
    }
    if (index < array.length - 1) {
      sqlCreate += ",";
    }
    sqlCreate += "\n";
  });

  sqlCreate += ");\n\n";

  // Crear la sentencia INSERT usando las keys del modelo
  const modelColumns = Object.keys(Model.rawAttributes);

  let sqlInsert = `INSERT INTO ${Model.tableName} (${modelColumns.join(
    ", "
  )}) VALUES `;

  // Mapear los valores de la data a las columnas del modelo
  data.forEach((row, index) => {
    sqlInsert += "(";
    sqlInsert += row
      .map((value) => (value ? `'${value}'` : "NULL")) // Si el valor es nulo o vacío, insertar NULL
      .join(", ");
    sqlInsert += ")";
    if (index < data.length - 1) {
      sqlInsert += ", ";
    }
  });

  sqlInsert += ";\n";

  return { sqlCreate, sqlInsert };
};

export default generateSQL;
