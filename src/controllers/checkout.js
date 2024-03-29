import logger from "../middleware/logger";
import Stripe from "stripe";
import dotenv from "dotenv";
import CartItem from "../models/cartItem";
import User from "../models/User";

dotenv.config();
const BASE_URL = process.env.BASE_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const stripe = Stripe(process.env.STRIPE_API_KEY);

const checkoutCart = async (req, res) => {
  try {
    const { useremail } = req.headers;
    const user = await User.findOne({ where: { email: useremail } });
    const cartItems = await CartItem.findAll({
      where: { userId: user.id },
    });
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
          quantity: item?.qunatity || 1,
        };
      }),
      success_url: CLIENT_URL,
      cancel_url: CLIENT_URL,
    });
    logger.info("items purchased");
    return res.status(201).json({ url: session.url });
    // return res.status(201).json({ user, cartItems });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export default checkoutCart;
