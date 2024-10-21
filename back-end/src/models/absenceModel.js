import db from "../database/db.js";
import { DataTypes} from "sequelize";
const AbsenceModel = db.define(
  "inasistencias",
  {
    Id_Inasistencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_Inasistencia : {type: DataTypes.TIME},
    Mot_Inasistencia: { type: DataTypes.STRING(50) },
    Turno_Id: {type: DataTypes.INTEGER},
    Tipo_Inasistencia: {type: DataTypes.ENUM('turno_rutinario','turno_especial')},
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default AbsenceModel;
