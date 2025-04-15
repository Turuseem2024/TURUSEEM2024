import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import db from "./src/database/db.js";

// Rutas
// import absenceRoutes from "./src/routes/absencesRoutes.js";
import cityRoutes from "./src/routes/cityRoutes.js";
import apprenticeRoutes from "./src/routes/ApprenticeRoutes.js";
import areaRoutes from "./src/routes/areaRoutes.js";
import fichasRoutes from "./src/routes/fichasRoutes.js";
import officialRoutes from "./src/routes/officialRoutes.js";
import programaRoutes from "./src/routes/programaRoutes.js";
import talentoHumanoRoutes from "./src/routes/talentoHumanoRoutes.js";
import turnoEspecialRoutes from "./src/routes/turnoEspecialRoutes.js";
import turnoRutinarioRoutes from "./src/routes/turnoRutinarioRoutes.js";
import unitRoutes from "./src/routes/unitRoutes.js";
import OtrosMemorandumRoutes from "./src/routes/OtrosMemorandosRoutes.js";
import userRouter from "./src/routes/UserRoutes.js";
import DepartamentoRouter from "./src/routes/DepartamentoRoutes.js"
import { logger } from "./src/middleware/logMiddleware.js";

// Middleware
import reportPDF from "./src/middleware/reportPdf.js";
import reportXLSX from "./src/middleware/reportXlsx.js";
import generateSQL from "./src/middleware/exportSql.js";
// Se elimina la importación del middleware de autenticación para quitar las restricciones
// import checkAuth from "./src/middleware/authMiddleware.js";

// Modelos
import cityModel from "./src/models/cityModel.js";
import ApprenticeModel from "./src/models/apprenticeModel.js";
import TalentoHumanoModel from "./src/models/talentoHumano.js";
import UnitModel from "./src/models/unitModel.js";
import AreaModel from "./src/models/areaModel.js";
import ProgramaModel from "./src/models/programaModel.js";
import FichasModel from "./src/models/fichasModel.js";
import TurnoEspecialModel from "./src/models/turnoEspecialModel.js";
import OfficialModel from "./src/models/officialModel.js";
import TurnosRutinariosModel from "./src/models/turnoRutinarioModel.js";
import OtrosMemorandumModel from "./src/models/Otros_MemorandosModel.js";
import DepartamentoModel from "./src/models/DepartamentoModel.js"

const appExpress = express();
const PORT = process.env.PORT || 8080;

// Middleware
appExpress.use(cors());
appExpress.use(express.json());
appExpress.use(express.static(path.join(import.meta.url, "public")));
appExpress.use("/public/uploads/", express.static("public/uploads"));
appExpress.use("/assets", express.static("public/assets"));
appExpress.use("/plantillas", express.static("public/plantillas"));
appExpress.use("/PDFs", express.static("public/PDFs"));

// Rutas
// appExpress.use("/inasistencias", absenceRoutes);
appExpress.use("/aprendiz", apprenticeRoutes);
appExpress.use("/areas", areaRoutes);
appExpress.use("/departamentos", DepartamentoRouter);
appExpress.use("/fichas", fichasRoutes);
appExpress.use("/funcionarios", officialRoutes);
appExpress.use("/programa", programaRoutes);
appExpress.use("/talentohumano", talentoHumanoRoutes);
appExpress.use("/turnoespecial", turnoEspecialRoutes);
appExpress.use("/turnoRutinario", turnoRutinarioRoutes);
appExpress.use("/unidades", unitRoutes);
appExpress.use("/ciudades", cityRoutes);
appExpress.use("/otrosmemorandos", OtrosMemorandumRoutes);
appExpress.use("/api/user", userRouter);
// Se eliminan las validaciones de autenticación para las rutas de reportes y exportación
appExpress.use("/reportPDF", reportPDF);
appExpress.use("/reportXLSX", reportXLSX);
appExpress.use("/exportsSQL", generateSQL);

// Conexión a la base de datos
try {
  await db.authenticate();
  console.log("Conexión a la base de datos exitosa");
} catch (error) {
  console.error(`Error de conexión a la base de datos: ${error.message}`);
  logger.error(`Error de conexión a la base de datos: ${error.message}`);
}

// Relaciones entre modelos
AreaModel.hasMany(UnitModel, { foreignKey: "Id_Area", as: "unidades" });
UnitModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" });

AreaModel.hasMany(ProgramaModel, {
  foreignKey: "Id_Area",
  as: "programasFormacion",
});
ProgramaModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" });

ProgramaModel.hasMany(FichasModel, {
  foreignKey: "Id_ProgramaFormacion",
  as: "fichas",
});
FichasModel.belongsTo(ProgramaModel, {
  foreignKey: "Id_ProgramaFormacion",
  as: "programasFormacion",
});

FichasModel.hasMany(TalentoHumanoModel, {
  foreignKey: "Id_Ficha",
  as: "talentoHumano",
});
TalentoHumanoModel.belongsTo(FichasModel, {
  foreignKey: "Id_Ficha",
  as: "fichas",
});

FichasModel.hasMany(ApprenticeModel, {
  foreignKey: "Id_Ficha",
  as: "aprendices",
});
ApprenticeModel.belongsTo(FichasModel, {
  foreignKey: "Id_Ficha",
  as: "fichas",
});

cityModel.hasMany(ApprenticeModel, {
  foreignKey: "Id_Ciudad",
  as: "aprendices",
});
ApprenticeModel.belongsTo(cityModel, { foreignKey: "Id_Ciudad", as: "ciudad" });

FichasModel.hasMany(TurnoEspecialModel, {
  foreignKey: "Id_Ficha",
  as: "turnoEspecial",
});
TurnoEspecialModel.belongsTo(FichasModel, {
  foreignKey: "Id_Ficha",
  as: "fichas",
});

UnitModel.hasMany(TurnoEspecialModel, {
  foreignKey: "Id_Unidad",
  as: "turnoEspecial",
});
TurnoEspecialModel.belongsTo(UnitModel, {
  foreignKey: "Id_Unidad",
  as: "unidad",
});

OfficialModel.hasMany(TurnoEspecialModel, {
  foreignKey: "Id_Funcionario",
  as: "turnoEspecial",
});
TurnoEspecialModel.belongsTo(OfficialModel, {
  foreignKey: "Id_Funcionario",
  as: "funcionario",
});

ApprenticeModel.hasMany(TurnosRutinariosModel, {
  foreignKey: "Id_Aprendiz",
  as: "turnosrutinarios",
});
TurnosRutinariosModel.belongsTo(ApprenticeModel, {
  foreignKey: "Id_Aprendiz",
  as: "aprendiz",
});

UnitModel.hasMany(TurnosRutinariosModel, {
  foreignKey: "Id_Unidad",
  as: "turnosrutinarios",
});
TurnosRutinariosModel.belongsTo(UnitModel, {
  foreignKey: "Id_Unidad",
  as: "unidad",
});

ApprenticeModel.hasMany(OtrosMemorandumModel, {
  foreignKey: "Id_Aprendiz",
  as: "otrosMemorandos",
});
OtrosMemorandumModel.belongsTo(ApprenticeModel, {
  foreignKey: "Id_Aprendiz",
  as: "aprendiz",
});

// Iniciar servidor
appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
