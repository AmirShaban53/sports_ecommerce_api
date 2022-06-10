import { Router } from "express";
import * as users from "../controllers/users";

const router = Router();

router.get("/", users.viewAllUsers);
router.post("/create", users.createNewUser);
router.post("/login", users.loginUser);
router.patch("/:id", users.editUserDetails);
router.delete("/:id", users.deleteUser);

export default router;
