import { createLogger, format, transports } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({ filename: "logs/errors.log", level: "error" }),
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "DD/MM/YYYY hh:mm A" }),
    format.printf(
      (message) =>
        `${message.timestamp} | [${message.level}] : ${message.message}`
    )
  ),
});

export default logger;
