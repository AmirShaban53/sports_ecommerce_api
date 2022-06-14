import { Router } from "express";
import * as categories from "../controllers/categories";
const router = Router();

router.get("/", categories.listCategories);
router.post("/", categories.addCategory);
router.delete("/", categories.deleteCategory);

export default router;
