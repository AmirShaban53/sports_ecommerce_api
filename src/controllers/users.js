import logger from "../middleware/logger";

const viewAllUsers = async (req, res) => {
  try {
    logger.info("all users listed");
    return res.status(201).json({ message: "all users listed" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    logger.info("create new user");
    return res.status(201).json({ message: "created new user" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    logger.info("user logged in");
    return res.status(201).json({ message: "user logged in" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const editUserDetails = async (req, res) => {
  try {
    logger.info("user updated");
    return res.status(201).json({ message: "user updated" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    logger.info("user deleted");
    return res.status(201).json({ message: "user deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export { viewAllUsers, createNewUser, loginUser, editUserDetails, deleteUser };
