import { Router } from "express";
import * as cart from "../controllers/cart";

const router = Router();

router.get("/", cart.viewAllItems);
router.post("/", cart.addCartItem);
router.patch("/:id", cart.editCartItem);
router.delete("/:id", cart.deleteCartItem);

export default router;
