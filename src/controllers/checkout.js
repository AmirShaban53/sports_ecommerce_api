import logger from "../middleware/logger";

const checkoutCart = async (req, res) => {
  try {
    logger.info("items purchased");
    return res.status(201).json({ message: "items purchased" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export default checkoutCart;
