import logger from "../middleware/logger";
import CartItem from "../models/CartItem";

const viewAllItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({});

    logger.info("list all cart items");
    return res.status(201).json({ cart_items: cartItems });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const addCartItem = async (req, res) => {
  try {
    const newCartItem = {
      name: "cartitem",
      price: 15.0,
      quantity: 1,
    };
    await CartItem.create(newCartItem);

    logger.info("item added to cart");
    return res.status(201).json({ message: "item added to cart" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const editCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCartItem = {};
    await CartItem.update(updatedCartItem, { where: { id: id } });
    logger.info("edit cart item");
    return res.status(201).json({ message: "cart item edited" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findOne({ where: { id: id } });
    if (cartItem) {
      await CartItem.destroy({ where: { id: id } });
      logger.info("delete a product");
      return res.status(200).json("delete a product");
    } else {
      logger.info("failed to delete cart item");
      return res.status(500).json("cart item not found in database");
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export { viewAllItems, addCartItem, editCartItem, deleteCartItem };
