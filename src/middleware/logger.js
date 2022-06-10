import { createLogger, format, transports } from "winston";

const Logger = createLogger({
  transports: [
    new transports.File({ filename: "logs/errors.log", level: "error" }),
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.printf(
      (message) =>
        `${message.timestamp} | [${message.level}] : ${message.message}`
    )
  ),
});

export default Logger;
