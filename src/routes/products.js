import { Router } from "express";
import * as products from "../controllers/products";

const router = Router();

router.get("/", products.viewProducts);
router.post("/", products.createProduct);
router.get("/:id", products.viewProduct);
router.patch("/:id", products.editProduct);
router.delete("/:id", products.deleteProduct);

export default router;
