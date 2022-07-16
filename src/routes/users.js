import { Router } from "express";
import {
  viewAllUsers,
  loginUser,
  editUserDetails,
  deleteUser,
} from "../controllers/users";

const router = Router();

router.get("/", viewAllUsers);
router.post("/login", loginUser);
router.patch("/:id", editUserDetails);
router.delete("/:id", deleteUser);

export default router;
