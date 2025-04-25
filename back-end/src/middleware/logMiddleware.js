// Importación de las dependencias necesarias
import winston from "winston"; // Librería para la creación de logs
import DailyRotateFile from "winston-daily-rotate-file"; // Transporte de winston para generar archivos de logs rotativos

import * as stackTrace from "stack-trace"; // Librería para manejar y obtener información de la pila de llamadas de errores

/**
 * Formato personalizado para enumerar detalles de errores en los logs.
 * Si el objeto de información (info) es una instancia de Error, se agrega información adicional
 * como el nombre del archivo y el número de línea donde ocurrió el error.
 */
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    // Obtiene la traza del error (stack trace)
    const trace = stackTrace.parse(info);
    // Modifica el mensaje del error para incluir la ubicación del archivo y línea
    info.message = `${info.message} (${trace[0].getFileName()}:${trace[0].getLineNumber()})`;
  }
  return info;
});

/**
 * Creación del logger utilizando winston.
 * Este logger se configura con un nivel de 'error', lo que significa que solo los mensajes de error
 * (y niveles superiores, si se configuran) serán registrados.
 * Además, se utiliza un formato que incluye el timestamp y el formato de los mensajes de error.
 */
export const logger = winston.createLogger({
  level: "error", // Nivel mínimo de log (en este caso, solo se registran errores)
  format: winston.format.combine(
    enumerateErrorFormat(), // Aplica el formato personalizado para los errores
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss", // Establece el formato del timestamp en los logs
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}` // Define cómo se muestra cada mensaje de log
    )
  ),
  transports: [
    // Transporte para registrar los logs en archivos rotativos
    new DailyRotateFile({
      filename: "logs/Turuseem_%DATE%.log", // Nombre de los archivos de log con fecha
      datePattern: "YYYY-MM-DD", // Define el formato de la fecha para los archivos rotativos
      maxFiles: "14d", // Los archivos de log se mantienen durante 14 días
    }),
    // Transporte para imprimir los logs en la consola
    new winston.transports.Console()
  ],
});
