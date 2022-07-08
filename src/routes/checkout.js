import { Router } from "express";
import checkoutCart from "../controllers/checkout";

const router = Router();

router.post('/:userId', checkoutCart)

export default router;