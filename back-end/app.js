// Importación de librerías y módulos necesarios
import dotenv from "dotenv";  // Permite cargar variables de entorno desde un archivo .env
dotenv.config();  // Carga las variables de entorno definidas en el archivo .env
import express from "express";  // Importa Express para crear la aplicación web
import cors from "cors";  // Middleware que habilita CORS (Cross-Origin Resource Sharing)
import path from "path";  // Utilidad para gestionar rutas de archivos
import db from "./src/database/db.js";  // Conexión a la base de datos

// Rutas del proyecto
import AttendaceRoutes from "./src/routes/attendaceRoutes.js";  // Rutas de asistencia
import cityRoutes from "./src/routes/cityRoutes.js";  // Rutas de ciudades
import apprenticeRoutes from "./src/routes/ApprenticeRoutes.js";  // Rutas de aprendices
import areaRoutes from "./src/routes/areaRoutes.js";  // Rutas de áreas
import Areas_A_AreasRoutes from "./src/routes/AreaAAreaRoutes.js";  // Rutas de relaciones entre áreas
import fichasRoutes from "./src/routes/fichasRoutes.js";  // Rutas de fichas
import officialRoutes from "./src/routes/officialRoutes.js";  // Rutas de funcionarios
import programaRoutes from "./src/routes/programaRoutes.js";  // Rutas de programas
import talentoHumanoRoutes from "./src/routes/talentoHumanoRoutes.js";  // Rutas de talento humano
import turnoEspecialRoutes from "./src/routes/turnoEspecialRoutes.js";  // Rutas de turnos especiales
import turnoRutinarioRoutes from "./src/routes/turnoRutinarioRoutes.js";  // Rutas de turnos rutinarios
import unitRoutes from "./src/routes/unitRoutes.js";  // Rutas de unidades
import OtrosMemorandumRoutes from "./src/routes/OtrosMemorandosRoutes.js";  // Rutas de otros memorandos
import userRouter from "./src/routes/UserRoutes.js";  // Rutas de usuarios
import ParametrosRoutes from "./src/routes/parametroRoutes.js";  // Rutas de parámetros
import DepartamentoRouter from "./src/routes/DepartamentoRoutes.js";  // Rutas de departamentos
import MunicipiosRouter from "./src/routes/MunicipioRoutes.js";  // Rutas de municipios
import { logger } from "./src/middleware/logMiddleware.js";  // Middleware para logging

// Middleware para reportes y exportaciones
import reportPDF from "./src/middleware/reportPdf.js";  // Middleware para generar reportes en PDF
import reportXLSX from "./src/middleware/reportXlsx.js";  // Middleware para generar reportes en XLSX
import generateSQL from "./src/middleware/exportSql.js";  // Middleware para generar exportaciones SQL

// Modelos (representación de tablas en la base de datos)
import cityModel from "./src/models/cityModel.js";  // Modelo de ciudades
import ApprenticeModel from "./src/models/apprenticeModel.js";  // Modelo de aprendices
import TalentoHumanoModel from "./src/models/talentoHumano.js";  // Modelo de talento humano
import UnitModel from "./src/models/unitModel.js";  // Modelo de unidades
import AreaModel from "./src/models/areaModel.js";  // Modelo de áreas
import AreaAAreaModel from "./src/models/AreaAAreaModel.js";  // Modelo de relaciones entre áreas
import ProgramaModel from "./src/models/programaModel.js";  // Modelo de programas
import FichasModel from "./src/models/fichasModel.js";  // Modelo de fichas
import TurnoEspecialModel from "./src/models/turnoEspecialModel.js";  // Modelo de turnos especiales
import OfficialModel from "./src/models/officialModel.js";  // Modelo de funcionarios
import TurnosRutinariosModel from "./src/models/turnoRutinarioModel.js";  // Modelo de turnos rutinarios
import OtrosMemorandumModel from "./src/models/Otros_MemorandosModel.js";  // Modelo de otros memorandos
import DepartamentoModel from "./src/models/DepartamentoModel.js";  // Modelo de departamentos
import MunicipioModel from "./src/models/MunicipioModel.js";  // Modelo de municipios

// Creación de la aplicación Express
const appExpress = express();
const PORT = process.env.PORT || 8080;  // Puerto en el que se ejecutará la aplicación

// Middleware para habilitar CORS y parsear JSON
appExpress.use(cors());
appExpress.use(express.json());

// Middleware para servir archivos estáticos
appExpress.use(express.static(path.join(import.meta.url, "public")));
appExpress.use("/public/uploads/", express.static("public/uploads"));
appExpress.use("/assets", express.static("public/assets"));
appExpress.use("/plantillas", express.static("public/plantillas"));
appExpress.use("/PDFs", express.static("public/PDFs"));

