import { Router } from "express";
// import {
//   listCategories,
//   addCategory,
//   deleteCategory,
// } from "../controllers/categories";

const router = Router();

// router.get("/", listCategories);
// router.post("/", addCategory);
// router.delete("/:id", deleteCategory);

router.get("/", (req, res)=>{res.json({message: "we are home"})})


export default router;
