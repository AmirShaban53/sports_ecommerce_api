import Sequelize from "sequelize";
import dotenv from "dotenv";
import logger from "../middleware/logger";

dotenv.config();

const devConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DEV_DATABASE}`;
const testConfig = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_TEST_DATABASE}`;

const pool = {
  min: 0,
  max: 7,
  idle: 1000,
  acquire: 3000,
};
const ssl = {
  require: true,
  rejectUnauthorized: false,
};

let sequelize;

const dbConnect = async () => {
  try {
    sequelize = new Sequelize(devConfig, { pool: pool });

    await sequelize.authenticate();
    logger.info("connected to dev database");
    sequelize.sync({});
  } catch (error) {
    logger.error(error);
  }
};

dbConnect();

export default sequelize;
