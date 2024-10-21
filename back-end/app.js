import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import checkAuth from "./src/middleware/authMiddleware.js";

import path from "path";

import db from "./src/database/db.js";

//Routes
import absenceRoutes from "./src/routes/absencesRoutes.js";
import cityRoutes from "./src/routes/cityRoutes.js";
import apprenticeRoutes from "./src/routes/ApprenticeRoutes.js";
import areaRoutes from "./src/routes/areaRoutes.js";
import fichasRoutes from "./src/routes/fichasRoutes.js";
import memorandumRoutes from "./src/routes/memorandumRoutes.js";
import officialRoutes from "./src/routes/officialRoutes.js";
import programaRoutes from "./src/routes/programaRoutes.js";
import talentoHumanoRoutes from "./src/routes/talentoHumanoRoutes.js";
import turnoEspecialAprendizRoutes from "./src/routes/turnoEspecialAprendizRoutes.js";
import turnoRutinarioAprendizRoutes from "./src/routes/turnoRutinarioAprendizRoutes.js";
import turnoRutinarioRoutes from "./src/routes/turnoRutinarioRoutes.js";
import turnoEspecialRoutes from "./src/routes/turnoEspecialRoutes.js";
import unitRoutes from "./src/routes/unitRoutes.js";
import OtrosMemorandumRoutes from "./src/routes/OtrosMemorandosRoutes.js";
import userRouter from "./src/routes/UserRoutes.js";
import { logger } from "./src/middleware/logMiddleware.js";

//Models
import cityModel from "./src/models/cityModel.js";
import ApprenticeModel from "./src/models/apprenticeModel.js";
import TalentoHumanoModel from "./src/models/talentoHumano.js";
import UnitModel from "./src/models/unitModel.js";
import AreaModel from "./src/models/areaModel.js";
import ProgramaModel from "./src/models/programaModel.js";
import FichasModel from "./src/models/fichasModel.js";
import AbsenceModel from "./src/models/absenceModel.js";
import TurnoEspecialModel from "./src/models/turnoEspecialModel.js";
import OfficialModel from "./src/models/officialModel.js";
import TurnosRutinariosModel from "./src/models/turnoRutinarioModel.js";
import MemorandumModel from "./src/models/memorandumModel.js";
import OtrosMemorandumModel from "./src/models/Otros_MemorandosModel.js";
import TurnoEspecialAprendizModel from "./src/models/turnoEspeciales_Aprendices.js";

import reportPDF from "./src/middleware/reportPdf.js";
import reportXLSX from "./src/middleware/reportXlsx.js";
import generateSQL from "./src/middleware/exportSql.js";

const appExpress = express();
const PORT = process.env.PORT || 8080;

// Middleware para servir archivos estáticos como los PDFs y Excels
// appExpress.use('/output', express.static(path.join(__dirname, 'output')));

appExpress.use(cors());
appExpress.use(express.json());
appExpress.use("/inasistencias", absenceRoutes);
appExpress.use("/aprendiz", apprenticeRoutes);
appExpress.use("/areas", areaRoutes);
appExpress.use("/fichas", fichasRoutes);
appExpress.use("/memorando", memorandumRoutes);
appExpress.use("/otrosmemorandos", OtrosMemorandumRoutes);
appExpress.use("/funcionarios", officialRoutes);
appExpress.use("/programa", programaRoutes);
appExpress.use("/talentohumano", talentoHumanoRoutes);
appExpress.use("/turEspAprendiz", turnoEspecialAprendizRoutes);
appExpress.use("/turnoespecial", turnoEspecialRoutes);
appExpress.use("/turRutAprendiz", turnoRutinarioAprendizRoutes);
appExpress.use("/turnoRutinario", turnoRutinarioRoutes);
appExpress.use("/unidades", unitRoutes);
appExpress.use("/ciudades", cityRoutes);
// appExpress.use('/pdf', pdfRoutes);
// appExpress.use('/excel', excelRoutes);




appExpress.use(express.static(path.join(import.meta.url, "public")));

appExpress.use("/public/uploads/", express.static("public/uploads"));
appExpress.use("/assets", express.static("public/assets"));
appExpress.use("/plantillas", express.static("public/plantillas"));
appExpress.use("/PDFs", express.static("public/PDFs"));

appExpress.use("/api/user", userRouter);

appExpress.use("/reportPDF", checkAuth, reportPDF);
appExpress.use("/reportXLSX", checkAuth, reportXLSX);
appExpress.use("/exportsSQL", checkAuth, generateSQL);

try {
  await db.authenticate().then(() => {
    console.log("Conexion a la db exitosa");
  });
} catch (error) {
  console.log(`Error de conexion a la bd ${error}`);
  logger.error(error);
}

appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Unidades
AreaModel.hasMany(UnitModel, { foreignKey: "Id_Area", as: "unidades" });
UnitModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" });

//Programas de formacion
AreaModel.hasMany(ProgramaModel, {
  foreignKey: "Id_Area",
  as: "programasFormacion",
});
ProgramaModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" });

//Fichas
ProgramaModel.hasMany(FichasModel, {
  foreignKey: "Id_ProgramaFormacion",
  as: "fichas",
});
FichasModel.belongsTo(ProgramaModel, {
  foreignKey: "Id_ProgramaFormacion",
  as: "programasFormacion",
});

//TalentoHumano
FichasModel.hasMany(TalentoHumanoModel, {
  foreignKey: "Id_Ficha",
  as: "talentoHumano",
});
TalentoHumanoModel.belongsTo(FichasModel, {
  foreignKey: "Id_Ficha",
  as: "fichas",
});

//APRENDIZ CON FICHAS
FichasModel.hasMany(ApprenticeModel, {
  foreignKey: "Id_Ficha",
  as: "aprendices",
});
ApprenticeModel.belongsTo(FichasModel, {
  foreignKey: "Id_Ficha",
  as: "fichas",
});

//Aprendiz con Ciudad
cityModel.hasMany(ApprenticeModel, {
  foreignKey: "Id_Ciudad",
  as: "aprendices",
});
ApprenticeModel.belongsTo(cityModel, { foreignKey: "Id_Ciudad", as: "ciudad" });




//Turno Especial - Fichas
FichasModel.hasMany(TurnoEspecialModel, {
  foreignKey: "Id_Ficha",
  as: "turnoEspecial",
});
TurnoEspecialModel.belongsTo(FichasModel, {
  foreignKey: "Id_Ficha",
  as: "fichas",
});

//Turno Especial - Unidades
UnitModel.hasMany(TurnoEspecialModel, {
  foreignKey: "Id_Unidad",
  as: "turnoEspecial",
});
TurnoEspecialModel.belongsTo(UnitModel, {
  foreignKey: "Id_Unidad",
  as: "unidad",
});

//Turno Especial - Funcionarios
OfficialModel.hasMany(TurnoEspecialModel, {
  foreignKey: "Id_Funcionario",
  as: "turnoEspecial",
});
TurnoEspecialModel.belongsTo(OfficialModel, {
  foreignKey: "Id_Funcionario",
  as: "funcionario",
});




//Funcionario No esta relacionado con ninguno sino hasta con Turno Especial....

// RELACIONES PARA TURNOS RUTINARIOS
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
  foreignKey: "Id_Aprendiz", // Llave foránea en OtrosMemorandumModel
  as: "otrosMemorandos", // Alias para la relación
});

// Un Otro Memorando pertenece a un Aprendiz
OtrosMemorandumModel.belongsTo(ApprenticeModel, {
  foreignKey: "Id_Aprendiz", // Llave foránea en OtrosMemorandumModel
  as: "aprendiz", // Alias para la relación
});


// Relación de muchos a muchos entre Aprendices y TurnosEspeciales
ApprenticeModel.belongsToMany(TurnoEspecialModel, {
  through: TurnoEspecialAprendizModel, // Tabla intermedia
  foreignKey: "Id_Aprendiz", // Llave foránea en la tabla intermedia
  otherKey: "Id_TurnoEspecial", // Llave foránea del otro modelo
  as: "turnosEspeciales", // Alias para la relación
});

TurnoEspecialModel.belongsToMany(ApprenticeModel, {
  through: TurnoEspecialAprendizModel, // Tabla intermedia
  foreignKey: "Id_TurnoEspecial", // Llave foránea en la tabla intermedia
  otherKey: "Id_Aprendiz", // Llave foránea del otro modelo
  as: "aprendices", // Alias para la relación
});

// Relación individual en la tabla intermedia
TurnoEspecialAprendizModel.belongsTo(ApprenticeModel, {
  foreignKey: "Id_Aprendiz",
  as: "aprendiz", // Alias para la relación
});

TurnoEspecialAprendizModel.belongsTo(TurnoEspecialModel, {
  foreignKey: "Id_TurnoEspecial",
  as: "turnoEspecial", // Alias para la relación
});

ApprenticeModel.hasMany(TurnoEspecialAprendizModel, {
  foreignKey: "Id_Aprendiz",
  as: "turnosEspecialesAprendices", // Alias para la relación
});

TurnoEspecialModel.hasMany(TurnoEspecialAprendizModel, {
  foreignKey: "Id_TurnoEspecial",
  as: "turnosEspecialesAprendices", // Alias para la relación
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
  AbsenceModel
};
