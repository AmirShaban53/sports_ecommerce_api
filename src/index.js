import express from "express";
import logger from "./middleware/logger";

const PORT = process.env.PORT || 5000;
const app = express();

app.listen(PORT, () => {
  logger.info(`server running at http://localhost:${PORT}`);
});
