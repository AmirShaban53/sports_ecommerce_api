import { Router } from "express";
// import checkoutCart from "../controllers/checkout";

const router = Router();

// router.post("/", checkoutCart);

router.get("/", (req, res)=>{res.json({message: "we are home"})})


export default router;
