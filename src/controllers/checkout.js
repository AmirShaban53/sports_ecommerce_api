import logger from "../middleware/logger";
import Stripe from "stripe";
import dotenv from "dotenv";
import CartItem from "../models/cartItem";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_API_KEY);
const checkoutCart = async (req, res) => {
  try {
    const id = req.body.id;
    const cartItems = await CartItem.findAll({ where: { userId: id } });
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
      success_url: "http://localhost:5000",
      cancel_url: "http://localhost:5000",
    });
    logger.info("items purchased");
    return res.status(201).json({ url: session.url });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export default checkoutCart;
