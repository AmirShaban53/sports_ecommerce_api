import { Router } from "express";
import {
  viewAllItems,
  addCartItem,
  editCartItem,
  deleteCartItem,
} from "../controllers/cart";

const router = Router();

router.get("/", viewAllItems);
router.post("/:productId", addCartItem);
router.patch("/:id", editCartItem);
router.delete("/:id", deleteCartItem);

export default router;
