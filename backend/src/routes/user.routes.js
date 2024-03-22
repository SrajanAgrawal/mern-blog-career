import Router from "express";

const router = Router();
import {getInformationAboutUser} from "../controllers/user.controllers.js"


// pre -> /api/user/info
router.get("/info", getInformationAboutUser());

export default router;