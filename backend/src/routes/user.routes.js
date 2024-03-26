import Router from "express";
import { registerUser } from "../controllers/user.controllers.js";

const router = Router();
// import {getInformationAboutUser} from "../controllers/user.controllers.js"


// pre -> /api/user/info
router.get("/info", (req,res) => {
    res.send("/api/user/info")
});

// for registering the user
router.post("/register", registerUser)

// router.route("/register").post(registerUser);


export default router;