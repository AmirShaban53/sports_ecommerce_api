import logger from "../middleware/logger";
import CartItem from "../models/CartItem";
import User from "../models/User";
import Product from "../models/product";

const viewAllItems = async (req, res) => {
  try {
    const { useremail } = req.headers;
    const user = await User.findOne({ where: { email: useremail } });
    const cartItems = await CartItem.findAll({ where: { userId: user.id } });

    logger.info("list all cart items");
    return res.status(200).json(cartItems);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const addCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { useremail } = req.headers;
    const user = await User.findOne({ where: { email: useremail } });
    const seletedProduct = await Product.findOne({ where: { id: productId } });

    const newCartItem = {
      name: seletedProduct.name,
      price: seletedProduct.price,
      qunatity: 1,
      image: seletedProduct.images[0],
      productId: seletedProduct.id,
    };
    await user.createCartItem(newCartItem);

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
    const { qunatity } = req.body;
    let updatedCartItem = {};

    if (qunatity !== undefined || qunatity)
      updatedCartItem = { ...updatedCartItem, qunatity: qunatity };

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
