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

const loginUser = async (req, res) => {
  try {
    const { username, email, image, role } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user === undefined || user === null) {
      const newUserObj = {
        username: username,
        email: email,
        profileImage: image,
        role: role,
      };
      const newUser = await User.create(newUserObj);
      logger.info("create new user");

      const token = JWT.sign(
        {
          id: newUser.id,
          role: newUser.role,
        },
        process.env.JWT_KEY,
        { expiresIn: "3hr" }
      );
      logger.info("logging in user");
      return res.status(200).json({ message: "user logged in", token: token });
    } else {
      const token = JWT.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_KEY,
        { expiresIn: "3hr" }
      );
      logger.info("user logged in");
      return res.status(201).json({ message: "user logged in", token: token });
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

export { viewAllUsers, loginUser, editUserDetails, deleteUser };
