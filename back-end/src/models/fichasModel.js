import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ProgramaModel from "./programaModel.js"

const FichasModel = db.define("fichas", {
    Id_Ficha: { 
        type: DataTypes.STRING(11), 
        primaryKey: true 
    },
    Fec_InicioEtapaLectiva: { 
        type: DataTypes.DATE 
    },
    Fec_FinEtapaLectiva: { 
        type: DataTypes.DATE 
    },
    Can_Aprendices: { 
        type: DataTypes.INTEGER 
    },
    Id_ProgramaFormacion: { 
        type: DataTypes.INTEGER,
        references:{
            model: ProgramaModel,
            key: "Id_ProgramaFormacion"
        }
    },
    Estado: { 
        type: DataTypes.ENUM('Activa', 'Inactiva') 
    }
},{
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}
);

export default FichasModel;