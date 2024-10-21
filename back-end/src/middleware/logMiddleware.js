import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import * as stackTrace from "stack-trace"

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    const trace = stackTrace.parse(info);
    info.message = `${info.message} (${trace[0].getFileName()}:${trace[0].getLineNumber()})`;
  }
  return info;
});

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new DailyRotateFile({
      filename: "logs/Turuseem_%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
    new winston.transports.Console()
  ],
});
