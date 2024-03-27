import Router from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";

const router = Router();

// for registering the user
router.post("/register", registerUser)
// for login the user
router.route("/login").post(loginUser)


export default router;