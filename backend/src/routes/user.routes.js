import Router from "express";
import { registerUser, loginUser ,logoutUser, getCurrentUser} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";


const router = Router();

// for registering the user
router.post("/register", registerUser)
// for login the user
router.route("/login").post(loginUser)
// for logout the user
router.route("/logout").post(verifyJWT, logoutUser)
// to get the information about current user
router.route("/currentUser").post(verifyJWT, getCurrentUser)


export default router;