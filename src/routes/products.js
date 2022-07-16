import { Router } from "express";
import {
  viewProducts,
  viewProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/products";
import { imageUpload } from "../middleware/imageUploader";

const router = Router();

router.get("/", viewProducts);
router.post("/", imageUpload, createProduct);
router.get("/:id", viewProduct);
router.patch("/:id", imageUpload, editProduct);
router.delete("/:id", deleteProduct);

export default router;
