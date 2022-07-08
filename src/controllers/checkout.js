import logger from "../middleware/logger";
import Stripe from "stripe";
import dotenv from "dotenv";
import CartItem from "../models/cartItem";

dotenv.config();
const BASE_URL = process.env.BASE_URL;
const stripe = Stripe(process.env.STRIPE_API_KEY);
const checkoutCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await CartItem.findAll({ where: { userId: userId } });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: { name: item.name },
            unit_amount: item.price,
          },
          quantity: item?.quantity || 1,
        };
      }),
      success_url: BASE_URL,
      cancel_url: BASE_URL,
    });
    logger.info("items purchased");
    return res.status(201).json({ url: session.url });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export default checkoutCart;
