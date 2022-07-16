import { Router } from "express";
import {
  listCategories,
  addCategory,
  deleteCategory,
} from "../controllers/categories";

const router = Router();

router.get("/", listCategories);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);

export default router;
