import db from "../database/db.js"
import { DataTypes } from "sequelize"

const cityModel = db.define('ciudades',{
    Id_Ciudad :{type:DataTypes.STRING(10),primaryKey:true,allowNull:false},
    Nom_Ciudad:{type:DataTypes.STRING(50)}
},
{
    timestamps: false // Deshabilita los timestamps
  }) 

export default cityModel;