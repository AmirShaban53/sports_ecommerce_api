import logger from "../middleware/logger";

const viewAllItems = async (req, res) => {
  try {
    logger.info("list all cart items");
    return res.status(201).json({ message: "all cart items" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const addCartItem = async (req, res) => {
  try {
    logger.info("item added to cart");
    return res.status(201).json({ message: "item added to cart" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const editCartItem = async (req, res) => {
  try {
    logger.info("edit cart item");
    return res.status(201).json({ message: "cart item edited" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    logger.info("delete cart item");
    return res.status(201).json({ message: "cart item deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export { viewAllItems, addCartItem, editCartItem, deleteCartItem };
