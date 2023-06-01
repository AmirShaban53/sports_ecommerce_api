import { Router } from "express";
import checkoutCart from "../controllers/checkout";

const router = Router();

router.get("/", checkoutCart);

export default router;
