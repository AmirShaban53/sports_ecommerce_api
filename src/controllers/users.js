import logger from "../middleware/logger";
import User from "../models/User";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const viewAllUsers = async (req, res) => {
  try {
    const users = User.findAll({});
    logger.info("all users listed");
    return res.status(201).json({ users: users });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findAll({ where: { email: email } });
    if (user.length >= 1) {
      logger.info("this email already exists");
      return res.status(401).json({ message: "auth failed" });
    } else {
      bcrypt.hash(password, 10, async (error, hash) => {
        try {
          if (error) {
            logger.info("failed to hash password");
            return res.status(500).json({ message: "operation failed" });
          } else {
            const newUser = {
              username: username,
              email: email,
              password: hash,
              role: "USER",
            };
            await User.create(newUser);
            logger.info("create new user");
            return res.status(201).json({ message: "created new user" });
          }
        } catch (error) {
          logger.error(error);
          return res.status(500).json({ error: error.message });
        }
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user === undefined || user === null) {
      logger.error("user doesnot exist");
      return res.status(404).json({ message: "auth failed" });
    } else {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          logger.error(error);
          return res.status(404).json({ message: "auth failed" });
        }
        if (result) {
          const token = JWT.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            process.env.JWT_KEY,
            { expiresIn: "3hr" }
          );
          logger.info("user logged in");
          return res
            .status(201)
            .json({ message: "user logged in", token: token });
        }
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const editUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const userUpdate = {};
    await User.update(userUpdate, { where: { id: id } });
    logger.info("user updated");
    return res.status(201).json({ message: "user updated" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      await User.destroy({ where: { id: user.id } });
      logger.info("user deleted");
      return res.status(200).json("user deleted");
    } else {
      logger.info("user not found in database");
      return res.status(201).json({ message: "user not found in database" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export { viewAllUsers, createNewUser, loginUser, editUserDetails, deleteUser };
