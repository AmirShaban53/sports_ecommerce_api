import { Router } from "express";
import * as products from "../controllers/products";
import {imageUpload} from "../middleware/imageUploader";

const router = Router();

router.get("/", products.viewProducts);
router.post("/", imageUpload, products.createProduct);
router.get("/:id", products.viewProduct);
router.patch("/:id", imageUpload, products.editProduct);
router.delete("/:id", products.deleteProduct);

export default router;
