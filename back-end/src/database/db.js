// Importación de las dependencias necesarias
import { Sequelize } from "sequelize"; // Sequelize para la conexión a la base de datos
import dotenv from 'dotenv'; // dotenv para gestionar las variables de entorno

// Carga las variables de entorno definidas en el archivo .env
dotenv.config();

/**
 * Configuración y conexión a la base de datos utilizando Sequelize.
 * Sequelize es un ORM para Node.js que soporta bases de datos como MySQL, PostgreSQL, etc.
 * 
 * El objeto 'db' se configura con las credenciales de la base de datos que se obtienen
 * de las variables de entorno definidas en el archivo .env. Esto permite una gestión
 * segura de las credenciales sin incluirlas directamente en el código fuente.
 * 
 * Variables de entorno utilizadas:
 * - DB_NAME: Nombre de la base de datos
 * - USER_NAME: Nombre de usuario de la base de datos
 * - DB_PASS: Contraseña del usuario de la base de datos
 * - HOST_DB: Dirección del servidor de la base de datos
 * - DIALECT_DB: Tipo de base de datos (por ejemplo, 'mysql', 'postgres', etc.)
 */

// Creación de la instancia de Sequelize para establecer la conexión
const db = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.USER_NAME, // Nombre de usuario para la conexión
  process.env.DB_PASS, // Contraseña para la conexión
  {
    host: process.env.HOST_DB, // Dirección del host de la base de datos
    dialect: process.env.DIALECT_DB, // Dialecto de la base de datos (MySQL, PostgreSQL, etc.)
  }
);

// Exportación de la instancia de Sequelize para que se pueda usar en otras partes de la aplicación
export default db;
