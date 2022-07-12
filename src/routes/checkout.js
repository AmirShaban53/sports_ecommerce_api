import { Router } from "express";
import checkoutCart from "../controllers/checkout";

const router = Router();

router.post("/", checkoutCart);

export default router;