// Definición de rutas de la aplicación
appExpress.use("/asistencias", AttendaceRoutes);
appExpress.use("/aprendiz", apprenticeRoutes);
appExpress.use("/areas", areaRoutes);
appExpress.use("/areas_a_areas", Areas_A_AreasRoutes);
appExpress.use("/departamentos", DepartamentoRouter);
appExpress.use("/municipios", MunicipiosRouter);
appExpress.use("/fichas", fichasRoutes);
appExpress.use("/funcionarios", officialRoutes);
appExpress.use("/programa", programaRoutes);
appExpress.use("/talentohumano", talentoHumanoRoutes);
appExpress.use("/turnoespecial", turnoEspecialRoutes);
appExpress.use("/turnoRutinario", turnoRutinarioRoutes);
appExpress.use("/unidades", unitRoutes);
appExpress.use("/ciudades", cityRoutes);
appExpress.use("/otrosmemorandos", OtrosMemorandumRoutes);
appExpress.use("/users", userRouter);
appExpress.use("/parametros", ParametrosRoutes);

// Rutas para generar reportes y exportaciones
appExpress.use("/reportPDF", reportPDF);
appExpress.use("/reportXLSX", reportXLSX);
appExpress.use("/exportsSQL", generateSQL);

// Conexión a la base de datos
try {
  await db.authenticate();  // Intento de conexión a la base de datos
  console.log("Conexión a la base de datos exitosa");
} catch (error) {
  console.error(`Error de conexión a la base de datos: ${error.message}`);
  logger.error(`Error de conexión a la base de datos: ${error.message}`);
}

// Relaciones entre modelos (definición de claves foráneas y asociaciones)
AreaModel.hasMany(AreaAAreaModel, { foreingKey: "Id_Area", as: "areas_a_areas" });
AreaModel.hasMany(UnitModel, { foreignKey: "Id_Area", as: "unidades" });
UnitModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" });

DepartamentoModel.hasMany(MunicipioModel, { foreignKey: "Id_Departamento", as: "municipios" });
AreaModel.hasMany(ProgramaModel, { foreignKey: "Id_Area", as: "programasFormacion" });
ProgramaModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" });

ProgramaModel.hasMany(FichasModel, { foreignKey: "Id_ProgramaFormacion", as: "fichas" });
FichasModel.belongsTo(ProgramaModel, { foreignKey: "Id_ProgramaFormacion", as: "programasFormacion" });

FichasModel.hasMany(TalentoHumanoModel, { foreignKey: "Id_Ficha", as: "talentoHumano" });
TalentoHumanoModel.belongsTo(FichasModel, { foreignKey: "Id_Ficha", as: "fichas" });

FichasModel.hasMany(ApprenticeModel, { foreignKey: "Id_Ficha", as: "aprendices" });
ApprenticeModel.belongsTo(FichasModel, { foreignKey: "Id_Ficha", as: "fichas" });

cityModel.hasMany(ApprenticeModel, { foreignKey: "Id_Ciudad", as: "aprendices" });
ApprenticeModel.belongsTo(cityModel, { foreignKey: "Id_Ciudad", as: "ciudad" });

FichasModel.hasMany(TurnoEspecialModel, { foreignKey: "Id_Ficha", as: "turnoEspecial" });
TurnoEspecialModel.belongsTo(FichasModel, { foreignKey: "Id_Ficha", as: "fichas" });

UnitModel.hasMany(TurnoEspecialModel, { foreignKey: "Id_Unidad", as: "turnoEspecial" });
TurnoEspecialModel.belongsTo(UnitModel, { foreignKey: "Id_Unidad", as: "unidad" });

OfficialModel.hasMany(TurnoEspecialModel, { foreignKey: "Id_Funcionario", as: "turnoEspecial" });
TurnoEspecialModel.belongsTo(OfficialModel, { foreignKey: "Id_Funcionario", as: "funcionario" });

ApprenticeModel.hasMany(TurnosRutinariosModel, { foreignKey: "Id_Aprendiz", as: "turnosrutinarios" });
TurnosRutinariosModel.belongsTo(ApprenticeModel, { foreignKey: "Id_Aprendiz", as: "aprendiz" });

UnitModel.hasMany(TurnosRutinariosModel, { foreignKey: "Id_Unidad", as: "turnosrutinarios" });
TurnosRutinariosModel.belongsTo(UnitModel, { foreignKey: "Id_Unidad", as: "unidad" });

ApprenticeModel.hasMany(OtrosMemorandumModel, { foreignKey: "Id_Aprendiz", as: "otrosMemorandos" });
OtrosMemorandumModel.belongsTo(ApprenticeModel, { foreignKey: "Id_Aprendiz", as: "aprendiz" });

// Iniciar el servidor en el puerto configurado
appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exportación de modelos para su uso en otras partes del proyecto
export {
  AreaModel,
  UnitModel,
  ProgramaModel,
  FichasModel,
  TalentoHumanoModel,
  cityModel,
  ApprenticeModel,
  TurnosRutinariosModel,
  TurnoEspecialModel,
};
