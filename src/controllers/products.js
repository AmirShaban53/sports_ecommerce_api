import logger from "../middleware/logger";

const viewProducts = async (req, res) => {
  try {
    logger.info("get all products");
    res.status(200).json("list all products");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    logger.info("create a new product");
    res.status(201).json("create a new product");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const viewProduct = async (req, res) => {
  try {
    logger.info("view a product");
    res.status(200).json("view a product");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    logger.info("edit a product");
    res.status(200).json("edit a product");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    logger.info("delete a product");
    res.status(200).json("delete a product");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { viewProducts, createProduct, viewProduct, editProduct, deleteProduct };
