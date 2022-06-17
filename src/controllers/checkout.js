import logger from "../middleware/logger";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_API_KEY);
const checkoutCart = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "shoe" },
            unit_amount: 5000,
          },
          quantity: 3,
        },
        {
          price_data: {
            currency: "usd",
            product_data: { name: "racquet" },
            unit_amount: 15000,
          },
          quantity: 1,
        },
      ],
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
