import Router from "express";
import { registerUser, loginUser ,logoutUser, getCurrentUser} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

// for registering the user
// router.post("/register", upload.single("avatar") , registerUser)
router.route("/register").post(upload.single("avatar"), registerUser)
// for login the user
router.route("/login").post(loginUser)
// for logout the user
router.route("/logout").post(verifyJWT, logoutUser)
// to get the information about current user
router.route("/currentUser").post(verifyJWT, getCurrentUser)


export default router;