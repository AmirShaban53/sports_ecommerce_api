import { Router } from "express";
import * as cart from "../controllers/cart";

const router = Router();

router.get('/', cart.viewAllItems);
router.post('/', cart.addCartItem);
router.patch('/', cart.editCartItem);
router.delete('/', cart.deleteCartItem);

export default router;