import express from "express";
import cors from "cors";
import logger from "./middleware/logger";
import { cloudinaryConfig } from "./Config/cloudinaryConfig";

import Categories from "./routes/categories";
import Products from "./routes/products";
import Checkout from "./routes/checkout";
import Users from "./routes/users";
import Cart from "./routes/cart";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('*', cloudinaryConfig)

app.get("/", (req, res) => {
  res.json("welcome to the sports ecommerce API");
});
app.use("/uploads", express.static("uploads"));

app.use("/categories", Categories);
app.use("/products", Products);
app.use("/checkout", Checkout);
app.use("/users", Users);
app.use("/cart", Cart);

app.use((req, res) => {
  res.status(404).json({ message: "route not found!" });
});

app.listen(PORT, () => {
  logger.info(`server running at http://localhost:${PORT}`);
});

export default app;
