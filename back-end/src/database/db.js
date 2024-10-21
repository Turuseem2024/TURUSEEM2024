import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.DB_PASS,
  {
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB,
  }
);

export default db;
